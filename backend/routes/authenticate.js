import express from "express";
import { Doctor, User } from "../models/registerSchema.js"
import { signToken, verifyToken } from "../authentication/stateless_auth.js"
import { HealthRecord } from "../models/userRecordSchemas.js";
import multer from 'multer';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        if (file.fieldname.includes('profilePicture')) cb(null, './frontend/public/profilePicture');
        else if (req.body.role == "doctor") cb(null, './frontend/public/doctorDocs');
        else cb(null, './public/other');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + file.originalname;
        cb(null, uniqueSuffix)
    }
})

const upload = multer({ storage: storage })

const router = express.Router();

// router.post('/signup/admin', upload.fields([{ name: 'optional[profilePicture]' }]), async (req, res) => {
//     try {
//         const data = req.body
//         data.profilePicture = req.files['optional[profilePicture]'][0].filename;
//         await Admin.create(data);
//         res.send({ status: 'success', path: '/login', message: "signup successful" })
//     }
//     catch (e) {
//         console.log(e)
//         res.send({ status: 'failed', error: e.message })
//     }
// })

router.post('/signup/doctor', upload.fields([{ name: 'optional[profilePicture]' }, { name: 'professional_info[licenseProof]' }]), async (req, res) => {
    try {
        const data = req.body
        data.profilePicture = req.files['optional[profilePicture]'][0].filename;
        data.professional_info.licenseProof = req.files['professional_info[licenseProof]'][0].filename;
        await Doctor.create(data);
        res.send({ status: 'success', path: '/login', message: "signup successful" })
    }
    catch (e) {
        console.log(e)
        res.send({ status: 'failed', error: e.message })
    }
})

router.post('/signup/user', upload.fields([{ name: 'optional[profilePicture]' }]), async (req, res) => {
    try {
        const data = req.body
        data.profilePicture = req.files['optional[profilePicture]'][0].filename;

        const userHealth = {
            ...data.health_info,
            weightHistory: [{ weight: data.health_info.weight }]
        }

        const healthRecord = await HealthRecord.create(userHealth);
        await User.create({ ...data, health_info: healthRecord._id });
        res.send({ status: 'success', path: '/login', message: "signup successful" })
    }
    catch (e) {
        console.log(e)
        res.send({ status: 'failed', error: e.message })
    }
})

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const login_data = {
        'personal_info.email': email,
        'authentication_details.password': password
    };
    try {
        let found;
        // if (req.body.role == "admin")
        //     found = await Admin.findOne(login_data);
        if (req.body.role == "doctor")
            found = await Doctor.findOne(login_data);
        else found = await User.findOne(login_data);

        if (!found) return res.send({ status: 'failed', message: "Incorrect Email or Password" });

        found = found.toObject();
        delete found.authentication_details.password;

        const token = signToken({ _id: found._id, username: found.authentication_details.username, email: found.personal_info.email, role: req.body.role });
        res.cookie('loginToken', token, { maxAge: 72 * 60 * 60 * 1000, httpOnly: true, secure: true, sameSite: 'none', path: '/' }); // expires in 72hrs

        res.send({ status: 'success', path: '/dashboard', profile: found, role: req.body.role });
    }
    catch (e) {
        console.log(e)
        res.send({ status: 'failed', error: e.message })
    }
})

export default router;