import { Construct } from "constructs";
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';

export class CreateDynamoDbTable extends Construct {
  public table: dynamodb.CfnTable;

  constructor(scope: Construct, id: string) {
    super(scope, id);

    this.table = new dynamodb.CfnTable(this, id, {
      
      attributeDefinitions: [
        {
          attributeName: "date",
          attributeType: "S"
        },
        {
          attributeName: "item_name",
          attributeType: "S"
        },
        {
          attributeName: "type",
          attributeType: "S"
        },
        {
          attributeName: "uid",
          attributeType: "S"
        }
      ],
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
      tableName: "collectors",
      keySchema: [
        {
          attributeName: "uid",
          keyType: "HASH"
        },
        {
          attributeName: "item_name",
          keyType: "RANGE"
        }
      ],
      localSecondaryIndexes: [
        {
          indexName: "date-index",
          keySchema: [
            {
              attributeName: "uid",
              keyType: "HASH"
            },
            {
              attributeName: "date",
              keyType: "RANGE"
            }
          ],
          projection: {
            projectionType: "ALL"
          }
        },
        {
          indexName: "type-index",
          keySchema: [
            {
              attributeName: "uid",
              keyType: "HASH"
            },
            {
              attributeName: "type",
              keyType: "RANGE"
            }
          ],
          projection: {
            projectionType: "ALL"
          }
        }
      ]
    });
  }
}
