import { HealthRecord } from "../models/userRecordSchemas.js";

function randomInRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateHealthData() {
    return {
        weight: randomInRange(30, 120),
        heartRate: randomInRange(60, 110),
        temperature: randomInRange(365, 375) / 10, // (36.5 to 37.5)
        spo2: randomInRange(950, 1000) / 10, // (95 to 100)
        steps: randomInRange(100, 10000),
        calories: randomInRange(100, 800),
        stress: randomInRange(1, 10),
    };
}

// Save the weight history to the database
function updateWeightHistory(weightHistory, currentWeight) {
    if (!currentWeight) return weightHistory;

    const currentDate = new Date(Date.now());
    let updatedHistory = [...weightHistory];
    let existingRecord = weightHistory.slice(-1)[0];

    if (existingRecord) {
        const lastDate = new Date(existingRecord.date);

        if (lastDate.getMonth() == currentDate.getMonth() && lastDate.getFullYear() == currentDate.getFullYear()) {
            existingRecord.weight = (Number(existingRecord.weight) + Number(currentWeight)) / 2;
            updatedHistory.pop();
        }
        else existingRecord = { weight: currentWeight };
    } else {
        existingRecord = { weight: currentWeight };
    }

    updatedHistory.push(existingRecord);
    return updatedHistory;
}

// Save the heart rate history to the database
function updateHeartRateHistory(heartRateHistory, currentHeartRate) {
    if (!currentHeartRate) return heartRateHistory;

    const currentDate = new Date(Date.now());
    let updatedHistory = [...heartRateHistory];
    let existingRecord = heartRateHistory.slice(-1)[0];

    if (existingRecord) {
        const lastDate = new Date(existingRecord.date);

        if (lastDate.getMonth() == currentDate.getMonth() && lastDate.getFullYear() == currentDate.getFullYear()) {
            existingRecord.heartRate = (Number(existingRecord.heartRate) + Number(currentHeartRate)) / 2;
            updatedHistory.pop();
        }
        else existingRecord = { heartRate: currentHeartRate };
    } else {
        existingRecord = { heartRate: currentHeartRate };
    }

    updatedHistory.push(existingRecord);
    return updatedHistory;
}

// Update the each health data in the database
async function updateHealthData() {
    const healthData = generateHealthData();
    const healthRecords = await HealthRecord.find({});

    for (const healthRecord of healthRecords) {
        const weightHistory = updateWeightHistory(healthRecord.weightHistory, healthData.weight);
        const heartRateLogs = updateHeartRateHistory(healthRecord.heartRateLogs, healthData.heartRate);

        await HealthRecord.findByIdAndUpdate(healthRecord._id, { weight: healthData.weight, heartRate: healthData.heartRate, weightHistory, heartRateLogs });
    }
}

export { updateHealthData };