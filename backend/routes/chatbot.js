import express from "express"
import { config } from "dotenv"
import { GoogleGenerativeAI } from "@google/generative-ai"

const router = express.Router()

const chatbot_instructions = `
You are AI Health Assistant, a smart medical chatbot designed to assist users with health-related concerns. 
Use the user's chat history and medical details to provide personalized, concise, and problem-solving responses. 
Always prioritize short, direct answers that help the user efficiently. 
\n
Guidelines:
Understand user symptoms, medical history, and previous chat context before responding.
Provide actionable solutions, including home remedies, precautions, and over-the-counter suggestions if applicable.
If a query is outside your scope, or symptoms seem severe, recommend consulting a doctor.
Maintain a professional and empathetic tone, ensuring user safety and well-being.
Do not diagnose complex diseases but guide users toward relevant health information.
\n
If unsure or symptoms indicate urgency, immediately advise medical consultation.
`


const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

router.post('/', async (req, res) => {
    const { messages } = req.body;

    try {
        const prompt = `${chatbot_instructions}\n\n**Chat History:**\n\n${messages.map(message => {
            return `**${message.role}:** ${message.text}\n`;
        }).join('')}`;

        const result = await model.generateContent(prompt);
        
        res.json({ message: result.response.text() });
    } catch (err) {
        res.json({ error: err.message });
    }
})

export default router;