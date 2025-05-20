import { SESClient, SendBulkTemplatedEmailCommand } from '@aws-sdk/client-ses';
import { SecurityUtils } from '../utils/security';

interface EmailRecipient {
    email: string;
    name?: string;
    customData?: Record<string, any>;
}

interface EmailTemplate {
    subject: string;
    htmlBody: string;
    textBody: string;
}

export class EmailCampaignService {
    private sesClient: SESClient;
    private sender: string;

    constructor() {
        this.sesClient = new SESClient({ region: process.env.AWS_REGION });
        this.sender = process.env.EMAIL_SENDER || 'no-reply@traeai.com';
    }

    private getLaunchTemplate(): EmailTemplate {
        return {
            subject: '🎉 트레이 AI가 정식 출시되었습니다!',
            htmlBody: `
                <div style="font-family: 'Pretendard', sans-serif; max-width: 600px; margin: 0 auto;">
                    <h1 style="color: #4F46E5; text-align: center; margin-bottom: 30px;">
                        트레이 AI 정식 출시
                    </h1>
                    
                    <p style="font-size: 16px; line-height: 1.6; color: #374151;">
                        안녕하세요, {{name}}님!<br><br>
                        기다려주신 트레이 AI가 드디어 정식 출시되었습니다.
                        지금 바로 무료로 제품 분석을 시작해보세요.
                    </p>

                    <div style="text-align: center; margin: 40px 0;">
                        <a href="{{launchUrl}}" 
                           style="background-color: #4F46E5; color: white; padding: 12px 24px; 
                                  text-decoration: none; border-radius: 6px; font-weight: bold;">
                            무료 체험 시작하기
                        </a>
                    </div>

                    <div style="background-color: #F3F4F6; padding: 20px; border-radius: 8px; margin: 30px 0;">
                        <h3 style="color: #111827; margin-top: 0;">주요 기능</h3>
                        <ul style="color: #374151; padding-left: 20px;">
                            <li>AI 기반 시장 분석</li>
                            <li>실시간 경쟁사 모니터링</li>
                            <li>맞춤형 마케팅 전략 제안</li>
                            <li>자동화된 성과 리포트</li>
                        </ul>
                    </div>

                    <p style="font-size: 14px; color: #6B7280; text-align: center; margin-top: 40px;">
                        본 메일은 트레이 AI 사전 등록자에게 발송되었습니다.<br>
                        더 이상 수신을 원하지 않으시면 <a href="{{unsubscribeUrl}}" style="color: #4F46E5;">여기</a>를 클릭하세요.
                    </p>
                </div>
            `,
            textBody: `
                트레이 AI 정식 출시

                안녕하세요, {{name}}님!

                기다려주신 트레이 AI가 드디어 정식 출시되었습니다.
                지금 바로 무료로 제품 분석을 시작해보세요.

                무료 체험 시작하기: {{launchUrl}}

                주요 기능:
                - AI 기반 시장 분석
                - 실시간 경쟁사 모니터링
                - 맞춤형 마케팅 전략 제안
                - 자동화된 성과 리포트

                본 메일은 트레이 AI 사전 등록자에게 발송되었습니다.
                수신 거부: {{unsubscribeUrl}}
            `
        };
    }

    async sendLaunchCampaign(recipients: EmailRecipient[]): Promise<void> {
        const template = this.getLaunchTemplate();
        const launchUrl = process.env.WEBSITE_URL || 'https://traeai.com';

        try {
            const command = new SendBulkTemplatedEmailCommand({
                Source: this.sender,
                Template: 'LaunchAnnouncement',
                DefaultTemplateData: JSON.stringify({
                    name: '고객',
                    launchUrl,
                    unsubscribeUrl: `${launchUrl}/unsubscribe`
                }),
                Destinations: recipients.map(recipient => ({
                    Destination: {
                        ToAddresses: [recipient.email]
                    },
                    ReplacementTemplateData: JSON.stringify({
                        name: recipient.name || '고객',
                        ...recipient.customData,
                        launchUrl,
                        unsubscribeUrl: `${launchUrl}/unsubscribe?email=${encodeURIComponent(
                            SecurityUtils.encrypt(recipient.email)
                        )}`
                    })
                }))
            });

            await this.sesClient.send(command);
            console.log(`Launch campaign sent to ${recipients.length} recipients`);

        } catch (error) {
            console.error('Error sending launch campaign:', error);
            throw error;
        }
    }

    async sendTestEmail(recipient: EmailRecipient): Promise<void> {
        try {
            await this.sendLaunchCampaign([recipient]);
            console.log('Test email sent successfully to:', recipient.email);
        } catch (error) {
            console.error('Error sending test email:', error);
            throw error;
        }
    }
} 