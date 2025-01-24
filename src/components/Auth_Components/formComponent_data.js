const form_data = {
    admin: {
        "personal_info": {
            title: "Personal Information",
            inputs: {
                "fullName": {
                    label: "Full Name",
                    type: "text",
                    placeholder: 'Enter Your Full Name',
                    rules: { required: "Full Name is Required" }
                },
                "email": {
                    label: "Email Address",
                    type: "text",
                    placeholder: 'Enter Your Email Address',
                    rules: {
                        pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "Invalid Email Address"
                        },
                        required: "Email is Required"
                    }
                },
                "phoneNumber": {
                    label: "Phone Number",
                    type: "text",
                    placeholder: 'Enter Your Phone Number',
                    rules: {
                        pattern: {
                            value: /^\+?[0-9][0-9-]{5,14}$/,
                            message: "Invalid Phone Number"
                        },
                        required: "Phone Number is Required"
                    }
                }
            }
        },
        "authentication_details": {
            title: "Authentication Details",
            inputs: {
                "username": {
                    label: "Username (optional)",
                    type: "text",
                    placeholder: 'Enter Your Username'
                },
                "password": {
                    label: "Password",
                    type: "password",
                    placeholder: 'Enter Your Password',
                    rules: {
                        minLength: { value: 4, message: "Password must be at least 4 characters" },
                        maxLength: { value: 9, message: "Password cannot exceed 8 characters" },
                        required: "Password is Required"
                    }
                },
                "confirmPassword": {
                    label: "Confirm Password",
                    type: "password",
                    placeholder: 'Confirm Your Password',
                    rules: {
                        required: "Confirm Password is Required"
                    }
                }
            }
        },
        "admin_specific_info": {
            title: "Admin-Specific Information",
            inputs: {
                "accessKey": {
                    label: "Admin Code or Access Key",
                    type: "text",
                    placeholder: 'Enter Admin Code or Access Key',
                    rules: { required: "Admin Code is Required" }
                }
            }
        },
        "optional": {
            title: "Optional",
            inputs: {
                "profilePicture": {
                    label: "Profile Picture",
                    type: "file",
                    rules: {
                        validate: {
                            fileType: (value) => {
                                return value[0] && ["image/jpg", "image/jpeg", "image/png"].includes(value[0].type) || "File must be in JPG, JPEG, or PNG format";
                            },
                            fileSize: (value) => { // in bytes
                                return value[0] && value[0].size <= 1048576 || "File size cannot exceed 1MB";
                            }
                        }
                    }
                }
            }
        }
    },

    doctor: {
        "personal_info": {
            title: "Personal Information",
            inputs: {
                "fullName": {
                    label: "Full Name",
                    type: "text",
                    placeholder: 'Enter Your Full Name',
                    rules: { required: "Full Name is Required" }
                },
                "email": {
                    label: "Email Address",
                    type: "text",
                    placeholder: 'Enter Your Email Address',
                    rules: {
                        pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "Invalid Email Address"
                        },
                        required: "Email is Required"
                    }
                },
                "phoneNumber": {
                    label: "Phone Number",
                    type: "text",
                    placeholder: 'Enter Your Phone Number',
                    rules: {
                        pattern: {
                            value: /^\+?[0-9][0-9-]{5,14}$/,
                            message: "Invalid Phone Number"
                        },
                        required: "Phone Number is Required"
                    }
                },
                "dateOfBirth": {
                    label: "Date of Birth",
                    type: "date",
                    placeholder: 'Enter Your DOB',
                    rules: { required: "DOB is Required" }
                },
                "gender": {
                    label: "Gender",
                    type: "select",
                    options: ["Male", "Female", "Others"],
                    rules: { required: "Gender is Required" }
                }
            }
        },
        "authentication_details": {
            title: "Authentication Details",
            inputs: {
                "username": {
                    label: "Username (optional)",
                    type: "text",
                    placeholder: 'Enter Your Username'
                },
                "password": {
                    label: "Password",
                    type: "password",
                    placeholder: 'Enter Your Password',
                    rules: {
                        minLength: { value: 4, message: "Password must be at least 4 characters" },
                        maxLength: { value: 9, message: "Password cannot exceed 8 characters" },
                        required: "Password is Required"
                    }
                },
                "confirmPassword": {
                    label: "Confirm Password",
                    type: "password",
                    placeholder: 'Confirm Your Password',
                    rules: {
                        required: "Confirm Password is Required"
                    }
                }
            }
        },
        "professional_info": {
            title: "Professional Information",
            inputs: {
                "medicalRegistrationNumber": {
                    label: "Medical Registration Number",
                    type: "text",
                    placeholder: 'Enter Your Medical Registration Number',
                    rules: { required: "Medical Registration Number is Required" }
                },
                "speciality": {
                    label: "Speciality",
                    type: "text",
                    placeholder: 'Enter Your Speciality',
                    rules: { required: "Speciality is Required" }
                },
                "yearsOfExperience": {
                    label: "Years of Experience",
                    type: "number",
                    placeholder: 'Enter Your Years of Experience',
                    rules: { required: "Years of Experience is Required" }
                },
                "associatedHospital": {
                    label: "Associated Hospital/Clinic (optional)",
                    type: "text",
                    placeholder: 'Enter Your Associated Hospital/Clinic'
                },
                "qualifications": {
                    label: "Qualifications",
                    type: "text",
                    placeholder: 'Enter Your Qualifications',
                    rules: { required: "Qualifications are Required" }
                },
                "licenseProof": {
                    label: "License Proof Upload",
                    type: "file",
                    rules: { 
                        required: "License Proof is Required",
                        validate: {
                            fileType: (value) => {
                                return value[0] && ["image/jpg", "image/jpeg", "image/png", "application/pdf"].includes(value[0].type) || "File must be in PNG, JPG, JPEG or PNG format";
                            },
                            fileSize: (value) => { // in bytes
                                return value[0] && value[0].size <= 3145728 || "File size cannot exceed 3MB";
                            }
                        }
                    }
                }
            }
        },
        "availability": {
            title: "Availability",
            inputs: {
                "availabilitySchedule": {
                    label: "Weekly Availability Schedule (optional)",
                    type: "text",
                    placeholder: 'Enter Your Weekly Availability Schedule'
                }
            }
        },
        "optional": {
            title: "Optional",
            inputs: {
                "profilePicture": {
                    label: "Profile Picture",
                    type: "file",
                    rules: {
                        validate: {
                            fileType: (value) => {
                                return value[0] && ["image/jpg", "image/jpeg", "image/png"].includes(value[0].type) || "File must be in JPG, JPEG, or PNG format";
                            },
                            fileSize: (value) => {
                                return value[0] && value[0].size <= 1048576 || "File size cannot exceed 1MB";
                            }
                        }
                    }
                },
                "biography": {
                    label: "Biography/Introduction",
                    type: "textarea",
                    placeholder: 'Enter Your Biography/Introduction'
                }
            }
        }
    },

    user: {
        "personal_info": {
            title: "Personal Information",
            inputs: {
                "fullName": {
                    label: "Full Name",
                    type: "text",
                    placeholder: 'Enter Your Full Name',
                    rules: { required: "Full Name is Required" }
                },
                "email": {
                    label: "Email Address",
                    type: "text",
                    placeholder: 'Enter Your Email Address',
                    rules: {
                        pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "Invalid Email Address"
                        },
                        required: "Email is Required"
                    }
                },
                "phoneNumber": {
                    label: "Phone Number",
                    type: "text",
                    placeholder: 'Enter Your Phone Number',
                    rules: {
                        pattern: {
                            value: /^\+?[0-9][0-9-]{5,14}$/,
                            message: "Invalid Phone Number"
                        },
                        required: "Phone Number is Required"
                    }
                },
                "dateOfBirth": {
                    label: "Date of Birth",
                    type: "date",
                    placeholder: 'Enter Your DOB',
                    rules: { required: "DOB is Required" }
                },
                "gender": {
                    label: "Gender",
                    type: "select",
                    options: ["Male", "Female", "Others"]
                }
            }
        },
        "authentication_details": {
            title: "Authentication Details",
            inputs: {
                "username": {
                    label: "Username (optional)",
                    type: "text",
                    placeholder: 'Enter Your Username'
                },
                "password": {
                    label: "Password",
                    type: "password",
                    placeholder: 'Enter Your Password',
                    rules: {
                        minLength: { value: 4, message: "Password must be at least 4 characters" },
                        maxLength: { value: 9, message: "Password cannot exceed 8 characters" },
                        required: "Password is Required"
                    }
                },
                "confirmPassword": {
                    label: "Confirm Password",
                    type: "password",
                    placeholder: 'Confirm Your Password',
                    rules: {
                        required: "Confirm Password is Required"
                    }
                }
            }
        },
        "health_info": {
            title: "Health Information",
            inputs: {
                "bloodGroup": {
                    label: "Blood Group",
                    type: "text",
                    placeholder: 'Enter Your Blood Group'
                },
                "knownAllergies": {
                    label: "Known Allergies",
                    type: "text",
                    placeholder: 'Enter Your Known Allergies'
                },
                "existingMedicalConditions": {
                    label: "Existing Medical Conditions",
                    type: "text",
                    placeholder: 'Enter Your Existing Medical Conditions'
                }
            }
        },
        "emergency_contact": {
            title: "Emergency Contact Details",
            inputs: {
                "emergencyContactName": {
                    label: "Contact Name",
                    type: "text",
                    placeholder: 'Enter Emergency Contact Name',
                    rules: { required: "Contact Name is Required" }
                },
                "emergencyContactRelationship": {
                    label: "Relationship",
                    type: "text",
                    placeholder: 'Enter Relationship',
                    rules: { required: "Relationship is Required" }
                },
                "emergencyContactPhone": {
                    label: "Phone Number",
                    type: "text",
                    placeholder: 'Enter Emergency Contact Phone Number',
                    rules: { required: "Phone Number is Required" }
                }
            }
        },
        "optional": {
            title: "Optional",
            inputs: {
                "profilePicture": {
                    label: "Profile Picture",
                    type: "file",
                    rules: {
                        validate: {
                            fileType: (value) => {
                                return value[0] && ["image/jpg", "image/jpeg", "image/png"].includes(value[0].type) || "File must be in JPG, JPEG, or PNG format";
                            },
                            fileSize: (value) => { // in bytes
                                return value[0] && value[0].size <= 1048576 || "File size cannot exceed 1MB";
                            }
                        }
                    }
                }
            },
        }
    }
}

export default form_data;