import express from 'express';
import { Chat } from '../models/chatSchema.js';

const router = express.Router();

router.get('/', async (req, res) => {
    const { user, doctor } = req.query;

    if (!user || !doctor) {
        return res.status(400).json({ error: 'User and Doctor are required' });
    }

    try {
        const chats = await Chat.findOne({
            participants: {
                $all: [
                    { $elemMatch: { participantId: user, participantModel: 'User' } },
                    { $elemMatch: { participantId: doctor, participantModel: 'Doctor' } }
                ]
            }
        });

        if (chats) res.status(200).json({ success: true, chats });

        const newChat = new Chat({
            participants: [
                { participantId: user, participantModel: 'User' },
                { participantId: doctor, participantModel: 'Doctor' }
            ],
            messages: []
        });

        await newChat.save();
        res.status(201).json({ success: true, chats: newChat });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch chats', details: error.message });
    }
})

router.post('/', async (req, res) => {
    const { chatId, message } = req.body;

    if (!chatId || !message) {
        return res.status(400).json({ error: 'ChatId and Message are required' });
    }

    try {
        await Chat.findByIdAndUpdate(chatId, {
            $push: {
                messages: {
                    sender: req.data._id,
                    senderModel: req.data.role,
                    content: message
                }
            }
        });

        res.status(201).json({ success: true, message: 'Message saved successfully!' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to save message', details: error.message });
    }
})

export default router;