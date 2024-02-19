# Lab 01 - https://learn.acloud.guru/handson/af3de00d-c096-4df1-94a6-6ffbe772b601

**NOTE: Use an AWS sandbox for this lab**

**If you encounter "no space left on device issues", use https://ryansouthgate.com/aws-cloud9-no-space-left-on-device/#:~:text=There%E2%80%99s%20a%20few%20things%20we%20can%20tackle%20here%2C,clean%20up%20that%20much%20free%20space%20for%20me**

* Once connected and signed in to the AWS Management Console, search for "Cloud9"
* Click "Create environment"
* Give the environment a name, select `t3.micro`, leave all other settings at their defaults, and click "Create"
* Once the environment shows in the list of available environments, click "Open" under "Cloud9 IDE"
* After a few moments, the IDE will open in a new tab
* In the terminal window, you can verify installation of required dependencies by running the following commands:
    * `git --version`
    * `aws --version`
    * `cdk --version`
    * `sam --version`
    * `npm --version`
    * `node --version`
* Create a new folder by running `mkdir -p cdk-labstart`
* Navigate to that folder using `cd cdk-labstart` and run `cdk init app --language typescript` to create a new CDK project
* Run `cdk bootstrap` in the terminal to bootstrap the CDK environment
* If you run into any issues running `cdk bootstrap`, execute the following steps:
    * Click the "Cloud9" logo in the upper left corner of the IDE and click "Preferences"
    * Click "AWS Settings" and uncheck "AWS managed temporary credentials"
    * In the Cloud9 terminal, run `aws configure` and set access key ID (from ACG credentials), secret access key (from ACG credentials), and default region (`us-east-1`)
    * Run `cdk bootstrap` again and confirm completes successfully
* Once that completes, explore the files and folders created for the CDK project
* Open `cdk-labstart/lib/cdk-labstart-stack.ts`, uncomment the line that creates an SQS queue, and uncomment the `import` statement; **make sure you save your changes**
* Run `cdk synth` to generate the CloudFormation template
* You can review the template by opening the generated files in the "cdk.out" folder
* Run `cdk deploy` and navigate to SQS in another tab and verify that the queue was created
* Return to `cdk-labstart/lib/cdk-labstart-stack.ts` and change `cdk.Duration.seconds(300)` to `cdk.Duration.seconds(600)`; **make sure you save your changes**
* Run `cdk diff` (which automatically runs `cdk synth` behind-the-scenes) to see the changes that will be made to the stack (differences between what's in the template and what's in the stack)
* Run `cdk deploy` to update the deployment - you can observe the changes being processed in the CloudFormation console
* Review the SQS queue in the SQS console and note that the "Visibility timeout" has been updated to 10 minutes
* Open `cdk-labstart/test/cdk-labstart.test.ts` and uncomment the test case (and associated `import` statements); **make sure you save your changes**
* Run `npm test` to execute the test case - because of the most recent property change, the test will fail
* Update the test case and rerun `npm test` to verify that the test passes
* Run `cdk destroy` to clean up the resources
