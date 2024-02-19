# Lab 02 - https://learn.acloud.guru/handson/6b13d4a5-f418-4a29-a0a9-0adff3170ec7

**NOTE: Use the same AWS sandbox used with Lab 01**

**If you encounter "no space left on device issues", use https://ryansouthgate.com/aws-cloud9-no-space-left-on-device/#:~:text=There%E2%80%99s%20a%20few%20things%20we%20can%20tackle%20here%2C,clean%20up%20that%20much%20free%20space%20for%20me**

Follow along with the "Guide" tab in the ACG lab definition.

* If you run into any issues running `cdk bootstrap`, execute the following steps:
    * Click the "Cloud9" logo in the upper left corner of the IDE and click "Preferences"
    * Click "AWS Settings" and uncheck "AWS managed temporary credentials"
    * In the Cloud9 terminal, run `aws configure` and set access key ID (from ACG credentials), secret access key (from ACG credentials), and default region (`us-east-1`)
    * Run `cdk bootstrap` again and confirm completes successfully
* Steps as outlined in lab will likely have issues:
    * Use the provided `first-cdk-app-stack.ts` file contents for the corresponding step
    * Use the provided `first-cdk-app-stack.add-items.ts` file contents for the corresponding step
* After "green" deployment, note that both versions are available via different API Gateway endpoints
* Execute the `/scan` endpoint to trigger the Lambda function against the "blue" URL
* Execute the `/scan` endpoint to trigger the Lambda function against the "green" URL
* Execute the `/add` endpoint to trigger the Lambda function against the "green" URL - use `curl -X PUT -d '{"id":"4567","name":"Another Test Item"}' https://<green API endpoint>/prod/add`
* Execute the `/scan` endpoint against the "green" URL again to confirm that new item got added to the DynamoDB table
* If you execute `/scan` against the "blue" URL, you should see that the new item is not present as the "blue" deployment is still serving the original version of the Lambda function and DynamoDB table
* Execute `cdk destroy blue` to tear down the "blue" instance; after completion, verify that the "green" version is still present and operational
