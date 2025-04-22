import React, { useEffect, useState, useRef, useContext } from 'react';
import { FcVideoCall } from "react-icons/fc";
import { DraggableCore } from 'react-draggable';
import { io } from 'socket.io-client';
import axios from 'axios';

import { AppContext } from "../../AppProvider";

const backendURL = "https://personalized-health-companion-backend.vercel.app";
// const backendURL = "http://localhost:3000";

const VideoCall = () => {
    const { profile } = useContext(AppContext);

    const localVideoRef = useRef(null);
    const remoteVideoRef = useRef(null);
    const socketRef = useRef(null);
    const peerConnection = useRef(null);

    // const [remoteUser, setRemoteUser] = useState(null);
    const [started, setStarted] = useState(false);
    const [patient, setPatient] = useState(null);
    const [doctor, setDoctor] = useState(null);

    useEffect(() => {
        const appointmentId = window.location.pathname.split("/").pop();

        const fetchAppointmentData = async () => {
            try {
                const response = await axios.get(`${backendURL}/dashboard/appointments/appointment?id=${appointmentId}`, { withCredentials: true });

                // Process the data as needed
                setPatient(response.data.appointment.user);
                setDoctor(response.data.appointment.doctor);
            } catch (error) {
                console.error('Error fetching appointment data:', error);
            }
        };

        fetchAppointmentData();
    }, [])

    useEffect(() => {
        console.log(profile);
    }, [profile])


    // Single Method for Peer Connection
    const createPeerConnection = async (remoteId) => {
        peerConnection.current = new RTCPeerConnection({
            iceServers: [{
                urls: 'stun:stun.l.google.com:19302'
            }]
        })

        peerConnection.current.remoteUserId = remoteId;

        // listen to remote stream and add to peer connection
        peerConnection.current.ontrack = (e) => {
            remoteVideoRef.current.srcObject = e.streams[0];
        }

        // listen for ICE candidate
        peerConnection.current.onicecandidate = (e) => {
            if (e.candidate) {
                socketRef.current.emit("icecandidate", { candidate: e.candidate.toJSON(), to: peerConnection.current.remoteUserId });
            }
        }

        // add local stream to peer connection
        localVideoRef.current.srcObject.getTracks().forEach(track => {
            peerConnection.current.addTrack(track, localVideoRef.current.srcObject)
        });
    }

    const startLocalVideo = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true })
            localVideoRef.current.srcObject = stream;
        }
        catch (err) {
            console.log("Local Video Error:", err);
        }
    }

    const handleOffer = async ({ from, to, offer }) => {
        if (peerConnection.current) {
            socketRef.current.emit('remote-busy', { from: to, to: from });
            return;
        }
        else {
            await startLocalVideo();
            await createPeerConnection(from);
            // setRemoteUser(from);
        }

        const pc = peerConnection.current;
        pc.setRemoteDescription(offer);

        const answer = await pc.createAnswer();
        await pc.setLocalDescription(answer);

        socketRef.current.emit('answer', { from: to, to: from, answer: pc.localDescription.toJSON() });
    }

    const handleAnswer = async ({ answer }) => {
        await peerConnection.current.setRemoteDescription(answer);
    }

    const handleIceCandidate = async ({ candidate }) => {
        if (peerConnection.current) await peerConnection.current.addIceCandidate(new RTCIceCandidate(candidate));
        else console.warn('Peer connection is null. Ignoring ICE candidate.');
    }

    const handleRemoteBusy = () => {
        console.log('Remote user is busy');
        endCall();
    }

    const handleCallEnded = () => {
        console.log('Call ended');
        endCall();
    }

    useEffect(() => {
        startLocalVideo();

        socketRef.current = io(backendURL, { path: '/video-call', withCredentials: true });

        socketRef.current.on('connect', () => {
            console.log('Connected to the server:', socketRef.current.id);
        });
        socketRef.current.on('disconnect', () => {
            console.log('Disconnected from the server');
        });
        socketRef.current.on('connect_error', (error) => {
            console.error('Connection error:', error);
        });

        socketRef.current.on('offer', handleOffer);
        socketRef.current.on('answer', handleAnswer);
        socketRef.current.on('icecandidate', handleIceCandidate);
        socketRef.current.on('remote-busy', handleRemoteBusy);
        socketRef.current.on('call-ended', handleCallEnded);

        return () => {
            socketRef.current.disconnect();
        }
    }, []);

    // useEffect(() => {
    //     if (profile) socketRef.current.emit('join-user', profile._id);
    // }, [profile])

    // const joinUser = (e) => {
    //     e.preventDefault();
    //     if (name) {
    //         socketRef.current.emit('join-user', name);
    //         setStarted(true);
    //     }
    // }

    // const leaveUser = () => {
    //     socketRef.current.emit('leave-user');
    //     setStarted(false);
    // }

    const startCall = async () => {
        await startLocalVideo();

        await createPeerConnection(user);

        const offer = await peerConnection.current.createOffer();
        await peerConnection.current.setLocalDescription(offer);
        socketRef.current.emit('offer', { from: socketRef.current.id, to: user, offer: peerConnection.current.localDescription });

        // setRemoteUser(user);
    }


    const endCall = () => {
        if (localVideoRef.current.srcObject) {
            localVideoRef.current.srcObject.getTracks().forEach(track => track.stop());
            localVideoRef.current.srcObject = null;
        }

        if (remoteVideoRef.current.srcObject) {
            remoteVideoRef.current.srcObject.getTracks().forEach(track => track.stop());
            remoteVideoRef.current.srcObject = null;
        }

        if (peerConnection.current) {
            peerConnection.current.close();
            peerConnection.current = null;
        }

        // setRemoteUser(null);
    }

    const draggableRef = useRef(null);

    const draggingMargin = { x: 10, y: 10 };
    const [position, setPosition] = useState({ x: draggingMargin.x, y: draggingMargin.y });

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
            {/* <div className="users-container">
                {remoteUser && (
                    <button onClick={() => { endCall(); socketRef.current.emit('end-call', { from: socketRef.current.id, to: remoteUser }); }} className='call-button'>End Call</button>
                )}
                {!remoteUser && users.map(user => (
                    <button key={user.id} onClick={() => startCall(user.id)} className='call-button'>Call {user.name}</button>
                ))}
            </div>

            <div className="video-container">
                <div>
                    <video ref={remoteVideoRef} autoPlay className='video'></video>
                    <h1>{remoteUser ? users.find(user => user.id === remoteUser).name || remoteUser : "Remote User"}</h1>
                </div>

                <div>
                    <video ref={localVideoRef} autoPlay muted className="video"></video>
                    <h1>You (Local)</h1>
                </div>
            </div> */}

            <header className="flex justify-between items-center px-4 py-2">
                <div className="flex items-center space-x-4">
                    <img src={`/profilePicture/${patient?.profilePicture}`} alt="User Profile" className="w-16 h-16 rounded-full object-cover" />
                    <div>
                        <h2 className="text-xl font-semibold">{patient?.personal_info.fullName}</h2>
                        <p className="text-gray-600">Patient</p>
                    </div>
                </div>
                <div className="flex items-center space-x-4">
                    <img src={`/profilePicture/${doctor?.profilePicture}`} alt="Doctor Profile" className="w-16 h-16 rounded-full object-cover" />
                    <div>
                        <h2 className="text-xl font-semibold">{doctor?.personal_info.fullName}</h2>
                        <p className="text-gray-600">{doctor?.professional_info.speciality}</p>
                    </div>
                </div>
            </header>

            <div className="p-4 shadow-lg min-h-[75vh] max-h-screen w-full bg-gray-200/70 rounded-lg space-y-8">
                <div className='relative w-full h-[65vh]'>
                    <DraggableCore nodeRef={draggableRef} onDrag={handleDrag} onStop={handleStop}>
                        <div ref={draggableRef}>
                            <video
                                ref={localVideoRef}
                                autoPlay muted
                                className="w-64 h-48 absolute bottom-5 right-5 z-50 bg-black mb-4 rounded-lg"
                                style={{ top: `${position.y}px`, left: `${position.x}px` }}
                            ></video>
                        </div>
                    </DraggableCore>

                    <video ref={remoteVideoRef} autoPlay muted className="w-full h-full bg-black mb-4 rounded-lg"></video>
                </div>

                <div className="flex justify-center space-x-4">
                    {!started ? (
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

export default VideoCall;