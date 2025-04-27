import axios from 'axios';
import { HealthRecord } from '../models/userRecordSchemas.js';

import { config } from "dotenv"
import { GoogleGenerativeAI } from "@google/generative-ai"

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

async function generateAIResponse(prompt) {
    try {
        const response = await model.generateContent(prompt);

        return response.response.text().trim();
    } catch (error) {
        console.error('Ollama error:', error.response);
        return '';
    }
}


// Recommend doctor
// const recommendDoctor = async (req, res) => {
//     const { medicalHistory } = req.body;
//     const prompt = `Suggest a specialist doctor based on this medical history: ${medicalHistory}`;
//     const aiResponse = await generateAIResponse(prompt, 'mistral');
//     res.json({ recommendation: aiResponse });
// };

// Health summary
const healthSummary = async (health_info) => {
    const prompt = `Be straight to point and Act like cerified AI doctor. Analyze the following patient vitals data and summerise it in 20 words: 
    ${JSON.stringify(health_info)}`;
    const aiResponse = await generateAIResponse(prompt);
    return aiResponse;
};

// Health alert
const healthAlert = async (health_info) => {
    const prompt = `Be straight to point and Act like cerified AI doctor. Analyze the following patient vitals data and provide two responses: 
    - Health alert information (in max 4-5 words) if any, otherwise null,
    - Whether an emergency is needed (true/false), use delimited '|'
    ${JSON.stringify(health_info)}`;
    const aiResponse = await generateAIResponse(prompt);

    const [alert, emergency] = aiResponse.split('|').map(item => item.trim());
    return { alert: alert === 'null' ? null : alert, emergency: emergency === 'true' };
};

// Lifestyle tips
const lifestyleTips = async (health_info) => {
    const prompt = `Be straight to point and Act like cerified AI doctor. Suggest lifestyle tips based on this data in 2-3 points each in 5-10 words (delimited by '\n', avoid bullets or list numbering): 
    ${JSON.stringify(health_info)}`;
    const aiResponse = await generateAIResponse(prompt);

    const tips = aiResponse.split('\n').filter(point => point.trim() !== '');
    return tips;
};

const generateAIContent = async (req, res) => {
    let health_infos = await HealthRecord.find({});

    health_infos.forEach(async (health_info) => {
        // remove last generated AI content
        health_info = Object.fromEntries(
            Object.entries(health_info._doc).filter(([key]) => key !== 'ai_generated')
        );
        const existingContent = health_info.ai_generated || {};

        const newContent = {
            'health_summary': await healthSummary(health_info),
            'health_alert': await healthAlert(health_info),
            'lifestyle_tips': await lifestyleTips(health_info),
        };

        const content = {
            'health_summary': newContent.health_summary || existingContent.health_summary,
            'health_alert': newContent.health_alert || existingContent.health_alert,
            'lifestyle_tips': newContent.lifestyle_tips || existingContent.lifestyle_tips,
        };

        await HealthRecord.findByIdAndUpdate(health_info._id, { ai_generated: content });
    });
};

export { generateAIContent };