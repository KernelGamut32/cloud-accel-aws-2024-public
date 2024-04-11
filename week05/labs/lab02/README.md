# Lab 02 - [Categorizing Data Using Step Functions](https://learn.acloud.guru/handson/5197c509-cdee-42b7-a30f-2c47980a10f3)

**NOTE: Use an A Cloud Guru (ACG) AWS Playground for this lab**

**If you encounter "no space left on device issues", use https://ryansouthgate.com/aws-cloud9-no-space-left-on-device/#:~:text=There%E2%80%99s%20a%20few%20things%20we%20can%20tackle%20here%2C,clean%20up%20that%20much%20free%20space%20for%20me**

* In the lab environment, create a new Cloud9 environment by navigating to the Cloud9 console and clicking `Create environment` (or reuse a previously-created environment)
    - Specify a name for the environment
    - Select `Additional instance types` and choose `t3.medium`
    - Leave all other options at their defaults, and click `Create`
    - Wait for the Cloud9 environment creation to complete and click the link for your newly created environment
    - Under `EC2 instance` click `Manage EC2 instance`
    - Click the `Instance ID` link
    - Select `Storage`, click the `Volume ID` link, click the checkbox next to your volume, and select `Modify volume` from the `Actions` dropdown
    - Increase size from `10` to `30` GiB; click `Modify` and click `Modify` in the confirmation dialog
    - Reboot your EC2 instance
    - Go back to Cloud9, click the radio button next to your Cloud9 environment, and click `Open in Cloud9`
    - In the terminal window, you can run `lsblk` to confirm new size
* In the provided terminal from the `~/environment` folder, clone the project repository using `git clone https://github.com/KernelGamut32/categorize-data.git`
* Navigate to the target folder using `cd categorize-data`; feel free to explore the contents of the provided CDK files
* With this CDK project, we are going to use `projen` to help us manage configuration and execution of our app (https://aws.amazon.com/blogs/devops/getting-started-with-projen-and-aws-cdk/)
* Run `npm install` to install the required dependencies
* Run `npx projen` to incorporate and confirm any configuration updates
* Run `npx cdk bootstrap` in the terminal to bootstrap the CDK environment
* If you run into any issues running `npx cdk bootstrap`, execute the following steps:
    * Click the "Cloud9" logo in the upper left corner of the IDE and click "Preferences"
    * Click "AWS Settings" and uncheck "AWS managed temporary credentials"
    * In the Cloud9 terminal, run `aws configure` and set access key ID (from ACG credentials), secret access key (from ACG credentials), and default region (`us-east-1`)
    * Run `npx cdk bootstrap` again and confirm completes successfully
* Run `npx projen build` to build the application, synthesize the CloudFormation template, and run the tests & linter for the project to validate
* Run `npx projen deploy` to deploy the CDK stack
* When deploy completes, you can verify the presence of the Lambdas, S3 bucket, roles, and Step Function
* Download `ImportantBusiness.mp3` from `https://github.com/KernelGamut32/cloud-accel-aws-2024-public/blob/main/week05/labs/lab02`
* Navigate to the S3 bucket and create a new folder called `upload`
* Navigate to that folder and upload the `ImportantBusiness.mp3` file
* Upon upload, based on the configuration of the AWS resources, that file will automatically trigger the Step Function to transcribe the mp3 and evaluate it for the presence of "important" keywords
* Navigate to the Step Functions console to visually watch the flow
* Once the Step Function execution is complete, you can navigate to S3 to confirm the proper processing of the mp3 and its transcript
* Run `npx projen destroy` from the project folder to delete the AWS resources for the lab
