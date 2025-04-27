import React, { useContext, useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { AppContext } from '../../../AppProvider';

const HealthOverview = ({ profile }) => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    const [healthData, setHealthData] = useState({
        summary: '',
        alert: {},
        tips: [],
        bloodGroup: 'Unknown',
        allergies: 'None',
        conditions: 'None',
        bmi: 0,
        heartRate: 72,
        steps: 0,
        weightHistory: [],
        heartRateHistory: [],
        currSteps: 0,
        goalSteps: 10000,
    });

    const { darkTheme } = useContext(AppContext);
    const themeColors = darkTheme
        ? {
            background: 'bg-gray-800',
            text: 'text-white',
            card: 'bg-gray-700',
            progressBar: 'bg-blue-400',
            progressBarBg: 'bg-gray-600',
        }
        : {
            background: 'bg-white',
            text: 'text-black',
            card: 'bg-gray-100',
            progressBar: 'bg-blue-500',
            progressBarBg: 'bg-gray-300',
        };

    const healthRecommendations = [
        { id: 1, tip: "Try to walk at least 10,000 steps a day for better heart health." },
        { id: 2, tip: "Stay hydrated! Drink at least 3 liters of water daily." },
        { id: 3, tip: "Reduce processed sugar intake to maintain a healthy BMI." },
    ];

    useEffect(() => {
        const height = profile?.health_info.height;
        const weight = profile?.health_info.weight;
        const bmi = (weight * 10000 / (height * height)).toFixed(1);

        const heartRate = profile?.health_info.heartRate;
        const bloodGroup = profile?.health_info.bloodGroup;
        const allergies = profile?.health_info.knownAllergies;
        const conditions = profile?.health_info.existingMedicalConditions;

        const currSteps = 5400;
        const goalSteps = 10000;

        const weightHistory = profile?.health_info.weightHistory?.map(({ weight, date }) => ({
            weight,
            month: `${months[new Date(date).getMonth()]}`,
        }));

        const heartRateHistory = profile?.health_info.heartRateLogs?.map(({ weight, date }) => ({
            'heart rate': heartRate,
            month: `${months[new Date(date).getMonth()]}`,
        }));

        setHealthData((prev) => ({
            ...prev,
            summary: profile?.health_info.ai_generated.health_summary,
            alert: profile?.health_info.ai_generated.health_alert,
            tips: profile?.health_info.ai_generated.lifestyle_tips,
            height,
            weight,
            bmi,
            heartRate,
            bloodGroup,
            allergies,
            conditions,
            weightHistory,
            heartRateHistory,
            currSteps,
            goalSteps,
        }));
    }, [profile]);

    return (
        <div className={`max-h-full overflow-auto custom-scrollbar p-4 rounded shadow ${themeColors.background} ${themeColors.text}`}>
            <h2 className="text-2xl font-semibold mb-2">Health Overview</h2>
            <p>Check your latest health statistics here.</p>

            <div className={`p-4 my-4 rounded ${themeColors.card}`}>
                <h3 className="text-xl font-semibold mb-2">Health Summary</h3>
                <p>{healthData?.summary}</p>
            </div>

            <div className="grid grid-cols-2 max-md:grid-cols-1 gap-4">
                <div className={`p-4 rounded ${themeColors.card}`}>
                    <h3 className="text-xl font-semibold mb-2">🏥 Health Overview</h3>
                    <div>
                        <p><b>Height:</b> {healthData.height} cm</p>
                        <p><b>Weight:</b> {healthData.weight} kg</p>
                        <div className="space-x-2">
                            <b>BMI:</b>
                            <span>{healthData.bmi}</span>
                            <span>(
                                {healthData.bmi < 18.5 ? 'Underweight' :
                                    healthData.bmi < 25 ? 'Healthy Weight' :
                                        healthData.bmi < 30 ? 'Overweight' :
                                            'Obesity'}
                                )</span>
                        </div>
                        <p><b>Heart Rate:</b> {healthData.heartRate} bpm</p>
                        <p><b>Steps Today:</b> {healthData.currSteps}</p>
                    </div>
                </div>

                <div className={`p-4 rounded ${themeColors.card}`}>
                    <h3 className="text-xl font-semibold mb-2">Steps Progress</h3>
                    <div className="relative">
                        <div className={`w-full rounded-lg overflow-hidden ${themeColors.progressBarBg}`}>
                            <div
                                className={`${themeColors.progressBar} h-4 transition-all duration-500`}
                                style={{ width: `${(healthData.currSteps / healthData.goalSteps) * 100}%` }}
                            ></div>
                        </div>
                        <div className="w-full flex justify-between relative mt-1">
                            <span>0</span>
                            <span>{healthData.goalSteps}</span>
                        </div>
                    </div>
                </div>

                {healthData.weightHistory && healthData.weightHistory.length > 0 && (
                    <div className={`p-4 rounded ${themeColors.card}`}>
                        <h3 className="text-xl font-semibold mb-2">📊 Weight Progress</h3>
                        <ResponsiveContainer width="100%" height={200}>
                            <LineChart data={healthData.weightHistory}>
                                <XAxis dataKey="month" />
                                <YAxis dataKey="weight" />
                                <Tooltip />
                                <Line type="monotone" dataKey="weight" stroke="#8884d8" />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                )}

                {healthData.heartRateHistory && healthData.heartRateHistory.length > 0 && (
                    <div className={`p-4 rounded ${themeColors.card}`}>
                        <h3 className="text-xl font-semibold mb-2">📊 Heart Rate History</h3>
                        <ResponsiveContainer width="100%" height={200}>
                            <LineChart data={healthData.heartRateHistory}>
                                <XAxis dataKey="month" />
                                <YAxis dataKey="heart rate" />
                                <Tooltip />
                                <Line type="monotone" dataKey="heart rate" stroke="#8884d8" />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                )}

                <div className={`p-4 rounded ${themeColors.card}`}>
                    <h3 className="text-xl font-semibold mb-2">🏥 Medical Conditions</h3>
                    <div>
                        <p><b>Blood Group:</b> {healthData.bloodGroup}</p>
                        <p><b>Allergies:</b> {healthData.allergies || 'None'}</p>
                        <p><b>Conditions:</b> {healthData.conditions || 'None'}</p>
                    </div>
                </div>

                <div className={`p-4 rounded ${themeColors.card}`}>
                    <h3 className="text-xl font-semibold mb-2">🛑 Alerts & Reminders</h3>
                    <div>
                        <p><b>Next Checkup:</b> 15 Aug</p>
                        <p><b>Medicine:</b> Take Aspirin</p>
                    </div>
                </div>
            </div>

            <div className={`p-4 my-4 rounded ${themeColors.card}`}>
                <h3 className="text-xl font-semibold mb-2">Health Tips</h3>
                <ul>
                    {healthData?.tips.map((tip, index) => (
                        <li key={index} className={`p-2 rounded-md my-2 ${darkTheme ? 'bg-gray-600' : 'bg-gray-200'}`}>
                            {tip}
                        </li>
                    ))}
                </ul>
            </div>
        </div >
    );
};

export default HealthOverview;
