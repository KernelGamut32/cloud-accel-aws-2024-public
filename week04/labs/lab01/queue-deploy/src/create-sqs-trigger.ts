import { Construct } from "constructs";
import * as lambda from 'aws-cdk-lib/aws-lambda';

export class CreateSqsTrigger extends Construct {
  constructor(scope: Construct, id: string, eventSource: string, 
    lambdaFunction: lambda.Function) {
    super(scope, id);

    new lambda.CfnEventSourceMapping(this, id, {
        batchSize: 10,
        eventSourceArn: eventSource,
        functionName: lambdaFunction.functionName,
        enabled: true,
        maximumBatchingWindowInSeconds: 0
    });
  }
}
