# Lab 08 - https://learn.acloud.guru/handson/ab9e8bda-1f6f-4af8-9465-f8e3e14cc7d1

Follow along with the "Guide" tab in the ACG lab definition or use the provided CDK project to deploy and execute.

* Run in a Cloud9 environment in an ACG sandbox
* Clone the repo to your Cloud9 environment in `~/environment` using `git clone https://github.com/KernelGamut32/cloud-accelerator-program-aws-public.git`
* Navigate to target folder using `cd cloud-accelerator-program-aws-public/week04/labs/lab08/dynamodb-load`
* Run `npm install` to install the required dependencies
* Run `cdk bootstrap` to bootstrap the CDK environment
* Run `cdk synth` to view the template that will be generated for the CDK stack
* Run `cdk deploy` to deploy the CDK stack
* Navigate to the `collectors_load` Lambda in the console, configure a new test event (with empty body), and run the test to load the table
* Using the output URL for the API Gateway, navigate to that URL in a browser and reference the `collectors` endpoint to retrieve data from the DynamoDB table through the Lambda
    * For example: `https://<api-gateway-url>/prod/collectors?uid=adam&request=all`
    * Or: `https://<api-gateway-url>/prod/collectors?uid=adam&request=profile`
    * See types of calls in the `collectors_primary` Lambda code
