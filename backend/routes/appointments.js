import express from 'express';
import Appointment from '../models/appointmentsSchema.js';
import { Doctor, User } from '../models/registerSchema.js';
import cron from 'node-cron';
import { HealthRecord } from '../models/userRecordSchemas.js';

const router = express.Router();

// Book Appointment
router.post('/book', async (req, res) => {
    try {
        const userId = req.data._id;
        const { doctorId, dateTime, reason, type } = req.body;
        // console.log(doctorId, dateTime, reason, type)

        // Create new appointment
        const appointment = new Appointment({ user: userId, doctor: doctorId, dateTime, reason, type });
        await appointment.save();

        // Update the user's appointments array
        await User.findByIdAndUpdate(userId, {
            $push: { appointments: appointment._id },
        });

        // Update the doctor's appointments array
        await Doctor.findByIdAndUpdate(doctorId, {
            $push: { appointments: appointment._id },
        });

        const health_info = await User.findOne({ _id: userId }).select('health_info');

        // // add doctor to consulting doctors list in health record
        // const result = await HealthRecord.updateOne(
        //     { _id: health_info.health_info, 'consultingDoctors.doctor': { $ne: doctorId } },
        //     { $push: { consultingDoctors: { doctor: doctorId, consultationDate: new Date(dateTime), notes: reason } } },
        //     { new: true }
        // );

        res.status(201).json({ success: true, message: "Appointment booked", appointment });
    } catch (err) {
        console.log(err)
        res.status(500).json({ success: false, message: err.message });
    }
});

// Get Appointments for User
router.get('/user', async (req, res) => {
    try {
        if (req.data.role !== 'user') return res.status(403).json({ success: false, message: "Unauthorized" });

        const user = await User.findOne({ _id: req.data._id }).select('appointments').populate({
            path: 'appointments',
            populate: {
                path: 'doctor'
            },
        });
        const appointments = user.appointments.sort((a, b) => new Date(b.dateTime) - new Date(a.dateTime)).map((entry) => ({ ...entry._doc, doctor: { doctorId: entry.doctor._id, fullName: entry.doctor.personal_info.fullName } }));

        res.json({ success: true, appointments });
    } catch (err) {
        console.log(err)
        res.status(500).json({ success: false, message: err.message });
    }
});

// Get Appointments for Doctor
router.get('/doctor', async (req, res) => {
    try {
        if (req.data.role !== 'doctor') return res.status(403).json({ success: false, message: "Unauthorized" });

        const doctor = await Doctor.findOne({ _id: req.data._id }).select('appointments').populate({
            path: 'appointments',
            populate: {
                path: 'user'
            },
        });
        const appointments = doctor.appointments.sort((a, b) => new Date(b.dateTime) - new Date(a.dateTime)).map((entry) => ({ ...entry._doc, user: { userId: entry.user._id, fullName: entry.user.personal_info.fullName } }));

        res.json({ success: true, appointments });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

// Get Appointment by ID
router.get('/appointment', async (req, res) => {
    try {
        const { id } = req.query;
        if (!id) return res.status(400).json({ success: false, message: "Appointment ID is required" });

        let appointment = await Appointment.findById(id).populate('user doctor');
        if (!appointment) return res.status(404).json({ success: false, message: "Appointment not found" });

        appointment = appointment.toObject();
        appointment.doctor = doctorInfoFilter(appointment.doctor);
        appointment.user = await userInfoFilter(appointment.user);

        res.json({ success: true, appointment });
    } catch (err) {
        // console.log(err);
        res.status(500).json({ success: false, message: err.message });
    }
});

// Start Appointment
router.put('/start', async (req, res) => {
    try {
        const { id } = req.query;
        const appointment = await Appointment.findById(id);

        if (req.data.role !== 'doctor' || req.data._id !== appointment?.doctor.toString()) return res.status(403).json({ success: false, message: "Unauthorized" });

        await Appointment.findByIdAndUpdate(id, { status: 'ongoing' });

        res.json({ success: true, message: "Appointment started" });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

// Complete Appointment
router.put('/complete', async (req, res) => {
    try {
        const { id } = req.query;
        const appointment = await Appointment.findById(id);

        if (req.data.role !== 'doctor' || req.data._id !== appointment?.doctor.toString()) return res.status(403).json({ success: false, message: "Unauthorized" });

        // await Appointment.findByIdAndUpdate(id, { status: 'completed', prescription: req.body.prescription });
        await Appointment.findByIdAndUpdate(id, { status: 'completed' });

        res.json({ success: true, message: "Appointment completed" });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

// Cancel Appointment
router.put('/cancel', async (req, res) => {
    try {
        const { id } = req.query;
        const appointment = await Appointment.findById(id);

        if (req.data.role !== 'doctor' || req.data._id !== appointment?.doctor.toString()) return res.status(403).json({ success: false, message: "Unauthorized" });

        await Appointment.findByIdAndUpdate(id, { status: 'cancelled' });

        res.json({ success: true, message: "Appointment cancelled" });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

// cancel expired appointments
const cancelExpiredAppointments = async () => {
    try {
        const now = new Date();
        const tenMinutesAgo = new Date(now.getTime() - 10 * 60 * 1000);

        // Find appointments that are still scheduled and past their dateTime by more than 10 minutes
        const expiredAppointments = await Appointment.find({
            status: 'scheduled',
            dateTime: { $lte: tenMinutesAgo },
        });

        if (expiredAppointments.length > 0) {
            // Update the status of expired appointments to "cancelled"
            await Appointment.updateMany(
                { _id: { $in: expiredAppointments.map((appt) => appt._id) } },
                { $set: { status: 'cancelled' } }
            );

            console.log(`Cancelled ${expiredAppointments.length} expired appointments.`);
        }
    } catch (err) {
        console.error('Error cancelling expired appointments:', err.message);
    }
}

cron.schedule('0,30 * * * *', cancelExpiredAppointments); // Cancel Appointment in 30min

// Get Available Doctors
router.get('/available-doctors', async (req, res) => {
    try {
        let doctors = await Doctor.find({});
        doctors = doctors.map((entry) => doctorInfoFilter(entry));
        res.send({ status: 'success', doctors });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

// Get Consulted Doctors
router.get('/consulted-doctors', async (req, res) => {
    try {
        const userId = req.data._id;
        if (req.data.role !== 'user') return res.status(403).json({ success: false, message: "Unauthorized" });

        const appointments = await Appointment.find({ user: userId }).select('doctor dateTime prescription').populate('doctor');

        const doctorMap = new Map();

        appointments.forEach((entry) => {
            const doctorId = entry.doctor._id.toString();

            // If the doctor is not in the map or the current appointment is more recent, update the map
            if (!doctorMap.has(doctorId) || new Date(entry.dateTime) > new Date(doctorMap.get(doctorId).dateTime)) {
                doctorMap.set(doctorId, {
                    dateTime: entry.dateTime,
                    doctor: doctorInfoFilter(entry.doctor),
                    prescription: entry.prescription
                });
            }
        });

        const consultedDoctors = Array.from(doctorMap.values()).sort((a, b) => new Date(a.dateTime) - new Date(b.dateTime));

        res.send({ status: 'success', consultedDoctors });
    } catch (err) {
        console.log(err)
        res.status(500).json({ success: false, message: err.message });
    }
});

// Get Consulted Doctors
router.get('/consulted-patients', async (req, res) => {
    try {
        const doctorId = req.data._id;
        if (req.data.role !== 'doctor') return res.status(403).json({ success: false, message: "Unauthorized" });

        const appointments = await Appointment.find({ doctor: doctorId })
            .select('user dateTime prescription')
            .populate('user');

        const patientMap = new Map();

        for (const entry of appointments) {
            const userId = entry.user._id.toString();

            // If the doctor is not in the map or the current appointment is more recent, update the map
            if (!patientMap.has(userId) || new Date(entry.dateTime) > new Date(patientMap.get(userId).dateTime)) {
                const filteredUser = await userInfoFilter(entry.user);
                patientMap.set(userId, {
                    dateTime: entry.dateTime,
                    user: filteredUser,
                    prescription: entry.prescription
                });
            }
        }

        const consultedPatients = Array.from(patientMap.values()).sort((a, b) => new Date(a.dateTime) - new Date(b.dateTime));

        res.send({ status: 'success', consultedPatients });
    } catch (err) {
        console.log(err)
        res.status(500).json({ success: false, message: err.message });
    }
});

// Get Scheduled Appointments for User
router.get('/user/scheduled', async (req, res) => {
    try {
        const userId = req.data._id;
        if (req.data.role !== 'user') return res.status(403).json({ success: false, message: "Unauthorized" });

        let appointments = await Appointment.find({ user: userId, status: 'scheduled' }).populate('doctor', '_id personal_info.fullName professional_info.speciality');
        appointments = appointments.sort((a, b) => new Date(a.dateTime) - new Date(b.dateTime));

        res.send({ success: true, appointments });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

// Get Scheduled Appointments for Doctor
router.get('/doctor/scheduled', async (req, res) => {
    try {
        const doctorId = req.data._id;
        if (req.data.role !== 'doctor') return res.status(403).json({ success: false, message: "Unauthorized" });

        let appointments = await Appointment.find({ doctor: doctorId, status: 'scheduled' }).populate('user', '_id personal_info.fullName professional_info.speciality');
        appointments = appointments.sort((a, b) => new Date(a.dateTime) - new Date(b.dateTime));

        res.send({ success: true, appointments });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

const doctorInfoFilter = (entry) => {
    return {
        id: entry._id,
        personal_info: entry.personal_info,
        professional_info: entry.professional_info,
        availability: entry.availability,
        biography: entry.optional.biography,
        profilePicture: entry.profilePicture
    };
}

const userInfoFilter = async (entry) => {
    return {
        id: entry._id,
        personal_info: entry.personal_info,
        health_info: await HealthRecord.findOne({ _id: entry.health_info }),
        emergency_contact: entry.emergency_contact,
        profilePicture: entry.profilePicture
    };
}

export default router;
