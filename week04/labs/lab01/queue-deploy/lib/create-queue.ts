import { Construct } from "constructs";
import * as sqs from 'aws-cdk-lib/aws-sqs';

export class CreateQueue extends Construct {
  public queue: sqs.CfnQueue;

  constructor(scope: Construct, id: string) {
    super(scope, id);

    this.queue = new sqs.CfnQueue(this, id, {
        delaySeconds: 0,
        maximumMessageSize: 262144,
        messageRetentionPeriod: 345600,
        receiveMessageWaitTimeSeconds: 0,
        visibilityTimeout: 30,
        queueName: "MessagesCDK"
    });
  }
}
