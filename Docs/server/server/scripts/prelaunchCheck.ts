import dotenv from 'dotenv';
import { LoadTester } from '../utils/LoadTester';
import { AWSAutoScaling } from '../utils/AWSAutoScaling';
import { SecurityUtils } from '../utils/SecurityUtils';
import { EmailCampaignService } from '../services/EmailCampaignService';

// Load environment variables
dotenv.config();

interface CheckResult {
    name: string;
    status: 'success' | 'warning' | 'failure';
    message: string;
}

async function runPrelaunchChecks(): Promise<void> {
    const results: CheckResult[] = [];
    let hasFailures = false;
    let hasWarnings = false;

    // Security Checks
    console.log('\n🔒 Running Security Checks...');

    const requiredEnvVars = [
        'ENCRYPTION_KEY',
        'AWS_ACCESS_KEY_ID',
        'AWS_SECRET_ACCESS_KEY',
        'AWS_REGION',
        'EMAIL_SENDER',
        'FACEBOOK_ACCESS_TOKEN'
    ];

    for (const envVar of requiredEnvVars) {
        if (!process.env[envVar]) {
            results.push({
                name: `Check ${envVar}`,
                status: 'failure',
                message: `Missing required environment variable: ${envVar}`
            });
            hasFailures = true;
        }
    }

    // Test encryption
    try {
        const securityUtils = new SecurityUtils();
        const testData = 'test-data';
        const encrypted = await securityUtils.encrypt(testData);
        const decrypted = await securityUtils.decrypt(encrypted);

        if (decrypted === testData) {
            results.push({
                name: 'Encryption Test',
                status: 'success',
                message: 'Encryption/decryption working correctly'
            });
        }
    } catch (error) {
        results.push({
            name: 'Encryption Test',
            status: 'failure',
            message: `Encryption test failed: ${error.message}`
        });
        hasFailures = true;
    }

    // Load Testing
    console.log('\n🔄 Running Load Tests...');
    const loadTester = new LoadTester();

    try {
        const loadTestResults = await loadTester.runTests();
        const avgResponseTime = loadTestResults.averageResponseTime;

        if (avgResponseTime < 200) {
            results.push({
                name: 'Load Test',
                status: 'success',
                message: `Average response time: ${avgResponseTime}ms`
            });
        } else if (avgResponseTime < 500) {
            results.push({
                name: 'Load Test',
                status: 'warning',
                message: `High average response time: ${avgResponseTime}ms`
            });
            hasWarnings = true;
        } else {
            results.push({
                name: 'Load Test',
                status: 'failure',
                message: `Unacceptable response time: ${avgResponseTime}ms`
            });
            hasFailures = true;
        }
    } catch (error) {
        results.push({
            name: 'Load Test',
            status: 'failure',
            message: `Load test failed: ${error.message}`
        });
        hasFailures = true;
    }

    // AWS Auto Scaling Check
    console.log('\n☁️ Checking AWS Auto Scaling Configuration...');
    const awsAutoScaling = new AWSAutoScaling();

    try {
        const isValid = await awsAutoScaling.validateConfiguration();
        if (isValid) {
            results.push({
                name: 'AWS Auto Scaling',
                status: 'success',
                message: 'Auto scaling configuration is valid'
            });
        } else {
            results.push({
                name: 'AWS Auto Scaling',
                status: 'warning',
                message: 'Auto scaling configuration needs review'
            });
            hasWarnings = true;
        }
    } catch (error) {
        results.push({
            name: 'AWS Auto Scaling',
            status: 'failure',
            message: `AWS configuration check failed: ${error.message}`
        });
        hasFailures = true;
    }

    // Email Campaign Test
    console.log('\n📧 Testing Email Campaign Service...');
    const emailService = new EmailCampaignService();

    try {
        await emailService.sendTestEmail();
        results.push({
            name: 'Email Campaign',
            status: 'success',
            message: 'Test email sent successfully'
        });
    } catch (error) {
        results.push({
            name: 'Email Campaign',
            status: 'failure',
            message: `Email test failed: ${error.message}`
        });
        hasFailures = true;
    }

    // Print Results
    console.log('\n📋 Pre-launch Check Results:');
    console.log('============================');

    results.forEach(result => {
        const icon = result.status === 'success' ? '✅' :
            result.status === 'warning' ? '⚠️' : '❌';
        console.log(`${icon} ${result.name}: ${result.message}`);
    });

    console.log('\n📊 Final Assessment:');
    if (hasFailures) {
        console.log('❌ Critical checks failed. Launch blocked.');
        process.exit(1);
    } else if (hasWarnings) {
        console.log('⚠️ Warnings detected. Review before proceeding.');
        process.exit(0);
    } else {
        console.log('✅ All checks passed. Ready for launch!');
        process.exit(0);
    }
}

// Run the checks
runPrelaunchChecks().catch(error => {
    console.error('❌ Fatal error during pre-launch checks:', error);
    process.exit(1);
}); 