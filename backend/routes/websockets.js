import { Server } from "socket.io";

const VideoSocketServer = (server) => {
    const io = new Server(server, {
        path: '/video-call',
        cors: {
            origin: ['http://localhost:5173', 'https://personalized-health-companion.vercel.app'],
            methods: ['GET', 'POST'],
            credentials: true
        }
    });

    const users = {};

    io.on('connection', socket => {
        socket.on('join-user', user => {
            users[socket.id] = { user, id: socket.id };
            io.emit('user-joined', users);
        });

        socket.on('offer', ({ from, remoteId, offer }) => {
            // console.log('Received offer on server:', offer);
            const to = Object.values(users).find(predicate => predicate.user === remoteId)?.id;
            if (to) socket.to(to).emit('offer', { from, to, offer });
        });

        socket.on('answer', ({ from, to, answer }) => {
            // console.log('Received answer on server:', answer);
            if (users[to]) socket.to(to).emit('answer', { from, to, answer });
        });

        socket.on('icecandidate', ({ candidate, to }) => {
            // console.log('Forwarding ICE candidate:', candidate);
            socket.to(to).emit('icecandidate', { candidate, from: socket.id });
        });

        socket.on('end-call', ({ from, to }) => {
            // console.log('Call ended on server', from, to);
            socket.to(to).emit('call-ended', { from });
        });

        socket.on('remote-busy', ({ from, to }) => {
            socket.to(to).emit('remote-busy', { from });
        });

        socket.on('disconnect', () => {
            delete users[socket.id];
            io.emit('user-left', users);
        });
    });
};

const ChatSocketServer = (server) => {
    const io = new Server(server, {
        path: '/chat',
        cors: {
            origin: ['http://localhost:5173', 'https://personalized-health-companion.vercel.app'],
            methods: ['GET', 'POST'],
            credentials: true
        }
    });

    const users = {}; // Map of socket IDs to user IDs
    const activeChats = {}; // Map of user IDs to their current chat room

    io.on('connection', socket => {
        socket.on('join-user', ({ userId, remoteId }) => {
            // console.log(`User ${userId} wants to chat with ${remoteId}`);

            // Create a unique room ID for 2 users
            const roomId = [userId, remoteId].sort().join('-');

            // Check if remote user is busy
            if (activeChats[remoteId] && activeChats[remoteId] !== roomId) {
                socket.emit('busy-remote');
                return;
            }

            socket.join(roomId); // adds socket.id to room 'roomId'

            activeChats[userId] = roomId;
            activeChats[remoteId] = roomId;

            // tell the user its room id
            socket.emit('user-joined', { roomId });

            // console.log(`Room created: ${roomId}`);
        });

        // Handle sending messages
        socket.on('send-message', ({ roomId, message }) => {
            // console.log(`Message from ${from} in room ${roomId}: ${message}`);
            socket.to(roomId).emit('receive-message', { message });
        });

        // Handle user disconnecting
        socket.on('disconnect', () => {
            // console.log(`User disconnected: ${socket.id}`);
            const userId = users[socket.id];

            // Remove the user from active chats
            if (userId && activeChats[userId]) {
                const roomId = activeChats[userId];
                socket.leave(roomId);

                delete activeChats[userId];
            }

            // Remove the user from the users map
            delete users[socket.id];
        });

        // Track connected users
        socket.on('register-user', (userId) => {
            users[socket.id] = userId;
            // console.log(`User registered: ${userId}`);
        });
    });
}

export { VideoSocketServer, ChatSocketServer };