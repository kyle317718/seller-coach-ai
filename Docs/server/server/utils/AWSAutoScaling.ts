import { AutoScaling } from 'aws-sdk';

interface AutoScalingConfig {
    minInstances: number;
    maxInstances: number;
    targetCPUUtilization: number;
    cooldownPeriod: number;
}

interface ValidationResult {
    isValid: boolean;
    issues: string[];
}

export class AWSAutoScaling {
    private autoScaling: AutoScaling;
    private readonly autoScalingGroupName: string;

    constructor() {
        this.autoScaling = new AutoScaling({
            region: process.env.AWS_REGION || 'us-east-1',
            credentials: {
                accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
                secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || ''
            }
        });
        this.autoScalingGroupName = process.env.AWS_AUTO_SCALING_GROUP_NAME || '';
    }

    async validateConfiguration(): Promise<ValidationResult> {
        const issues: string[] = [];

        try {
            // Check if required environment variables are set
            if (!process.env.AWS_ACCESS_KEY_ID || !process.env.AWS_SECRET_ACCESS_KEY) {
                issues.push('AWS credentials are not properly configured');
            }

            if (!this.autoScalingGroupName) {
                issues.push('Auto Scaling Group name is not configured');
            }

            // Get Auto Scaling Group configuration
            const { AutoScalingGroups } = await this.autoScaling
                .describeAutoScalingGroups({
                    AutoScalingGroupNames: [this.autoScalingGroupName]
                })
                .promise();

            if (!AutoScalingGroups || AutoScalingGroups.length === 0) {
                issues.push(`Auto Scaling Group "${this.autoScalingGroupName}" not found`);
                return { isValid: false, issues };
            }

            const group = AutoScalingGroups[0];
            const config: AutoScalingConfig = {
                minInstances: group.MinSize || 0,
                maxInstances: group.MaxSize || 0,
                targetCPUUtilization: 70, // Default target CPU utilization
                cooldownPeriod: group.DefaultCooldown || 300
            };

            // Validate configuration
            if (config.minInstances < 2) {
                issues.push('Minimum instance count should be at least 2 for high availability');
            }

            if (config.maxInstances < config.minInstances) {
                issues.push('Maximum instance count cannot be less than minimum instance count');
            }

            if (config.maxInstances > 20) {
                issues.push('Maximum instance count exceeds recommended limit of 20');
            }

            if (config.cooldownPeriod < 60) {
                issues.push('Cooldown period should be at least 60 seconds');
            }

            // Get scaling policies
            const { ScalingPolicies } = await this.autoScaling
                .describePolicies({
                    AutoScalingGroupName: this.autoScalingGroupName
                })
                .promise();

            if (!ScalingPolicies || ScalingPolicies.length === 0) {
                issues.push('No scaling policies found');
            }

            // Log configuration details
            console.log('Auto Scaling Configuration:', {
                groupName: this.autoScalingGroupName,
                config,
                policyCount: ScalingPolicies?.length || 0
            });

            return {
                isValid: issues.length === 0,
                issues
            };
        } catch (error) {
            issues.push(`Failed to validate Auto Scaling configuration: ${error.message}`);
            return {
                isValid: false,
                issues
            };
        }
    }
} 