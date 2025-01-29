import express from 'express';

const app = express();

const name = process.env.NAME;

app.get('/', (req, res) => {
    res.send(`Hello, ${name}!`);
});

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});