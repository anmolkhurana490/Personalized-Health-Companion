import mongoose from "mongoose";
const { Schema } = mongoose;

// User Health Record Schema
const healthRecordSchema = new Schema({
    height: { type: Number, required: true }, // in cm
    weight: { type: Number, required: true }, // in kg

    bloodGroup: { type: String, required: true },
    knownAllergies: { type: String },
    existingMedicalConditions: { type: String },
    heartRate: { type: Number }, // Latest Heart Rate (bpm)

    weightHistory: [
        {
            date: { type: Date, default: Date.now },
            weight: { type: Number }
        }
    ],

    heartRateLogs: [
        {
            date: { type: Date, default: Date.now },
            heartRate: { type: Number }
        }
    ],

    // Medical History
    medicalHistory: [
        {
            condition: { type: String }, // e.g., Diabetes, Hypertension
            diagnosisDate: { type: Date },
            status: { type: String, enum: ["Ongoing", "Cured"] }
        }
    ],

    // Prescriptions
    prescriptions: [
        {
            doctor: { type: Schema.Types.ObjectId, ref: "Doctor" }, // Which doctor prescribed
            medicines: [
                {
                    medicineName: { type: String },
                    dosage: { type: String }
                }
            ],
            startDate: { type: Date },
            endDate: { type: Date }
        }
    ],

    // Consulting Doctors (Past Appointments)
    consultingDoctors: [
        {
            doctor: { type: Schema.Types.ObjectId, ref: "Doctor" },
            consultationDate: { type: Date, default: Date.now },
            notes: { type: String }
        }
    ],

    createdAt: { type: Date, default: Date.now }
});

export const HealthRecord = mongoose.model("HealthRecord", healthRecordSchema);