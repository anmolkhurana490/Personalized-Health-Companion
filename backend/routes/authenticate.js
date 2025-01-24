import express from "express";
import { Admin, Doctor, User } from "../authentication/registerSchema.js"
import { signToken, verifyToken } from "../authentication/stateless_auth.js"
import multer from 'multer';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        if (file.fieldname.includes('profilePicture')) cb(null, './app-files/profilePicture');
        else if (req.body.role == "doctor") cb(null, './app-files/doctorDocs');
        else cb(null, './app-files/other');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + file.originalname;
        cb(null, uniqueSuffix)
    }
})

const upload = multer({ storage: storage })

const router = express.Router();

router.post('/signup/admin', upload.fields([{ name: 'optional[profilePicture]' }]), async (req, res) => {
    try {
        const data = req.body
        data.profilePicture = req.files['optional[profilePicture]'][0].filename;
        await Admin.create(data);
        res.send({ status: 'success', path: '/login', message: "signup successful" })
    }
    catch (e) {
        console.log(e)
        res.send({ status: 'failed', error: e.message })
    }
})

router.post('/signup/doctor', upload.fields([{ name: 'optional[profilePicture]' }, { name: 'professional_info[licenseProof]' }]), async (req, res) => {
    try {
        const data = req.body
        console.log(data)
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
        await User.create(data);
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
        if (req.body.role == "admin")
            found = await Admin.findOne(login_data);
        else if (req.body.role == "doctor")
            found = await Doctor.findOne(login_data);
        else found = await User.findOne(login_data);

        if (!found) res.send({ status: 'failed', message: "Incorrect Email or Password" });

        const token = signToken({ _id: found._id, username: found.authentication_details, email: found.personal_info, role: req.body.role });
        res.cookie('loginToken', token, { maxAge: Date.now() + (72 * 60 * 60 * 1000), httpOnly: true }); // expires in 72hrs
        res.send({ status: 'success', path: '/dashboard', profile: found, role: req.body.role });
    }
    catch (e) {
        console.log(e)
        res.send({ status: 'failed', error: e.message })
    }
})

router.get('/profile', async (req, res) => {
    let profile;
    if (req.data.role === "admin") {
        profile = await Admin.findById(req.data._id);
    } else if (data.role === "doctor") {
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
    if (req.cookies.loginToken) {
        res.clearCookie('loginToken');
    }
    res.send({ status: 'success', message: 'Logged out successfully' });
});

export default router;