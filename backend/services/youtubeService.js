const axios = require("axios");

async function getVideoMetadata(url) {
    try {
        const response = await axios.get(
            "https://www.youtube.com/oembed",
            {
                params: {
                    url,
                    format: "json",
                },
            }
        );

        return {
            title: response.data.title,
            uploader: response.data.author_name,
            thumbnail: response.data.thumbnail_url,
        };

    } catch (error) {
        console.error(error);
        throw new Error("Invalid YouTube URL.");
    }
}

module.exports = {
    getVideoMetadata,
};