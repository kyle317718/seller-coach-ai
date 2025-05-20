'use client';

import { useState } from 'react';
import { Card } from '@/components/Card';
import { PerformanceDashboard } from '@/components/PerformanceDashboard';

interface NotificationSettings {
    email: boolean;
    sms: boolean;
    emailAddress: string;
    phoneNumber: string;
}

interface SocialAdSettings {
    facebook: boolean;
    instagram: boolean;
    autoPost: boolean;
    budget: number;
}

export default function MarketingPage() {
    const [notificationSettings, setNotificationSettings] = useState<NotificationSettings>({
        email: true,
        sms: true,
        emailAddress: '',
        phoneNumber: '',
    });

    const [socialAdSettings, setSocialAdSettings] = useState<SocialAdSettings>({
        facebook: true,
        instagram: true,
        autoPost: false,
        budget: 10000,
    });

    const handleNotificationChange = (field: keyof NotificationSettings) => (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        setNotificationSettings(prev => ({
            ...prev,
            [field]: e.target.type === 'checkbox' ? e.target.checked : e.target.value,
        }));
    };

    const handleSocialAdChange = (field: keyof SocialAdSettings) => (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        setSocialAdSettings(prev => ({
            ...prev,
            [field]: e.target.type === 'checkbox' ? e.target.checked :
                field === 'budget' ? Number(e.target.value) : e.target.value,
        }));
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">마케팅 자동화 설정</h1>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                {/* Notification Settings */}
                <Card className="p-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-6">알림 설정</h2>
                    <div className="space-y-4">
                        <div>
                            <label className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    checked={notificationSettings.email}
                                    onChange={handleNotificationChange('email')}
                                    className="rounded text-indigo-600"
                                />
                                <span>이메일 알림</span>
                            </label>
                            {notificationSettings.email && (
                                <input
                                    type="email"
                                    value={notificationSettings.emailAddress}
                                    onChange={handleNotificationChange('emailAddress')}
                                    placeholder="이메일 주소"
                                    className="mt-2 w-full px-3 py-2 border rounded-md"
                                />
                            )}
                        </div>

                        <div>
                            <label className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    checked={notificationSettings.sms}
                                    onChange={handleNotificationChange('sms')}
                                    className="rounded text-indigo-600"
                                />
                                <span>SMS 알림</span>
                            </label>
                            {notificationSettings.sms && (
                                <input
                                    type="tel"
                                    value={notificationSettings.phoneNumber}
                                    onChange={handleNotificationChange('phoneNumber')}
                                    placeholder="전화번호 (- 없이 입력)"
                                    className="mt-2 w-full px-3 py-2 border rounded-md"
                                />
                            )}
                        </div>
                    </div>
                </Card>

                {/* Social Ad Settings */}
                <Card className="p-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-6">광고 자동화 설정</h2>
                    <div className="space-y-4">
                        <div>
                            <label className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    checked={socialAdSettings.facebook}
                                    onChange={handleSocialAdChange('facebook')}
                                    className="rounded text-indigo-600"
                                />
                                <span>페이스북 광고</span>
                            </label>
                        </div>

                        <div>
                            <label className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    checked={socialAdSettings.instagram}
                                    onChange={handleSocialAdChange('instagram')}
                                    className="rounded text-indigo-600"
                                />
                                <span>인스타그램 광고</span>
                            </label>
                        </div>

                        <div>
                            <label className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    checked={socialAdSettings.autoPost}
                                    onChange={handleSocialAdChange('autoPost')}
                                    className="rounded text-indigo-600"
                                />
                                <span>자동 게시 활성화</span>
                            </label>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                일일 예산
                            </label>
                            <input
                                type="number"
                                value={socialAdSettings.budget}
                                onChange={handleSocialAdChange('budget')}
                                min="1000"
                                step="1000"
                                className="w-full px-3 py-2 border rounded-md"
                            />
                            <p className="mt-1 text-sm text-gray-500">
                                최소 예산: 1,000원
                            </p>
                        </div>
                    </div>
                </Card>
            </div>

            {/* Performance Dashboard */}
            <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">성과 대시보드</h2>
                <PerformanceDashboard analysisId="demo" />
            </section>
        </div>
    );
} 