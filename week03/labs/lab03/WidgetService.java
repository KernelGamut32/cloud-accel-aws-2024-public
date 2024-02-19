package com.myorg;

import java.util.HashMap;

import software.constructs.Construct;
import software.amazon.awscdk.Duration;
import software.amazon.awscdk.services.apigateway.LambdaIntegration;
import software.amazon.awscdk.services.apigateway.Resource;
import software.amazon.awscdk.services.apigateway.RestApi;
import software.amazon.awscdk.services.lambda.Code;
import software.amazon.awscdk.services.lambda.Function;
import software.amazon.awscdk.services.lambda.Runtime;
import software.amazon.awscdk.services.s3.Bucket;

public class WidgetService extends Construct {

    @SuppressWarnings("serial")
    public WidgetService(Construct scope, String id) {
        super(scope, id);

        Bucket bucket = new Bucket(this, "WidgetStore");

        Function handler = Function.Builder.create(this, "WidgetHandler")
            .runtime(Runtime.NODEJS_18_X)
            .code(Code.fromAsset("resources"))
            .handler("widgets.main")
            .environment(java.util.Map.of(   // Java 9 or later
               "BUCKET", bucket.getBucketName()))
            .timeout(Duration.seconds(30))
            .build();

        bucket.grantReadWrite(handler);
        
        RestApi api = RestApi.Builder.create(this, "Widgets-API")
                .restApiName("Widget Service").description("This service services widgets.")
                .build();

        Resource widget = api.getRoot().addResource("{id}");

        LambdaIntegration widgetIntegration = new LambdaIntegration(handler);

        widget.addMethod("POST", widgetIntegration);   // POST /{id}
        widget.addMethod("GET", widgetIntegration);    // GET /{id}
        widget.addMethod("DELETE", widgetIntegration); // DELETE /{id}
    }
}