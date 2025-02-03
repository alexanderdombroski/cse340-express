import express from 'express';
import url from 'url';
import path from 'path';

const app = express();

const MODE = process.env.MODE || 'production'
const PORT = parseInt(process.env.PORT) || 3000;

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Use middleware to set up Public resource folder
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


// Route the Pages
// Example of the home route using the layout
app.get('/', (req, res) => {
    const title = 'Home Page';
    const content = '<h1>Welcome to the Home Page</h1>';
    res.render('index', { title, content, MODE, PORT });
});
app.get('/about', (req, res) => {
    const title = 'About Page';
    const content = '<h1>Welcome to the About Page</h1>';
    res.render('index', { title, content, MODE, PORT });
});
app.get('/contact', (req, res) => {
    const title = 'Contact Page';
    const content = '<h1>Welcome to the Contact Page</h1>';
    res.render('index', { title, content, MODE, PORT });
});
// Account page
app.get('/account/:name/:id', (req, res) => {
    const title = "Account Page";
    const { name, id } = req.params;
    const content = `<h1>Welcome, ${name}!</h1><p>Your account ID is ${id}.</p>`;
    res.render('index', { title, content, MODE, PORT });
});

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


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});