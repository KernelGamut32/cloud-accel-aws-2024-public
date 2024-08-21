# Lab 02 - [Blue/Green Deployments with CDK](https://learn.acloud.guru/handson/6b13d4a5-f418-4a29-a0a9-0adff3170ec7)

**NOTE: Use an A Cloud Guru (ACG) AWS Playground for this lab**

**If you encounter "no space left on device issues", use https://ryansouthgate.com/aws-cloud9-no-space-left-on-device/#:~:text=There%E2%80%99s%20a%20few%20things%20we%20can%20tackle%20here%2C,clean%20up%20that%20much%20free%20space%20for%20me**

1. In the lab environment, create a new Cloud9 environment using the following steps:
    - Open `CloudShell` (in the upper right)
    - Clone this repository to `CloudShell` using `git clone https://github.com/KernelGamut32/cloud-accel-aws-2024-public.git`
    - Navigate to the root folder using `cd cloud-accel-aws-2024-public`
    - Execute the bash script to create a new Cloud9 environment using `./cloud9.sh '<env-name>' 't3.medium' 'amazonlinux-2023-x86_64' <sleep-time>` (replace `<env-name>` with your environment name and `<sleep-time>` with the targeted delay)
    - Close `CloudShell`
    - In the search bar, search for `Cloud9` (open in a new tab)
    - Click the radio button next to your environment and click `Open in Cloud9`
    - Execute the remaining instructions in the Cloud9 environment
1. In the provided terminal, clone this repository using `git clone https://github.com/KernelGamut32/cloud-accel-aws-2024-public.git`
1. In the provided terminal, from the `~/environment` path, clone a second repository for the lab using `git clone https://github.com/ACloudGuru-Resources/cdk-lab-1.git`
1. Execute `cd cdk-lab-1` to change directories in the terminal
1. Execute `npm install` to install required dependencies for the lab
1. Execute `cdk bootstrap`
1. If you run into any issues running `cdk bootstrap`, execute the following steps:
    - Click the "Cloud9" logo in the upper left corner of the IDE and click "Preferences"
    - Click "AWS Settings" and uncheck "AWS managed temporary credentials"
    - In the Cloud9 terminal, run `aws configure` and set access key ID (from ACG credentials), secret access key (from ACG credentials), and default region (`us-east-1`)
    - Run `cdk bootstrap` again and confirm completes successfully
1. In the project view on the left, navigate to the cdk-lab-1/bin folder and open `first-cdk-app.ts` to review the file contents
1. On line 7, paste the following, replacing all existing code & comments; **Save your changes**

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

10. In the project view on the left, navigate to the cdk-lab-1/lib folder and open `first-cdk-app-stack.ts` to review the file contents
11. Replace that file's contents with the file contents of `cloud-accel-aws-2024-public/week03/labs/lab02/blue.first-cdk-app-stack.ts` to create resources for the blue environment; **save your changes**
12. Deploy the `blue` environment using `cdk deploy blue`
13. Execute `curl <blue API endpoint>/scan`, using the output value from the `blue` CDK deployment to test Lambda execution through the API gateway resource
14. In the project view on the left, navigate to the cdk-lab-1/lib folder and open `first-cdk-app-stack.ts` to review the file contents
15. Replace that file's contents with the file contents of `cloud-accel-aws-2024-public/week03/labs/lab02/green.first-cdk-app-stack.ts` to create resources for the green environment; **save your changes**
16. Create a new file in the `lib` folder called `first-cdk-app-stack.add-item.ts` - replace its contents with `cloud-accel-aws-2024-public/week03/labs/lab02/first-cdk-app-stack.add-item.ts`
17. Deploy the `green` environment using `cdk deploy green`
18. After `green` deployment, note that both versions are available via different API Gateway endpoints
19. Execute the `/scan` endpoint to trigger the Lambda function against the `blue` URL
20. Execute the `/scan` endpoint to trigger the Lambda function against the `green` URL
21. Execute the `/add` endpoint to trigger the Lambda function against the `green` URL - use `curl -X PUT -d '{"id":"4567","name":"Another Test Item"}' <green API endpoint>/add` (using the output value from the `green` deployment)
22. Execute the `/scan` endpoint against the `green` URL again to confirm that new item got added to the DynamoDB table
23. If you execute `/scan` against the `blue` URL, you should see that the new item is not present as the `blue` deployment is still serving the original version of the Lambda function and DynamoDB table
24. Execute `cdk destroy blue` to tear down the `blue` instance; after completion, verify that the `green` version is still present and operational
