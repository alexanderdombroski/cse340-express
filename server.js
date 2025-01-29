import express from 'express';
import url from 'url';
import path from 'path';

const app = express();

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Use middleware to set up Public resource folder
app.use(express.static(path.join(__dirname, 'public')));

// Route the Pages
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/views/home.html'))
});
app.get('/page1', (req, res) => {
    res.sendFile(path.join(__dirname, '/views/page1.html'))
});
app.get('/page2', (req, res) => {
    res.sendFile(path.join(__dirname, '/views/page2.html'))
});


const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});