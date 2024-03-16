# Lab 08 - [S3 Lifecycle Rules](https://learn.acloud.guru/handson/9366814c-d237-4e04-9b64-e7c4e0cf1884)

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
* In the project view on the left, navigate to the week 01/lab 08 folder and open `lab-resources.yaml` to review the template definition
* Push the CloudFormation template to AWS using `aws cloudformation create-stack --stack-name s3lifecycle --template-body file://./cloud-accel-aws-2024-public/week01/labs/lab08/lab-resources.yaml`
* Run `aws cloudformation describe-stack-events --stack-name s3lifecycle` to view the status of the stack creation
* Navigate to `S3` in the AWS Management Console and review the bucket configuration including relevant lifecycle rules
* **NOTE: Lifecycle rules run once per day and results may not be immediate depending on the rules setup** 
* Run `aws cloudformation delete-stack --stack-name s3lifecycle` to delete the stack and the underlying resources in AWS
