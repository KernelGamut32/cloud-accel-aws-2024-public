import { App, Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as create_lambda_role from './create-lambda-role';
import * as create_dynamodb_table from './create-dynamodb-table';
import * as create_sqs_queue from './create-queue';
import * as create_sqs_dynamodb_lambda_service from './create-sqs-dynamodb-lambda-service';
import * as create_sqs_trigger from './create-sqs-trigger';

export class QueueDeployStack extends Stack {
  constructor(scope: Construct, id: string, props: StackProps = {}) {
    super(scope, id, props);

    const lambdaRole = new create_lambda_role.CreateLambdaRole(this, 'sqs-lambda-role');
    new create_dynamodb_table.CreateDynamoDbTable(this, 'DynamoDBTable');
    const sqsQueue = new create_sqs_queue.CreateQueue(this, 'SQSQueue');
    
    const createSqsDynamoDBLambda =
      new create_sqs_dynamodb_lambda_service.CreateSqsDynamoDBLambdaService(this, 'SQSDynamoDB',
        lambdaRole.role);
    
    new create_sqs_trigger.CreateSqsTrigger(this, 'LambdaEventSourceMapping', 
      sqsQueue.queue.attrArn, createSqsDynamoDBLambda.lambdaFunction);
  }
}

// for development, use account/region from cdk cli
const devEnv = {
  account: process.env.CDK_DEFAULT_ACCOUNT,
  region: process.env.CDK_DEFAULT_REGION,
};

const app = new App();

new QueueDeployStack(app, 'queue-deploy-dev', { env: devEnv });

app.synth();