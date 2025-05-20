import {
    AutoScalingClient,
    UpdateAutoScalingGroupCommand,
    DescribeAutoScalingGroupsCommand,
    CreateAutoScalingGroupCommand
} from '@aws-sdk/client-auto-scaling';

interface ScalingConfig {
    minSize: number;
    maxSize: number;
    desiredCapacity: number;
    cooldown: number;
}

export class AWSAutoScaling {
    private client: AutoScalingClient;
    private groupName: string;

    constructor(region: string = 'ap-northeast-2') {
        this.client = new AutoScalingClient({ region });
        this.groupName = process.env.AWS_ASG_NAME || 'trae-ai-asg';
    }

    async configureAutoScaling(config: ScalingConfig): Promise<void> {
        try {
            const command = new UpdateAutoScalingGroupCommand({
                AutoScalingGroupName: this.groupName,
                MinSize: config.minSize,
                MaxSize: config.maxSize,
                DesiredCapacity: config.desiredCapacity,
                DefaultCooldown: config.cooldown
            });

            await this.client.send(command);
            console.log('Auto Scaling group updated successfully');

        } catch (error) {
            console.error('Error updating Auto Scaling group:', error);
            throw error;
        }
    }

    async createAutoScalingGroup(
        launchTemplate: string,
        subnets: string[]
    ): Promise<void> {
        try {
            const command = new CreateAutoScalingGroupCommand({
                AutoScalingGroupName: this.groupName,
                LaunchTemplate: {
                    LaunchTemplateName: launchTemplate,
                    Version: '$Latest'
                },
                MinSize: 2,
                MaxSize: 10,
                DesiredCapacity: 2,
                VPCZoneIdentifier: subnets.join(','),
                HealthCheckType: 'ELB',
                HealthCheckGracePeriod: 300,
                Tags: [
                    {
                        Key: 'Environment',
                        Value: process.env.NODE_ENV || 'production',
                        PropagateAtLaunch: true
                    }
                ]
            });

            await this.client.send(command);
            console.log('Auto Scaling group created successfully');

        } catch (error) {
            console.error('Error creating Auto Scaling group:', error);
            throw error;
        }
    }

    async getAutoScalingGroupStatus(): Promise<any> {
        try {
            const command = new DescribeAutoScalingGroupsCommand({
                AutoScalingGroupNames: [this.groupName]
            });

            const response = await this.client.send(command);
            return response.AutoScalingGroups?.[0];

        } catch (error) {
            console.error('Error getting Auto Scaling group status:', error);
            throw error;
        }
    }

    async validateConfiguration(): Promise<boolean> {
        try {
            const status = await this.getAutoScalingGroupStatus();

            // Validate minimum requirements
            const isValid =
                status &&
                status.MinSize >= 2 &&
                status.MaxSize >= status.MinSize &&
                status.DesiredCapacity >= status.MinSize &&
                status.DesiredCapacity <= status.MaxSize;

            if (!isValid) {
                console.warn('Auto Scaling configuration validation failed:', {
                    currentConfig: {
                        minSize: status.MinSize,
                        maxSize: status.MaxSize,
                        desiredCapacity: status.DesiredCapacity
                    }
                });
            }

            return isValid;

        } catch (error) {
            console.error('Error validating Auto Scaling configuration:', error);
            return false;
        }
    }
} 