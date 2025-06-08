import { generateNanoid } from "../utils/helper.js";
import urlSchema from "../models/short_url.model.js";
import { saveShortUrl } from "../dao/short_url.js";

export const createShortUrlWithoutService = async (url) => {
    const shortUrl = generateNanoid(8);
    if(!shortUrl) throw new Error("Failed to generate short URL");
    await saveShortUrl(shortUrl, url);
    return shortUrl;
}

export const createShortUrlServiceWithUser = async (url,userId) => {
    const shortUrl = generateNanoid(8);
    await saveShortUrl(shortUrl, url, userId);
    return shortUrl;
}