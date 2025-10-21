import cloudinary from 'cloudinary';
import env from './envConfig.js';
import ENV_VARS from '../constants/envVars.js';

const CLOUDINARY_NAME = env(ENV_VARS.CLOUDINARY.NAME);
const CLOUDINARY_API_KEY = env(ENV_VARS.CLOUDINARY.API_KEY);
const CLOUDINARY_API_SECRET = env(ENV_VARS.CLOUDINARY.API_SECRET);

/**
 * Configures the Cloudinary SDK with API credentials and settings.
 *
 * This must be called before performing any uploads or other Cloudinary operations.
 *
 * @function
 * @param {Object} config - Cloudinary configuration object.
 * @param {boolean} config.secure - If true, URLs returned will use HTTPS.
 * @param {string} config.cloud_name - Cloudinary cloud name.
 * @param {string} config.api_key - Cloudinary API key.
 * @param {string} config.api_secret - Cloudinary API secret.
 */
cloudinary.v2.config({
    secure: true,
    cloud_name: CLOUDINARY_NAME,
    api_key: CLOUDINARY_API_KEY,
    api_secret: CLOUDINARY_API_SECRET
});

/**
 * Uploads a file to Cloudinary and returns the secure URL.
 *
 * @async
 * @function saveToCloudinary
 * @param {Object} file - File object (from multer) to be uploaded.
 * @param {Buffer} file.buffer - The file buffer.
 * @param {string} file.originalname - The original name of the file.
 * @param {string} [folderName] - Optional Cloudinary folder name to store the file.
 *
 * @returns {Promise<string>} Resolves with the secure URL of the uploaded image.
 *
 * @throws {Error} Throws an error if the upload to Cloudinary fails.
 *
 * @example
 * const url = await saveToCloudinary(req.file, "userAvatars");
 * console.log(url); // https://res.cloudinary.com/yourcloud/image/upload/v123456/avatar.jpg
 */
const saveToCloudinary = async (file, folderName = "") => {
    return new Promise((resolve, reject) => {
        // Validate file buffer
        if (!file || !file.buffer) {
            reject(new Error('Invalid file metadata: No file buffer provided'));
            return;
        }
        
        // Validate file size
        if (file.buffer.length === 0) {
            reject(new Error('Invalid file metadata: Empty file buffer'));
            return;
        }
        
        const uploadOptions = {
            resource_type: "image",
            // Add validation options
            allowed_formats: ['jpg', 'jpeg', 'png', 'gif', 'webp', 'avif'],
            // Disable metadata extraction that might cause issues
            eager: [],
            // Add error handling
            invalidate: true
        };
        
        if(folderName) uploadOptions.folder = folderName;
        
        const stream = cloudinary.v2.uploader.upload_stream(uploadOptions, (error, result) => {
            if (error) {
                console.error('Cloudinary upload error:', error);
                reject(new Error(`Invalid file metadata: ${error.message}`));
            } else {
                resolve(result.secure_url);
            }
        });
        
        stream.end(file.buffer);
    });
}

export default saveToCloudinary;