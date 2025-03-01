import React, { useContext, useEffect, useRef, useState } from 'react'
import { FaRegUserCircle } from "react-icons/fa";
import { FaRobot } from "react-icons/fa6";
import axios from 'axios';

import { AppContext } from "../../../AppProvider"

const AIHealthAssistant = () => {
    const { darkTheme } = useContext(AppContext);

    const [messages, setMessages] = useState([{ role: "assistant", text: "What's in your mind?" }]);
    const [input, setInput] = useState("");
    const inputRef = useRef(null)

    const [currResponse, setCurrResponse] = useState("")
    const [currResIndex, setCurrResIndex] = useState(0)

    const [loading, setLoading] = useState(false)
    const typingSpeed = 30 // seconds per char

    const getResponse = async (messages) => {
        try {
            const response = await axios.post(`http://localhost:3000/gemini-chatbot`, { messages });
            return response.data;
        } catch (err) {
            console.log("error:", err);
        }
    }


    const sendMessage = async (e) => {
        e.preventDefault();
        if (!input) return;

        const userMessage = { role: 'user', text: input };
        setMessages([...messages, userMessage]);
        setLoading(true);
        setInput("");

        const res = await getResponse([...messages, userMessage]);

        setCurrResIndex(0)
        if (res.message) setCurrResponse(res.message);
        else setCurrResponse("Sorry, try again next time!");

        setLoading(false);

    };

    useEffect(() => {
        if (loading == false && messages.length > 1)
            setMessages([...messages, { role: "assistant", text: currResponse }])

        inputRef.current.focus();
    }, [loading])

    useEffect(() => {
        let timeOut;

        if (messages[0].text && currResIndex <= messages[messages.length - 1].text.length) {
            timeOut = setTimeout(() => {
                setCurrResponse(messages[messages.length - 1].text.substring(0, currResIndex));
                setCurrResIndex(prevIndex => prevIndex + 1);
            }, typingSpeed);
        }

        return () => clearTimeout(timeOut);
    }, [currResponse, currResIndex])

    return (
        <div className="h-[75vh] p-4 bg-white rounded shadow">
            <h2 className="text-2xl font-semibold mb-2">AI Health Assistant</h2>
            <p>AI Doctor Chat</p>
            <div className="h-3/4 mt-4 py-2 bg-gray-100 rounded">
                <div className="flex flex-col-reverse gap-y-2 max-h-full custom-scrollbar overflow-y-auto mb-4">
                    <div className={`flex items-center gap-2 mx-4 ${darkTheme ? 'text-white' : 'text-gray-800'}`}>
                        {(loading || currResponse) ? <FaRobot className='text-lg' /> : ''}
                        {loading ? (
                            darkTheme ? (
                                <img src="/typing-light.gif" className="w-8" />
                            ) : (
                                <img src="/typing-dark.gif" className="bg-white w-8" />
                            )
                        ) : currResponse ? (
                            <p className={`${darkTheme ? 'bg-blue-900' : 'bg-blue-200'} rounded px-2 py-1 max-w-[70%] text-wrap break-words`}>{currResponse}</p>
                        ) : ''}
                    </div>

                    {messages.length === 0 ? (
                        <p className="text-gray-700 mx-4">Your conversation will appear here...</p>
                    ) : (
                        [...messages].reverse().map((message, index) => {
                            if (index != 0 || message.role != 'assistant')
                                return (<div key={index} className={`flex gap-2 items-center mx-4 ${message.role === 'user' ? 'flex-row-reverse' : ''}`}>
                                    {message.role === 'user' ? <FaRegUserCircle className='text-lg' /> : <FaRobot className='text-lg' />}
                                    <p className={`inline-block p-2 rounded max-w-[70%] text-wrap break-words ${message.role === 'user' ? 'bg-blue-100' : 'bg-blue-200'}`}>
                                        {message.text}
                                    </p>
                                </div>)
                        })
                    )}
                </div>

                <form onSubmit={sendMessage} className="flex items-center mx-4">
                    <input
                        type="text"
                        ref={inputRef}
                        value={input}
                        disabled={loading}
                        onChange={(e) => setInput(e.target.value)}
                        className="flex-1 p-2 border rounded-l"
                        placeholder="Ask your health question..."
                    />
                    <button
                        className="p-2 bg-blue-500 text-white rounded-r"
                        type='submit'
                    >
                        Send
                    </button>
                </form>
            </div>
        </div>
    );
}

export default AIHealthAssistant
