import { findUrlFromShortUrl } from "../dao/short_url.js";
import {  createShortUrlWithoutService } from "../services/short_url.service.js";
import { generateNanoid } from "../utils/helper.js";


export const createShortUrl = async (req, res) => {
    const {url} = req.body;
    const shortUrl = await createShortUrlWithoutService(url);
    res.send(process.env.APP_URL + shortUrl);
}


export const redirectFromShortUrl = async (req, res) => {
    const {id} = req.params;
    const url = await findUrlFromShortUrl(id);
    if (url) {
        res.redirect(url.full_url);
    }else{
        res.status(404).send("URL not found");
    }
}