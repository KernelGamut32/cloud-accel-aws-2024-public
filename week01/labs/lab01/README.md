# Lab 01 - [AWS CloudFormation](https://beabetterdev.com/2020/12/06/aws-cloudformation-tutorial/)

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
1. In the provided terminal, clone this repository using `git clone https://github.com/KernelGamut32/cloud-accel-aws-2024-public.git`
1. In the project view on the left, navigate to the week 01/lab 01 folder and open `initial-stack.yaml`
1. Update the `TableName` attribute, replacing `<initials>` with your initials; **save your changes**
1. Push the CloudFormation template to AWS using `aws cloudformation create-stack --stack-name dynamodb --template-body file://./cloud-accel-aws-2024-public/week01/labs/lab01/initial-stack.yaml`
1. Run `aws cloudformation describe-stack-events --stack-name dynamodb` to view the status of the stack creation
1. Navigate to `DynamoDB` to view your newly-created table
1. Navigate to `CloudFormation` to view the details of your stack; review the `Events` tab for details
1. Open `stack-plus-role.yaml` and, once again, replace `<initials>` with your initials; **save your changes**
1. In the terminal, run `aws cloudformation update-stack --stack-name dynamodb --template-body file://./cloud-accel-aws-2024-public/week01/labs/lab01/stack-plus-role.yaml` to apply the updates to the stack
1. You will receive an error - because we are trying to add a "special" type of AWS object (an IAM Role), we need to explicitly call out our need for that capability when executing (in the Management Console, you'd be forced to click a checkbox)
1. In the terminal, run `aws cloudformation update-stack --stack-name dynamodb --template-body file://./cloud-accel-aws-2024-public/week01/labs/lab01/stack-plus-role.yaml --capabilities CAPABILITY_IAM` to successfully apply the updates to the stack
1. Run `aws cloudformation describe-stack-events --stack-name dynamodb` to view the status of the stack creation
1. In `CloudFormation` in the Management Console, you can also watch the progress of your updates
1. Navigate to `IAM` in the Management Console, click `Roles`, and search for `dynamodb` to view the details of the role created with the latest update
1. In `stack-plus-role.yaml`, update `ReadCapacityUnits` from 5 to 10 and update `WriteCapacityUnits` from 5 to 10; **save your changes**
1. Rerun `aws cloudformation update-stack --stack-name dynamodb --template-body file://./cloud-accel-aws-2024-public/week01/labs/lab01/stack-plus-role.yaml --capabilities CAPABILITY_IAM` to apply updates
1. In `CloudFormation` in the Management Console, observe the progress of your updates and explore details about what changes
1. In `DynamoDB` in the MC, you can see the updates to the table reflected in the `Additional settings` tab
1. Run `aws cloudformation delete-stack --stack-name dynamodb` to delete the stack and the underlying resources in AWS
1. Once the operation completes (you can monitor in MC), you can verify that the DynamoDB table has been deleted along with the IAM elements previously created as part of the lab
