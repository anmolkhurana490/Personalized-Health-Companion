import express from "express";

import { Doctor, User } from "../models/registerSchema.js";
import { HealthRecord } from "../models/userRecordSchemas.js";

const router = express.Router();

router.get('/', async (req, res) => {
    let profile;

    try {
        // if (req.data.role === "admin") {
        //     profile = await Admin.findById(req.data._id);
        // }
        if (req.data.role === "doctor") {
            profile = await Doctor.findById(req.data._id);
        } else {
            profile = await User.findById(req.data._id).populate("health_info");
        }

        profile = profile.toObject();
        delete profile.authentication_details.password;

        if (!profile) {
            return res.send({ status: 'failed', message: 'User not found' });
        }

        res.send({ status: 'success', path: `${req.data.role}`, profile, role: req.data.role });
    }
    catch (e) {
        res.send({ status: 'failed', error: e.message })
    }
});

router.post('/', async (req, res) => {
    let profile;
    try {
        // if (profile.role === "admin") {
        //     profile = await Admin.findById(profile._id);
        // }
        if (req.body.role === "doctor") {
            profile = {
                _id: req.body._id,
                personal_info: req.body.personal_info,
                professional_info: req.body.professional_info,
                availability: req.body.availability,
                optional: req.body.optional
            }
            await Doctor.findByIdAndUpdate(profile._id, profile);
        } else {
            profile = {
                _id: req.body._id,
                personal_info: req.body.personal_info,
                emergency_contact: req.body.emergency_contact
            }

            const userHealth = {
                ...req.body.health_info
            }


            const healthRecord = await HealthRecord.findById(userHealth._id);

            await HealthRecord.findByIdAndUpdate(userHealth._id, { ...userHealth, weightHistory: updateWeightHistory(healthRecord.weightHistory, userHealth.weight), heartRateLogs: updateHeartHistory(healthRecord.heartRateLogs, userHealth.heartRate) });

            await User.findByIdAndUpdate(profile._id, profile);
        }

        res.send({ status: 'success', message: 'profile information updated successfully' });
    }
    catch (e) {
        console.log(e)
        res.send({ status: 'failed', error: e.message })
    }
});

function updateWeightHistory(weightHistory, currentWeight) {
    if (!currentWeight) return weightHistory;

    const currentDate = new Date(Date.now());
    let existingRecord = weightHistory.slice(-1)[0];

    if (existingRecord) {
        const lastDate = new Date(existingRecord.date);

        if (lastDate.getMonth() == currentDate.getMonth() && lastDate.getFullYear() == currentDate.getFullYear()) {
            existingRecord.weight = (Number(existingRecord.weight) + Number(currentWeight)) / 2;
            weightHistory.pop();
        }
        else existingRecord = { weight: currentWeight };
    } else {
        existingRecord = { weight: currentWeight };
    }

    weightHistory.push(existingRecord);
    return weightHistory;
}

function updateHeartHistory(heartRateHistory, currentHeartRate) {
    if (!currentHeartRate) return heartRateHistory;

    const currentDate = new Date(Date.now());
    let existingRecord = heartRateHistory.slice(-1)[0];

    if (existingRecord) {
        const lastDate = new Date(existingRecord.date);

        if (lastDate.getMonth() == currentDate.getMonth() && lastDate.getFullYear() == currentDate.getFullYear()) {
            existingRecord.heartRate = (Number(existingRecord.heartRate) + Number(currentHeartRate)) / 2;
            heartRateHistory.pop();
        }
        else existingRecord = { heartRate: currentHeartRate };
    } else {
        existingRecord = { heartRate: currentHeartRate };
    }

    heartRateHistory.push(existingRecord);
    return heartRateHistory;
}

export default router;