import express from "express";
import { Doctor, User } from "../authentication/registerSchema.js";

const router = express.Router();

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

router.get('/profile', async (req, res) => {
    let profile;
    // if (req.data.role === "admin") {
    //     profile = await Admin.findById(req.data._id);
    // }
    if (req.data.role === "doctor") {
        profile = await Doctor.findById(req.data._id);
    } else {
        profile = await User.findById(req.data._id);
    }

    if (!profile) {
        return res.send({ status: 'failed', message: 'User not found' });
    }
    res.send({ status: 'success', path: `${req.data.role}`, profile });
});

router.get('/logout', (req, res) => {
    // console.log(req.cookies.loginToken)
    if (req.cookies.loginToken) {
        res.clearCookie('loginToken');
    }
    res.send({ status: 'success', message: 'Logged out successfully' });
});

export default router;