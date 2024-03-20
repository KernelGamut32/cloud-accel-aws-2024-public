import { Construct } from "constructs";
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';

export class CreateDynamoDbTable extends Construct {
  public table: dynamodb.CfnTable;

  constructor(scope: Construct, id: string) {
    super(scope, id);

    this.table = new dynamodb.CfnTable(this, id, {
      attributeDefinitions: [
        {
          attributeName: "MessageId",
          attributeType: "S"
        }
      ],
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
      tableName: "MessageCDK",
      keySchema: [
        {
          attributeName: "MessageId",
          keyType: "HASH"
        }
      ]
    });
  }
}
