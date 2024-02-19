import { Construct } from "constructs";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as apigateway from 'aws-cdk-lib/aws-apigateway';

export class CreateApiGatewayService extends Construct {
    public gateway: apigateway.RestApi;

    constructor(scope: Construct, id: string, lambdaBackend: lambda.Function) {
        super(scope, id);

        this.gateway = new apigateway.LambdaRestApi(this, id, {
            handler: lambdaBackend,
        });
    }
}
