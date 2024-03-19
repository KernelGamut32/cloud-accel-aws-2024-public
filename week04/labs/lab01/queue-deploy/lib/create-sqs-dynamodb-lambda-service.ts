import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import { Role } from 'aws-cdk-lib/aws-iam';
import * as lambda from "aws-cdk-lib/aws-lambda";

export class CreateSqsDynamoDBLambdaService extends Construct {
  public lambdaFunction: lambda.Function;

  constructor(scope: Construct, id: string, role: Role) {
    super(scope, id);

    this.lambdaFunction = new lambda.Function(this, id, {
        functionName: "SQSDynamoDB",
        runtime: lambda.Runtime.PYTHON_3_10,
        code: lambda.Code.fromAsset("resources/SQSDynamoDB"),
        handler: "lambda_function.lambda_handler",
        timeout: cdk.Duration.seconds(10),
        role: role,
      });
  }
}
