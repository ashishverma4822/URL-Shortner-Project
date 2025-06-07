import urlSchema from "../models/short_url.model.js";

export const saveShortUrl = async (shortUrl, longUrl, userId) => {
    const newUrl = new urlSchema({
        full_url: longUrl,
        short_url: shortUrl,
        clicks: 0
    });

    if(userId){
        newUrl.user = userId;
    }

    newUrl.save();
}


export const findUrlFromShortUrl = async (id) => {
    return await urlSchema.findOneAndUpdate({short_url: id}, {$inc:{clicks: 1}});
}