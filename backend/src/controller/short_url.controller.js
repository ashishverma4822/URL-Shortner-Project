import { findUrlFromShortUrl } from "../dao/short_url.js";
import {  createShortUrlWithoutService } from "../services/short_url.service.js";
import { generateNanoid } from "../utils/helper.js";
import wrapAsync from "../utils/tryCatchWrapper.js";


export const createShortUrl = wrapAsync(async (req, res) => {
    const {url} = req.body;
    const shortUrl = await createShortUrlWithoutService(url);
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