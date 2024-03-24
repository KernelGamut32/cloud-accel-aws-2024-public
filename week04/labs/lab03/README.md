# Lab 03 - [Processing IoT Events Through SNS](https://docs.aws.amazon.com/iot/latest/developerguide/iot-sns-rule.html)

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
* In the provided terminal from the `~/environment` folder, clone the class repository using `git clone https://github.com/KernelGamut32/cloud-accel-aws-2024-public.git`
* Review the `notification.yaml` file and the `inputs.json` file
* Open `inputs.json` in the IDE and replace `<email address>` with a valid email address
* Create the AWS resources using the CloudFormation template in the lab repository by running `aws cloudformation create-stack --stack-name IOT-SNS --parameters file://./cloud-accel-aws-2024-public/week04/labs/lab03/inputs.json  --template-body file://./cloud-accel-aws-2024-public/week04/labs/lab03/notification.yaml --capabilities CAPABILITY_IAM`
* Run `aws cloudformation describe-stack-events --stack-name IOT-SNS` to check the status of the stack creation (or view in the CloudFormation Management Console)
* You will need to confirm the subscription at the email address used for the parameter before sending test data
* Once the CloudFormation deployment completes, use the AWS Console and follow along with `Step 3: Test the AWS IoT rule and Amazon SNS notification` to test the rule and notification
* Use `aws cloudformation delete-stack --stack-name IOT-SNS` to delete the AWS resources for the lab
