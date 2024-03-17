import { Construct } from "constructs";
import { Effect, ManagedPolicy, PolicyStatement, Role, ServicePrincipal } from 'aws-cdk-lib/aws-iam';

export class CreateLambdaRole extends Construct {
    public role: Role;

    constructor(scope: Construct, id: string) {
        super(scope, id);

        this.role = new Role(this, id, {
            assumedBy: new ServicePrincipal('lambda.amazonaws.com'),
        });
        this.role.addManagedPolicy(ManagedPolicy.fromAwsManagedPolicyName('CloudWatchReadOnlyAccess'));
        this.role.addManagedPolicy(ManagedPolicy.fromAwsManagedPolicyName('AmazonEC2ReadOnlyAccess'));
        this.role.addManagedPolicy(ManagedPolicy.fromAwsManagedPolicyName('service-role/AWSLambdaBasicExecutionRole'));
        this.role.addManagedPolicy(ManagedPolicy.fromAwsManagedPolicyName('service-role/AWSLambdaDynamoDBExecutionRole'));
        this.role.addManagedPolicy(ManagedPolicy.fromAwsManagedPolicyName('AWSLambda_ReadOnlyAccess'));

        new ManagedPolicy(this, "DDBManagedPolicy", {
            statements: [
                new PolicyStatement({
                    effect: Effect.ALLOW,
                    actions: [
                        "dynamodb:*",
                        "dax:*",
                        "ec2:DescribeVpcs",
                        "ec2:DescribeSubnets",
                        "ec2:DescribeSecurityGroups",
                        "iam:GetRole",
                        "iam:ListRoles",
                        "sns:ListSubscriptionsByTopic",
                        "sns:ListTopics",
                        "lambda:ListFunctions",
                        "lambda:ListEventSourceMappings",
                        "lambda:GetFunctionConfiguration",
                        "resource-groups:ListGroups",
                        "resource-groups:ListGroupResources",
                        "resource-groups:GetGroup",
                        "resource-groups:GetGroupQuery",
                        "tag:GetResources",
                        "ec2:CreateNetworkInterface",
                        "ec2:DescribeNetworkInterfaces",
                        "ec2:DeleteNetworkInterface"
                    ],
                    resources: ["*"]
                })
            ],
            roles: [this.role]
        });
    }
}
