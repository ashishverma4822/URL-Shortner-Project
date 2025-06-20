import { generateNanoid } from "../utils/helper.js";
import urlSchema from "../models/short_url.model.js";
import { getCustomShortUrl, saveShortUrl } from "../dao/short_url.js";

export const createShortUrlWithoutService = async (url) => {
    const shortUrl = generateNanoid(8);
    if(!shortUrl) throw new Error("Failed to generate short URL");
    await saveShortUrl(url,shortUrl);
    return shortUrl;
}

export const createShortUrlServiceWithUser = async (url,userId,slug=null) => {
    const shortUrl = slug || generateNanoid(8);
    const exist = await getCustomShortUrl(slug)
    if(exist) throw new Error("This custom url already exists")
    await saveShortUrl(url, shortUrl, userId);
    return shortUrl;
}