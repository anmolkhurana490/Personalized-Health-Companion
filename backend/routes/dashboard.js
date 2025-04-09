import express from "express";
import profileRouter from "./profile.js";
import appointmentRoutes from './appointmentRoutes.js';

const router = express.Router();

router.use('/profile', profileRouter);
router.use('/appointments', appointmentRoutes);

router.post('/doctor', async (req, res) => {
    try {
        const data = req.body
        res.send({ status: 'success', path: '/login', message: "signup successful" })
    }
    catch (e) {
        console.log(e)
        res.send({ status: 'failed', error: e.message })
    }
})

router.post('/user', async (req, res) => {
    try {
        const data = req.body
        res.send({ status: 'success', path: '/login', message: "signup successful" })
    }
    catch (e) {
        console.log(e)
        res.send({ status: 'failed', error: e.message })
    }
})

router.get('/logout', (req, res) => {
    // console.log(req.cookies.loginToken)
    res.set('Cache-Control', 'no-store');
    if (req.cookies.loginToken) {
        res.clearCookie('loginToken', { httpOnly: true, secure: true, sameSite: 'none', path: '/' });
    }
    res.send({ status: 'success', message: 'Logged out successfully' });
});

export default router;