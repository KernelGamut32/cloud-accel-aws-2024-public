import { Construct } from "constructs";
import { ManagedPolicy, Role, ServicePrincipal } from 'aws-cdk-lib/aws-iam';

export class CreateLambdaRole extends Construct {
    public role: Role;

    constructor(scope: Construct, id: string) {
        super(scope, id);

        this.role = new Role(this, id, {
            assumedBy: new ServicePrincipal('lambda.amazonaws.com'),
        });
        this.role.addManagedPolicy(ManagedPolicy.fromAwsManagedPolicyName('AmazonDynamoDBFullAccess'));
        this.role.addManagedPolicy(ManagedPolicy.fromAwsManagedPolicyName('AmazonSQSFullAccess'));
        this.role.addManagedPolicy(ManagedPolicy.fromAwsManagedPolicyName('AWSLambdaExecute'));
        this.role.addManagedPolicy(ManagedPolicy.fromAwsManagedPolicyName('CloudWatchLogsFullAccess'));
        this.role.addManagedPolicy(ManagedPolicy.fromAwsManagedPolicyName('AWSXRayDaemonWriteAccess'));
    }
}
