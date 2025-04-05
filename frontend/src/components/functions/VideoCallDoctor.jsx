import React, { useState, useRef } from 'react';
import { FcVideoCall } from "react-icons/fc";
import { DraggableCore } from 'react-draggable';

const VideoCallDoctor = () => {
    const [isCalling, setIsCalling] = useState(false);
    const localVideoRef = useRef(null);
    const remoteVideoRef = useRef(null);
    const draggableRef = useRef(null);

    const draggingMargin = { x: 10, y: 10 };
    const [position, setPosition] = useState({ x: draggingMargin.x, y: draggingMargin.y });

    const startCall = () => {
        setIsCalling(true);
        // Add logic to start video call
    };

    const endCall = () => {
        setIsCalling(false);
        // Add logic to end video call
    };

    const handleStart = (e) => {
        // const rect = e.target.getBoundingClientRect();
        // setPosition({
        //     x: e.clientX - position.x,
        //     y: e.clientY - position.y,
        // });
    };

    const handleDrag = (e, data) => {
        setPosition({
            x: position.x + data.deltaX,
            y: position.y + data.deltaY,
        });
    };

    const handleStop = (e, data) => {
        const parentRect = e.target.closest('.relative').getBoundingClientRect();
        const videoRect = e.target.getBoundingClientRect();

        setPosition({
            x: Math.max(draggingMargin.x, Math.min(position.x + data.deltaX, parentRect.width - videoRect.width - draggingMargin.x)),
            y: Math.max(draggingMargin.y, Math.min(position.y + data.deltaY, parentRect.height - videoRect.height - draggingMargin.y)),
        });
    };

    return (
        <>
            <header className="flex justify-between items-center px-4 py-2">
                <h1 className="text-2xl font-semibold">
                    Video Call with Doctor <FcVideoCall className='inline text-3xl' />
                </h1>
                <div className="flex items-center space-x-4">
                    <img src="/profilePicture/1737561841070-anmol_photo.jpg" alt="Doctor Profile" className="w-16 h-16 rounded-full object-cover" />
                    <div>
                        <h2 className="text-xl font-semibold">Dr. John Doe</h2>
                        <p className="text-gray-600">Cardiologist</p>
                    </div>
                </div>
            </header>

            <div className="p-4 shadow-lg min-h-[75vh] max-h-screen w-full bg-gray-200/70 rounded-lg space-y-8">
                <div className='relative w-full h-[65vh]'>
                    <DraggableCore nodeRef={draggableRef} onDrag={handleDrag} onStop={handleStop}>
                        <div ref={draggableRef}>
                            <video
                                ref={localVideoRef}
                                src='/UltraEdit clone video.mp4'
                                autoPlay muted
                                className="w-64 h-48 absolute bottom-5 right-5 z-50 bg-black mb-4 rounded-lg"
                                style={{ top: `${position.y}px`, left: `${position.x}px` }}
                            ></video>
                        </div>
                    </DraggableCore>

                    <video ref={remoteVideoRef} src='/UltraEdit clone video.mp4' autoPlay muted className="w-full h-full bg-black mb-4 rounded-lg"></video>
                </div>

                <div className="flex justify-center space-x-4">
                    {!isCalling ? (
                        <button
                            onClick={startCall}
                            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                        >
                            Start Call
                        </button>
                    ) : (
                        <button
                            onClick={endCall}
                            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                        >
                            End Call
                        </button>
                    )}
                </div>
            </div>
        </>
    );
};

export default VideoCallDoctor;