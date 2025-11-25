import ImageKit from "imagekit-javascript";

const urlEndpoint = process.env.EXPO_PUBLIC_IMAGEKIT_URL_ENDPOINT;
const publicKey = process.env.EXPO_PUBLIC_IMAGEKIT_PUBLIC_KEY;
const authenticationEndpoint = process.env.EXPO_PUBLIC_IMAGEKIT_AUTHENTICATION_ENDPOINT;

if (!urlEndpoint || !publicKey || !authenticationEndpoint) {
    console.warn("ImageKit configuration is missing. Please check your .env file.");
}

const imagekit = new ImageKit({
    publicKey: publicKey || "",
    urlEndpoint: urlEndpoint || "",
    // authenticationEndpoint: authenticationEndpoint || "",
});

export default imagekit;
