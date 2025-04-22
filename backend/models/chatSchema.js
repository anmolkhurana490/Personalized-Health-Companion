import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        refPath: 'senderModel'
    },
    senderModel: {
        type: String,
        required: true,
        enum: ['User', 'Doctor']
    },
    content: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});

const chatSchema = new mongoose.Schema({
    chatDate: {
        type: Date,
        default: Date.now
    },
    messages: [messageSchema],
    participants: [
        {
            participantId: {
                type: mongoose.Schema.Types.ObjectId,
                required: true,
                refPath: 'participants.participantModel'
            },
            participantModel: {
                type: String,
                required: true,
                enum: ['User', 'Doctor']
            }
        }
    ]
});

export const Chat = mongoose.model('Chat', chatSchema);