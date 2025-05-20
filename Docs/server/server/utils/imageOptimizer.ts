import sharp from 'sharp';
import { isWebPSupported } from './browserCheck';

export const optimizeImage = async (imageBuffer: Buffer, options = {
    quality: 80,
    width: 800
}) => {
    try {
        const webpSupported = await isWebPSupported();

        let optimizedImage = sharp(imageBuffer)
            .resize(options.width)
            .jpeg({ quality: options.quality });

        if (webpSupported) {
            optimizedImage = optimizedImage.webp({ quality: options.quality });
        }

        return await optimizedImage.toBuffer();
    } catch (error) {
        console.error('Image optimization failed:', error);
        return imageBuffer; // Return original if optimization fails
    }
};

export const generateBlurHash = async (imageBuffer: Buffer) => {
    try {
        const { width, height, data } = await sharp(imageBuffer)
            .resize(32, 32, { fit: 'inside' })
            .raw()
            .toBuffer({ resolveWithObject: true });

        // Implementation of blurhash algorithm
        // This is a simplified version, you might want to use the actual blurhash library
        return { width, height, data: Buffer.from(data).toString('base64') };
    } catch (error) {
        console.error('Blurhash generation failed:', error);
        return null;
    }
}; 