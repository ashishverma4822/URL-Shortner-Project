import { findUrlFromShortUrl } from "../dao/short_url.js";
import {  createShortUrlServiceWithUser, createShortUrlWithoutService } from "../services/short_url.service.js";
import { generateNanoid } from "../utils/helper.js";
import wrapAsync from "../utils/tryCatchWrapper.js";


export const createShortUrl = wrapAsync(async (req, res) => {
    const data = req.body;
    let shortUrl
    if(req.user){
        shortUrl = await createShortUrlServiceWithUser(data.url,req.user._id,data.slug)
    }
    else{
        shortUrl = await createShortUrlWithoutService(data.url);
    }
    res.status(200).json({shortUrl : process.env.APP_URL + shortUrl});
})


export const redirectFromShortUrl = wrapAsync(async (req, res) => {
    const {id} = req.params;
    const url = await findUrlFromShortUrl(id);
    if (url) {
        res.redirect(url.full_url);
    }else{
        throw new Error("Short URL not found");
    }
})

export const createCustomShortUrl = wrapAsync(async (req,res) =>{
    const {url,slug} = req.body
    if(req.user){
        const shortUrl = await createShortUrlServiceWithUser(url,req.user._id)
    }
    else{
        const shortUrl = await createShortUrlWithoutService(url);
    }
    res.status(200).json({shortUrl: process.env.APP_URL + shortUrl})
})