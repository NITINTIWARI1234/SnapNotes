const ytDlp = require("yt-dlp-exec");

async function getVideoMetadata(url) {
  try {
    const info = await ytDlp(url, {
      dumpSingleJson: true,
      noWarnings: true,
      noCheckCertificates: true,
      preferFreeFormats: true,
      youtubeSkipDashManifest: true,
    });

    return {
      title: info.title,
      duration: info.duration,
      uploader: info.uploader,
      thumbnail: info.thumbnail,
      webpageUrl: info.webpage_url,
    };
  } catch (error) {
    throw new Error("Failed to fetch video metadata.");
  }
}

module.exports = {
  getVideoMetadata,
};