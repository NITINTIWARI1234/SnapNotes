const validator = require("validator");

function isValidYoutubeUrl(url) {
  // Check if it's a valid URL
  if (!validator.isURL(url)) {
    return false;
  }

  // Allow only YouTube domains
  const youtubeRegex =
    /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/;

  return youtubeRegex.test(url);
}

module.exports = {
  isValidYoutubeUrl,
};