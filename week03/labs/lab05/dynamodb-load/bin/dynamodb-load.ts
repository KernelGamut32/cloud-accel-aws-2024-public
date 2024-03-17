import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { DynamodbLoadStack } from '../lib/dynamodb-load-stack';

const app = new cdk.App();

new DynamodbLoadStack(app, 'DynamodbLoadStack', {
});