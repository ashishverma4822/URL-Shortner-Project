import express from "express";
import {nanoid} from "nanoid";
import dotenv from "dotenv";
import connectDB from "./src/config/monogo.config.js";
import short_url from "./src/routes/short_url.route.js";
import { redirectFromShortUrl } from "./src/controller/short_url.controller.js";
dotenv.config("./.env");
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use("/api/create", short_url)

app.get("/:id", redirectFromShortUrl);

app.listen(3000, ()=>{
    connectDB();
    console.log("Server is running on http://localhost:3000");
})
