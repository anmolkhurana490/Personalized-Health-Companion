import mongoose from "mongoose";
const { Schema } = mongoose;


// const adminSchema = new Schema({
//     personal_info: {
//         fullName: { type: String, required: true },
//         email: { type: String, required: true, match: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i },
//         phoneNumber: { type: String, required: true, match: /^\+?[0-9][0-9-]{5,14}$/ }
//     },
//     authentication_details: {
//         username: { type: String },
//         password: { type: String, required: true, minlength: 4, maxlength: 9 },
//     },
//     admin_specific_info: {
//         accessKey: { type: String, required: true }
//     },
//     profilePicture: { type: String }
// });

const doctorSchema = new Schema({
    personal_info: {
        fullName: { type: String, required: true },
        email: { type: String, required: true, match: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i },
        phoneNumber: { type: String, required: true, match: /^\+?[0-9][0-9-]{5,14}$/ },
        dateOfBirth: { type: Date, required: true },
        gender: { type: String, required: true, enum: ["Male", "Female", "Others"] }
    },
    authentication_details: {
        username: { type: String },
        password: { type: String, required: true, minlength: 4, maxlength: 9 },
    },
    professional_info: {
        medicalRegistrationNumber: { type: String, required: true },
        speciality: { type: String, required: true },
        yearsOfExperience: { type: Number, required: true },
        associatedHospital: { type: String },
        qualifications: { type: String, required: true },
        licenseProof: { type: String, required: true }
    },
    availability: {
        availabilitySchedule: { type: String }
    },
    optional: {
        biography: { type: String }
    },
    profilePicture: { type: String }
});

const userSchema = new Schema({
    personal_info: {
        fullName: { type: String, required: true },
        email: { type: String, required: true, match: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i },
        phoneNumber: { type: String, required: true, match: /^\+?[0-9][0-9-]{5,14}$/ },
        dateOfBirth: { type: Date, required: true },
        gender: { type: String, enum: ["Male", "Female", "Others"] }
    },
    authentication_details: {
        username: { type: String },
        password: { type: String, required: true, minlength: 4, maxlength: 9 },
    },
    health_info: {
        bloodGroup: { type: String },
        knownAllergies: { type: String },
        existingMedicalConditions: { type: String }
    },
    emergency_contact: {
        emergencyContactName: { type: String, required: true },
        emergencyContactRelationship: { type: String, required: true },
        emergencyContactPhone: { type: String, required: true }
    },
    profilePicture: { type: String }
});

// const Admin = mongoose.model('Admin', adminSchema);
const Doctor = mongoose.model('Doctor', doctorSchema);
const User = mongoose.model('User', userSchema);

export { Doctor, User };