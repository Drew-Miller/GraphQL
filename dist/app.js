import express from 'express';
import cors from 'cors';
import { json } from 'body-parser';
const app = express();
// middleware
app.use(cors());
app.use(json());
// routes
app.get('/', (req, res) => {
    res.send('Hello World!');
});
export { app };
