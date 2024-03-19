import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as create_lambda_role from '../lib/create-lambda-role';
import * as create_dynamodb_table from '../lib/create-dynamodb-table';
import * as create_sqs_queue from '../lib/create-queue';
import * as create_sqs_dynamodb_lambda_service from '../lib/create-sqs-dynamodb-lambda-service';
import * as create_sqs_trigger from '../lib/create-sqs-trigger';

export class QueueDeployStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
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
