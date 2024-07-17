import express, { request, response } from "express";
import { PORT , mongodbURL} from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";
import booksRoute from "./routes/bookRoute.js";
import cors from 'cors';

const app = express();

app.use(express.json());

// Middleware for handling CORS POLICY
// Option 1: Allow All Origins with Default of cors(*)
app.use(cors());
// Option 2: Allow Custom Origins
// app.use(
//   cors({
//     origin: 'http://localhost:3000',
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     allowedHeaders: ['Content-Type'],
//   })
// );

app.get('/', async(request, response) =>{
    console.log(request);
    return response.status(234).send('welcome to tutorial')
})

app.use('/books', booksRoute);



mongoose
    .connect(mongodbURL)
    .then(()=>{
        console.log('App connected to database')
        app.listen(PORT, ()=>{
            console.log(`App is listening to PORT: ${PORT}`);
        })
    })
    .catch((error)=>{
        console.log(error);
    })

