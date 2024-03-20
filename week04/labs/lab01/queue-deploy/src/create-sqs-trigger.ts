import { Construct } from "constructs";
import * as lambda from 'aws-cdk-lib/aws-lambda';

export class CreateSqsTrigger extends Construct {
  public trigger: lambda.CfnEventSourceMapping;

  constructor(scope: Construct, id: string, eventSource: string, lambdaFunction: lambda.Function) {
    super(scope, id);

    this.trigger = new lambda.CfnEventSourceMapping(this, id, {
        batchSize: 10,
        eventSourceArn: eventSource,
        functionName: lambdaFunction.functionName,
        enabled: true,
        maximumBatchingWindowInSeconds: 0
    });
  }
}
