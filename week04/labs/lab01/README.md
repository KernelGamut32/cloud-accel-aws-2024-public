# Lab 01 - [Triggering Lambda from SQS](https://learn.acloud.guru/handson/c11ca4ba-f942-4a5b-9c75-ad3ff8134a97)

**NOTE: Use an A Cloud Guru (ACG) AWS Playground for this lab**

**If you encounter "no space left on device issues", use https://ryansouthgate.com/aws-cloud9-no-space-left-on-device/#:~:text=There%E2%80%99s%20a%20few%20things%20we%20can%20tackle%20here%2C,clean%20up%20that%20much%20free%20space%20for%20me**

1. In the lab environment, create a new Cloud9 environment by navigating to the Cloud9 console and clicking `Create environment` (or reuse a previously-created environment)
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
1. In the provided terminal from the `~/environment` folder, clone the project repository using `git clone https://github.com/KernelGamut32/queue-deploy.git`
1. Navigate to the target folder using `cd queue-deploy`; feel free to explore the contents of the provided CDK files
1. With this CDK project, we are going to use `projen` to help us manage configuration and execution of our app (https://aws.amazon.com/blogs/devops/getting-started-with-projen-and-aws-cdk/)
1. Run `npm install` to install the required dependencies
1. Run `npx projen` to incorporate and confirm any configuration updates
1. Run `npx cdk bootstrap` in the terminal to bootstrap the CDK environment
1. If you run into any issues running `npx cdk bootstrap`, execute the following steps:
    - Click the "Cloud9" logo in the upper left corner of the IDE and click "Preferences"
    - Click "AWS Settings" and uncheck "AWS managed temporary credentials"
    - In the Cloud9 terminal, run `aws configure` and set access key ID (from ACG credentials), secret access key (from ACG credentials), and default region (`us-east-1`)
    - Run `npx cdk bootstrap` again and confirm completes successfully
1. Run `npx projen build` to build the application, synthesize the CloudFormation template, and run the tests & linter for the project to validate
1. Run `npx projen deploy` to deploy the CDK stack
1. On completion, from the `~/environment` folder in the terminal, clone the class repository using `git clone https://github.com/KernelGamut32/cloud-accel-aws-2024-public.git`
1. Navigate to the location of the test harness using `cd cloud-accel-aws-2024-public/week04/labs/lab01`
1. Run `pip3 install -r requirements.txt` to install required dependencies
1. To run the provided test harness, use `python3 send_message.py -q MessagesCDK -i 0.1`; feel free to explore the contents of `send_message.py` to see the code
1. Let the test harness run for a few seconds and then use `Ctrl+C` to stop its execution
1. Navigate to the DynamoDB table to view the messages that were posted to the SQS queue which triggered the Lambda to persist in the table
1. Navigate to SQS and review `Monitoring` to see activity processed through the queue
1. Run `npx projen destroy` from the project folder to delete the AWS resources for the lab