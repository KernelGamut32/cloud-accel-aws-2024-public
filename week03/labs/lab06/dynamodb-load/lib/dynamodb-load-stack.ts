import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as create_lambda_role from '../lib/create-lambda-role';
import * as create_dynamodb_table from '../lib/create-dynamodb-table';
import * as create_load_lambda_service from '../lib/create-load-lambda-service';
import * as create_query_lambda_service from '../lib/create-query-lambda-service';
import * as create_api_gateway_service from '../lib/create-api-gateway-service';

export class DynamodbLoadStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const lambdaRole = new create_lambda_role.CreateLambdaRole(this, 'dynamodb-lambda-role');
    const dynamoDBTable = new create_dynamodb_table.CreateDynamoDbTable(this, 'DynamoDBTable');

    const createLoadLambda =
      new create_load_lambda_service.CreateLoadLambdaService(this, 'create-load-lambda',
        lambdaRole.role);

    const createQueryLambda =
      new create_query_lambda_service.CreateQueryLambdaService(this, 'create-query-lambda',
        lambdaRole.role);

    const collectorsApiGateway =
      new create_api_gateway_service.CreateApiGatewayService(this, 'collectors-api-gateway', createQueryLambda.lambdaFunction);
  }
}
