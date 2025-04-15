import express from 'express';
import Appointment from '../models/appointmentsSchema.js';
import { Doctor, User } from '../models/registerSchema.js';
import cron from 'node-cron';
import { HealthRecord } from '../models/userRecordSchemas.js';

const router = express.Router();

// Book Appointment
router.post('/book', async (req, res) => {
    try {
        // console.log(doctorId, dateTime, reason, type)
        const userId = req.data._id;
        const { doctorId, dateTime, reason, type } = req.body;

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

        // add doctor to consulting doctors list in health record
        await HealthRecord.findOneAndUpdate(
            { _id: req.data.health_info },
            { $addToSet: { consultingDoctors: { doctor: doctorId, consultationDate: new Date(dateTime), notes: reason } } }
        );

        res.status(201).json({ success: true, message: "Appointment booked", appointment });
    } catch (err) {
        // console.log(err)
        res.status(500).json({ success: false, message: err.message });
    }
});

// Get Appointments for User
router.get('/user', async (req, res) => {
    try {
        if (req.data.role !== 'user') return res.status(403).json({ success: false, message: "Unauthorized" });

        const user = await User.find({ _id: req.data._id }).select('appointments').populate('appointments');
        const appointments = user.appointments.sort({ dateTime: -1 });

        res.json({ success: true, appointments });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

// Get Appointments for Doctor
router.get('/doctor', async (req, res) => {
    try {
        if (req.data.role !== 'doctor') return res.status(403).json({ success: false, message: "Unauthorized" });

        const doctor = await Doctor.find({ _id: req.data._id }).select('appointments').populate('appointments');
        const appointments = doctor.appointments.sort({ dateTime: -1 });

        res.json({ success: true, appointments });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

// Start Appointment
router.put('/start', async (req, res) => {
    try {
        if (req.data.role !== 'doctor' || req.data._id !== req.body.doctor) return res.status(403).json({ success: false, message: "Unauthorized" });

        const { id } = req.body;
        await Appointment.findByIdAndUpdate(id, { status: 'ongoing' });

        res.json({ success: true, message: "Appointment started" });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

// Complete Appointment
router.put('/complete', async (req, res) => {
    try {
        if (req.data.role !== 'doctor' || req.data._id !== req.body.doctor) return res.status(403).json({ success: false, message: "Unauthorized" });

        const { id } = req.body;
        await Appointment.findByIdAndUpdate(id, { status: 'completed', prescription: req.body.prescription });

        res.json({ success: true, message: "Appointment completed" });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

// Cancel Appointment
router.put('/cancel', async (req, res) => {
    try {
        if (req.data.role !== 'doctor' || req.data._id !== req.body.doctor) return res.status(403).json({ success: false, message: "Unauthorized" });

        const { id } = req.body;
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

cron.schedule('*/5 * * * *', cancelExpiredAppointments);

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
        const healthRecord = await HealthRecord.findOne({ _id: req.data.health_info }).populate('consultingDoctors.doctor');
        const consultedDoctors = healthRecord?.consultingDoctors.map((entry) => doctorInfoFilter(entry));

        res.send({ status: 'success', consultedDoctors });
    } catch (err) {
        console.log(err)
        res.status(500).json({ success: false, message: err.message });
    }
});

// Get Scheduled Appointments for User
router.get('/user/scheduled', async (req, res) => {
    try {
        const userId = req.data._id;
        let appointments = await Appointment.find({ user: userId, status: 'scheduled' }).populate('doctor');
        appointments = appointments.map((entry) => ({
            doctor: doctorInfoFilter(entry)
        }));

        res.send({ success: true, appointments });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

const doctorInfoFilter = (entry) => {
    console.log(entry)
    return {
        id: entry._id,
        personal_info: entry.personal_info,
        professional_info: entry.professional_info,
        availability: entry.availability,
        biography: entry.optional.biography,
        profilePicture: entry.profilePicture
    };
}

export default router;
