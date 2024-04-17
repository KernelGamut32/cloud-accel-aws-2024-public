import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import * as lambda from 'aws-cdk-lib/aws-lambda';

export class CdkOpaBlogStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    const api = new apigateway.RestApi(this, "HelloApi", {
      restApiName: "HelloApi",
      description: "Hello World API"
    });

    const opaCustomAuthLambda = new lambda.Function(this, "OpaAuthorizer", {
      runtime: lambda.Runtime.PROVIDED_AL2023,
      code: lambda.AssetCode.fromAsset("opaCustomGoAuthorizer"),
      handler: "boostrap",
      functionName: "OpaCustomGoAuthorizer"
    });

    const customOpaAuthorizer = new apigateway.RequestAuthorizer(this, 'customOpaAuthorizer', {
      handler: opaCustomAuthLambda,
      resultsCacheTtl: cdk.Duration.minutes(0),
      authorizerName: 'CustomOpaLambdaAuthorizer',
      identitySources: [apigateway.IdentitySource.header('Usergroup'), apigateway.IdentitySource.header('Resource')],
    });

    const hello = api.root.addResource("hello");
    const hello_handler = new lambda.Function(this, "hello", {
      runtime: lambda.Runtime.PYTHON_3_8,
      code: lambda.AssetCode.fromAsset("helloworld_function"),
      handler: "app.lambda_handler",
      functionName: "HelloWorldLambdaFunction"
    });

    const helloGetIntegration = new apigateway.LambdaIntegration(hello_handler);
    hello.addMethod("GET", helloGetIntegration, {
      authorizer: customOpaAuthorizer
    });

    new cdk.CfnOutput(this, "Hello API URL:", {
      value: api.url + "hello" ?? "Something went wrong with the deploy",
    });
  }
}