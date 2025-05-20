import crypto from 'crypto';

const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY || 'your-fallback-key-minimum-32-chars-long'; // 32 bytes
const IV_LENGTH = 16; // For AES, this is always 16

export class SecurityUtils {
    static encrypt(text: string): string {
        const iv = crypto.randomBytes(IV_LENGTH);
        const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), iv);
        let encrypted = cipher.update(text);
        encrypted = Buffer.concat([encrypted, cipher.final()]);
        return iv.toString('hex') + ':' + encrypted.toString('hex');
    }

    static decrypt(text: string): string {
        const textParts = text.split(':');
        const iv = Buffer.from(textParts.shift()!, 'hex');
        const encryptedText = Buffer.from(textParts.join(':'), 'hex');
        const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), iv);
        let decrypted = decipher.update(encryptedText);
        decrypted = Buffer.concat([decrypted, decipher.final()]);
        return decrypted.toString();
    }

    static hashPassword(password: string): string {
        return crypto.pbkdf2Sync(password, 
            process.env.SALT || 'default-salt', 
            10000, 
            64, 
            'sha512'
        ).toString('hex');
    }

    static validateApiKey(apiKey: string): boolean {
        // Implement API key validation logic
        const validApiKeys = process.env.VALID_API_KEYS?.split(',') || [];
        return validApiKeys.includes(apiKey);
    }

    static sanitizeInput(input: string): string {
        // Basic XSS prevention
        return input
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#x27;')
            .replace(/\//g, '&#x2F;');
    }

    static generateSecureToken(): string {
        return crypto.randomBytes(32).toString('hex');
    }
} 