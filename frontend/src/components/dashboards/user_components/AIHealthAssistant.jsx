import React, { useContext, useEffect, useRef, useState } from 'react';
import { FaRegUserCircle } from "react-icons/fa";
import { FaRobot } from "react-icons/fa6";
import axios from 'axios';

import { AppContext } from "../../../AppProvider";

const backendURL = import.meta.env.VITE_BACKEND_URL;

const AIHealthAssistant = () => {
    const { darkTheme } = useContext(AppContext);

    const [messages, setMessages] = useState([{ role: "assistant", text: "What's in your mind?" }]);
    const [input, setInput] = useState("");
    const inputRef = useRef(null);

    const [currResponse, setCurrResponse] = useState("");
    const [currResIndex, setCurrResIndex] = useState(0);

    const [loading, setLoading] = useState(false);
    const typingSpeed = 30; // milliseconds per char

    const getResponse = async (messages) => {
        try {
            const response = await axios.post(`${backendURL}/gemini-chatbot`, { messages });
            return response.data;
        } catch (err) {
            console.log("error:", err);
        }
    };

    const sendMessage = async (e) => {
        e.preventDefault();
        if (!input) return;

        const userMessage = { role: 'user', text: input };
        setMessages([...messages, userMessage]);
        setLoading(true);
        setInput("");

        const res = await getResponse([...messages, userMessage]);

        setCurrResIndex(0);
        if (res.message) setCurrResponse(res.message);
        else setCurrResponse("Sorry, try again next time!");

        setLoading(false);
    };

    useEffect(() => {
        if (!loading && messages.length > 1) {
            setMessages([...messages, { role: "assistant", text: currResponse }]);
        }
        inputRef.current.focus();
    }, [loading]);

    useEffect(() => {
        let timeOut;

        if (messages[0].text && currResIndex <= messages[messages.length - 1].text.length) {
            timeOut = setTimeout(() => {
                setCurrResponse(messages[messages.length - 1].text.substring(0, currResIndex));
                setCurrResIndex((prevIndex) => prevIndex + 1);
            }, typingSpeed);
        }

        return () => clearTimeout(timeOut);
    }, [currResponse, currResIndex]);

    return (
        <div className={`h-[75vh] p-4 rounded shadow ${darkTheme ? "bg-gray-800 text-gray-100" : "bg-white text-gray-900"}`}>
            <h2 className="text-2xl font-semibold mb-2">AI Health Assistant</h2>
            <p className="text-gray-600 dark:text-gray-400">AI Doctor Chat</p>
            <div className={`h-3/4 mt-4 py-2 rounded ${darkTheme ? "bg-gray-700" : "bg-gray-100"}`}>
                <div className="flex flex-col-reverse gap-y-2 max-h-full custom-scrollbar overflow-y-auto mb-4 px-4">
                    {messages.length === 0 ? (
                        <p className="text-gray-700 dark:text-gray-300">Your conversation will appear here...</p>
                    ) : (
                        [...messages].reverse().map((message, index) => (
                            <div
                                key={index}
                                className={`flex gap-2 items-center ${message.role === 'user' ? 'flex-row-reverse' : ''}`}
                            >
                                {message.role === 'user' ? (
                                    <FaRegUserCircle className="text-lg" />
                                ) : (
                                    <FaRobot className="text-lg" />
                                )}
                                <p
                                    className={`inline-block p-2 rounded max-w-[70%] text-wrap break-words ${message.role === 'user'
                                        ? darkTheme
                                            ? "bg-blue-900 text-gray-100"
                                            : "bg-blue-100 text-gray-900"
                                        : darkTheme
                                            ? "bg-blue-700 text-gray-100"
                                            : "bg-blue-200 text-gray-900"
                                        }`}
                                >
                                    {message.text}
                                </p>
                            </div>
                        ))
                    )}
                </div>

                <form onSubmit={sendMessage} className="flex flex-wrap items-center px-4">
                    <input
                        type="text"
                        ref={inputRef}
                        value={input}
                        disabled={loading}
                        onChange={(e) => setInput(e.target.value)}
                        className={`flex-1 p-2 border rounded-l ${darkTheme
                            ? "border-gray-600 bg-gray-700 text-gray-100"
                            : "border-gray-300 bg-white text-gray-900"
                            }`}
                        placeholder="Ask your health question..."
                    />
                    <button
                        className={`p-2 rounded-r ${darkTheme
                            ? "bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 text-gray-100"
                            : "bg-blue-500 hover:bg-blue-600 disabled:bg-blue-700 text-white"
                            }`}
                        type="submit"
                        disabled={loading}
                    >
                        Send
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AIHealthAssistant;
