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

        socket.on('offer', ({ from, to, offer }) => {
            // console.log('Received offer on server:', offer);
            if (users[to]) socket.to(to).emit('offer', { from, to, offer });
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
            // console.log('Call ended on server');
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

    const users = {};

    io.on('connection', socket => {
        socket.on('join-user', ({ user, remote }) => {
            users[socket.id] = { user, id: socket.id };

            const to = Object.values(users).find(user => user === remote).id;
            if (to) socket.to(to).emit('user-joined', users[socket.id]);
        });

        socket.on('send-message', ({ from, to, message }) => {
            if (to) socket.to(to).emit('receive-message', { from, message });
        });

        socket.on('disconnect', () => {
            delete users[socket.id];
            socket.leave();
        });
    });
}

export { VideoSocketServer, ChatSocketServer };