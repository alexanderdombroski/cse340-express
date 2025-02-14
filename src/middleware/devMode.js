const MODE = process.env.MODE;
const PORT = parseInt(process.env.PORT);

// When in development mode, start a WebSocket server for live reloading
if (MODE.includes('dev')) {
    const ws = await import('ws');

    try {
        const wsPort = PORT + 1;
        const wsServer = new ws.WebSocketServer({ port: wsPort });

        wsServer.on('listening', () => {
            console.log(`WebSocket server is running on port ${wsPort}`);
        });

        wsServer.on('error', (error) => {
            console.error('WebSocket server error:', error);
        });
    } catch (error) {
        console.error('Failed to start WebSocket server:', error);
    }
}

const devModeMiddleware = (req, res, next) => {
    res.locals.port = PORT;
    res.locals.isDevMode = MODE.includes('dev');
    res.locals.devModeWarning = "You are currently in development mode";
    
    if (res.locals.isDevMode) {
        res.addScript(`<script>
            const ws = new WebSocket("ws://localhost:${PORT + 1}");
            ws.onclose = () => {
                setTimeout(() => location.reload(), 2000);
            };
        </script>`)
    }

    next();
}

export default devModeMiddleware