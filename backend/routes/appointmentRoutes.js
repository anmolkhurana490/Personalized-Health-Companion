import express from 'express';
import Appointment from '../models/appointmentsSchema.js';

const router = express.Router();

// Book Appointment
router.post('/book', async (req, res) => {
    try {
        const { userId, doctorId, date, time, reason, type } = req.body;
        const appointment = new Appointment({ userId, doctorId, date, time, reason, type });
        await appointment.save();
        res.status(201).json({ success: true, message: "Appointment booked", appointment });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

// Get Appointments for User
router.get('/user', async (req, res) => {
    try {
        const appointments = await Appointment.find({ userId: req.params.userId })
            .populate('doctorId', 'name specialization photo')
            .sort({ date: -1 });
        res.json({ success: true, appointments });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

// Get Appointments for Doctor
router.get('/doctor', async (req, res) => {
    try {
        const appointments = await Appointment.find({ doctorId: req.params.doctorId })
            .populate('userId', 'name age gender photo')
            .sort({ date: -1 });
        res.json({ success: true, appointments });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

export default router;
