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


// Middleware
app.use((req, res, next) => {
    console.log(`Method: ${req.method}, URL: ${req.url}`);
    next(); // Pass control to the next middleware or route
});
app.use((req, res, next) => {
    req.timestamp = new Date().toISOString();
    next();
});
// ID validation middleware
const validateId = (req, res, next) => {
    const { id } = req.params;
    if (isNaN(id)) {
        return res.status(400).send('Invalid ID: must be a number.');
    }
    next(); // Pass control to the next middleware or route
};
// Middleware to validate name
const validateName = (req, res, next) => {
    const { name } = req.params;
    if (!/^[a-zA-Z]+$/.test(name)) {
        return res.status(400).send('Invalid name: must only contain letters.');
    }
    next();
};

// Global middleware to set a custom header
app.use((req, res, next) => {
    res.setHeader('X-Powered-By', 'Express Middleware Tutorial');
    next();
});

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
// Account page route with ID and name validation
app.get('/account/:name/:id', validateId, validateName, (req, res) => {
    const title = "Account Page";
    const { name, id } = req.params;
    const isEven = id % 2 === 0 ? "even" : "odd";
    const content = `
        <h1>Welcome, ${name}!</h1>
        <p>Your account ID is ${id}, which is an ${isEven} number.</p>
    `;
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