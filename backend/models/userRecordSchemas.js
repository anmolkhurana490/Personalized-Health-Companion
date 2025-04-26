import mongoose from "mongoose";
const { Schema } = mongoose;

// User Health Record Schema
const healthRecordSchema = new Schema({
    height: { type: Number, required: true }, // in cm
    weight: { type: Number, required: true }, // in kg

    bloodGroup: { type: String, required: true },
    knownAllergies: { type: String },
    existingMedicalConditions: { type: String },
    // Latest Heart Rate (bpm)

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

    // AI Generated Content
    ai_generated: {
        health_summary: { type: String },
        health_alert: {
            alert: { type: String, default: null },
            emergency: { type: Boolean, default: false }
        },
        lifestyle_tips: [{ type: String }]
    },

    // Medical History
    medicalHistory: [
        {
            condition: { type: String }, // e.g., Diabetes, Hypertension
            diagnosisDate: { type: Date },
            status: { type: String, enum: ["Ongoing", "Cured"] }
        }
    ],

    createdAt: { type: Date, default: Date.now }
});

export const HealthRecord = mongoose.model("HealthRecord", healthRecordSchema);