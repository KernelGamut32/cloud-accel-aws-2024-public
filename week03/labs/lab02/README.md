# Lab 02 - [Blue/Green Deployments with CDK](https://learn.acloud.guru/handson/6b13d4a5-f418-4a29-a0a9-0adff3170ec7)

**NOTE: Use an A Cloud Guru (ACG) AWS Playground for this lab**

**If you encounter "no space left on device issues", use https://ryansouthgate.com/aws-cloud9-no-space-left-on-device/#:~:text=There%E2%80%99s%20a%20few%20things%20we%20can%20tackle%20here%2C,clean%20up%20that%20much%20free%20space%20for%20me**

* In the lab environment, create a new Cloud9 environment by navigating to the Cloud9 console and clicking `Create environment` (or reuse a previously-created environment)
    - Specify a name for the environment
    - Select `t3.small` for instance type
    - Leave all other options at their defaults, and click `Create`
    - Wait for the Cloud9 environment creation to complete and click the link for your newly created environment
    - Under `EC2 instance` click `Manage EC2 instance`
    - Click the `Instance ID` link
    - Select `Storage`, click the `Volume ID` link, click the checkbox next to your volume, and select `Modify volume` from the `Actions` dropdown
    - Increase size from `10` to `30` GiB; click `Modify` and click `Modify` in the confirmation dialog
    - Reboot your EC2 instance
    - Go back to Cloud9, click the radio button next to your Cloud9 environment, and click `Open in Cloud9`
    - In the terminal window, you can run `lsblk` to confirm new size
* In the provided terminal, clone this repository using `git clone https://github.com/KernelGamut32/cloud-accel-aws-2024-public.git`
* In the provided terminal, from the `~/environment` path, clone a second repository for the lab using `git clone https://github.com/ACloudGuru-Resources/cdk-lab-1.git`
* Execute `cd cdk-lab-1` to change directories in the terminal
* Execute `npm install` to install required dependencies for the lab
* Execute `cdk bootstrap`
* If you run into any issues running `cdk bootstrap`, execute the following steps:
    * Click the "Cloud9" logo in the upper left corner of the IDE and click "Preferences"
    * Click "AWS Settings" and uncheck "AWS managed temporary credentials"
    * In the Cloud9 terminal, run `aws configure` and set access key ID (from ACG credentials), secret access key (from ACG credentials), and default region (`us-east-1`)
    * Run `cdk bootstrap` again and confirm completes successfully
* In the project view on the left, navigate to the cdk-lab-1/bin folder and open `first-cdk-app.ts` to review the file contents
* On line 7, paste the following, replacing all existing code & comments; **Save your changes**

```
// instantiate blue stack
new FirstCdkAppStack(app, 'blue', {
  stackName: 'blue',
  deploymentEnvironment: 'blue',
});

// instantiate green stack
new FirstCdkAppStack(app, 'green', {
  stackName: 'green',
  deploymentEnvironment: 'green',
});
```

* In the project view on the left, navigate to the cdk-lab-1/lib folder and open `first-cdk-app-stack.ts` to review the file contents
* Replace that file's contents with the file contents of `cloud-accel-aws-2024-public/week03/labs/lab02/blue.first-cdk-app-stack.ts` to create resources for the blue environment; **save your changes**
* Deploy the `blue` environment using `cdk deploy blue`
* Execute `curl <blue.RestAPIEndpoint>scan` (replace `<blue.RestAPIEndpoint>` with the output value from the cdk deployment, including the `/` between the endpoint and `scan`) to test Lambda execution through the API gateway resource
* In the project view on the left, navigate to the cdk-lab-1/lib folder and open `first-cdk-app-stack.ts` to review the file contents
* Replace that file's contents with the file contents of `cloud-accel-aws-2024-public/week03/labs/lab02/green.first-cdk-app-stack.ts` to create resources for the blue environment; **save your changes**
* Deploy the `blue` environment using `cdk deploy blue`
* Execute `curl <blue.RestAPIEndpoint>scan` (replace `<blue.RestAPIEndpoint>` with the output value from the cdk deployment, including the `/` between the endpoint and `scan`) to test Lambda execution through the API gateway resource




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
