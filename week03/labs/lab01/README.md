# Lab 01 - [Deploying Your First CDK Stack](https://learn.acloud.guru/handson/af3de00d-c096-4df1-94a6-6ffbe772b601)

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
1. In the terminal window, you can verify installation of required dependencies by running the following commands:
    - `git --version`
    - `aws --version`
    - `cdk --version`
    - `npm --version`
    - `node --version`
1. Create a new folder by running `mkdir -p cdk-labstart`
1. Navigate to that folder using `cd cdk-labstart` and run `cdk init app --language typescript` to create a new CDK project
1. Run `cdk bootstrap` in the terminal to bootstrap the CDK environment
1. If you run into any issues running `cdk bootstrap`, execute the following steps:
    - Click the "Cloud9" logo in the upper left corner of the IDE and click "Preferences"
    - Click "AWS Settings" and uncheck "AWS managed temporary credentials"
    - In the Cloud9 terminal, run `aws configure` and set access key ID (from ACG credentials), secret access key (from ACG credentials), and default region (`us-east-1`)
    - Run `cdk bootstrap` again and confirm completes successfully
1. Once `cdk bootstrap` completes, explore the files and folders created for the CDK project
1. Open `cdk-labstart/lib/cdk-labstart-stack.ts`, uncomment the line that creates an SQS queue, and uncomment the `import` statement; **save your changes**
1. Run `cdk synth` to generate the CloudFormation template
1. You can review the template by opening the generated files in the "cdk.out" folder
1. Run `cdk deploy`; you navigate to CloudFormation and see a new stack running
1. Navigate to SQS in another tab to verify that the queue was created
1. Return to `cdk-labstart/lib/cdk-labstart-stack.ts` and change `cdk.Duration.seconds(300)` to `cdk.Duration.seconds(600)`; **save your changes**
1. Run `cdk diff` (which automatically runs `cdk synth` behind-the-scenes) to see the changes that will be made to the stack (differences between what's in the template and what's in the stack)
1. Run `cdk deploy` to update the deployment - you can observe the changes being processed in the CloudFormation console
1. Review the SQS queue in the SQS console and note that the "Visibility timeout" has been updated to 10 minutes
1. Open `cdk-labstart/test/cdk-labstart.test.ts` and uncomment the test case (and associated `import` statements); **save your changes**
1. Run `npm test` to execute the test case - because of the most recent property change, the test will fail
1. Update the test case and rerun `npm test` to verify that the test passes
1. Run `cdk destroy` to clean up the resources
