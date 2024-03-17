import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import { Role } from 'aws-cdk-lib/aws-iam';
import * as lambda from "aws-cdk-lib/aws-lambda";

export class CreateQueryLambdaService extends Construct {
  public lambdaFunction: lambda.Function;

  constructor(scope: Construct, id: string, role: Role) {
    super(scope, id);

    this.lambdaFunction = new lambda.Function(this, id, {
        functionName: "collectors_primary",
        runtime: lambda.Runtime.PYTHON_3_9,
        code: lambda.Code.fromAsset("resources/collectors_primary"),
        handler: "function.handler",
        timeout: cdk.Duration.seconds(30),
        role: role,
      });
  }
}
