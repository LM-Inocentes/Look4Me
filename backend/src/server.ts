//package installs
// npm install express cors
// npm install ts-node --save-dev
// npm install nodemon --save-dev


import path from 'path';
import dotenv from 'dotenv';
dotenv.config();


import { dbConnect } from './configs/database.config';
import express from "express";
import cors from "cors";

import userRouter from './router/user.router';
import itemRouter from './router/item.router';


dbConnect();

const app = express();


app.use(express.json());
app.use(cors({
    credentials: true,
    origin: ['http://localhost:8888', 'http://127.0.0.1:8888'],
}));

app.use("/api/users/", userRouter);
app.use("/api/items/", itemRouter);

app.use(express.static('public'));
app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname, '/public', '/index.html'))
})

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log("Website is served on http://localhost:" +port);
})