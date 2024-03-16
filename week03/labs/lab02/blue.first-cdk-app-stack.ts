import { RemovalPolicy, Stack, StackProps, App } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { LambdaRestApi } from 'aws-cdk-lib/aws-apigateway';
import { Runtime } from 'aws-cdk-lib/aws-lambda';

interface MyCdkStackProps extends StackProps {
  stackName: 'blue' | 'green'
  deploymentEnvironment: 'blue' | 'green';
}

//begin stack definition
export class FirstCdkAppStack extends Stack {
  constructor(scope: App, id: string, props: MyCdkStackProps) {
    super(scope, id, props);

    //define dynamodb table
    const dynamodb_table = new dynamodb.Table(this, "Table", {
      partitionKey: { name: "id", type: dynamodb.AttributeType.STRING },
      removalPolicy: RemovalPolicy.DESTROY
      }
    );

    //define lambda function and regeference function file
    const lambda_backend = new NodejsFunction(this, "function", {
      tracing: lambda.Tracing.ACTIVE,
      runtime: Runtime.NODEJS_16_X,
      environment: {
        DYNAMODB: dynamodb_table.tableName
      },
    });

    //grant lambda function read access to dynamodb table
    dynamodb_table.grantReadData(lambda_backend.role!);

    //define apigateway
    const api = new apigateway.RestApi(this, "RestAPI", {
      deployOptions: {
        dataTraceEnabled: true,
        tracingEnabled: true
      },
    });

    //define endpoint and associate it with lambda backend
    const endpoint = api.root.addResource("scan");
    const endpointMethod = endpoint.addMethod("GET", new apigateway.LambdaIntegration(lambda_backend));
  }
}
