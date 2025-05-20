import { TestSuite } from './testSuite';
import { EmailCampaignService } from '../services/EmailCampaignService';
import fs from 'fs/promises';
import path from 'path';

interface MarketingTemplate {
    platform: string;
    content: string;
    images: string[];
    schedule: Date;
}

async function loadTestCases(): Promise<any[]> {
    try {
        const testCasesPath = path.join(__dirname, '../test_cases.json');
        const testCasesContent = await fs.readFile(testCasesPath, 'utf-8');
        return JSON.parse(testCasesContent);
    } catch (error) {
        console.error('Error loading test cases:', error);
        return [];
    }
}

async function loadMarketingTemplates(templatesDir: string): Promise<MarketingTemplate[]> {
    try {
        const templatesPath = path.join(__dirname, '..', templatesDir);
        const files = await fs.readdir(templatesPath);
        const templates: MarketingTemplate[] = [];

        for (const file of files) {
            if (file.endsWith('.json')) {
                const content = await fs.readFile(path.join(templatesPath, file), 'utf-8');
                templates.push(JSON.parse(content));
            }
        }

        return templates;
    } catch (error) {
        console.error('Error loading marketing templates:', error);
        return [];
    }
}

async function main() {
    console.log('Starting launch sequence...');
    const testSuite = new TestSuite();
    const emailService = new EmailCampaignService();

    try {
        // 1. Run automated tests
        console.log('\n1. Running automated tests...');
        const testCases = await loadTestCases();
        const browsers = ['chrome', 'safari', 'firefox'];
        const testResults = await testSuite.runBrowserTests(browsers, testCases);

        const failedTests = testResults.filter(result => !result.passed);
        if (failedTests.length > 0) {
            console.error('❌ Some tests failed:', failedTests);
            process.exit(1);
        }
        console.log('✅ All tests passed');

        // 2. Generate user guides
        console.log('\n2. Generating user guides...');
        await testSuite.generateUserGuide(
            ['pdf', 'video'],
            'ko',
            'beginner'
        );
        console.log('✅ User guides generated');

        // 3. Deploy marketing automation
        console.log('\n3. Deploying marketing automation...');
        const marketingTemplates = await loadMarketingTemplates('templates');

        // Send launch announcement email
        await emailService.sendLaunchCampaign([
            {
                email: process.env.MARKETING_EMAIL || 'marketing@traeai.com',
                name: 'Marketing Team',
                customData: {
                    templates: marketingTemplates
                }
            }
        ]);
        console.log('✅ Marketing automation deployed');

        // 4. Start launch monitoring
        console.log('\n4. Starting launch monitoring...');
        const cleanup = await testSuite.monitorLaunch(
            ['traffic', 'conversion', 'server_load'],
            80
        );

        // Keep the process running for monitoring
        process.on('SIGINT', () => {
            cleanup();
            process.exit(0);
        });

        console.log('✅ Launch monitoring started');
        console.log('\n🚀 Launch sequence completed successfully!');

    } catch (error) {
        console.error('❌ Launch sequence failed:', error);
        process.exit(1);
    }
}

main(); 