# Lab 06 - [AWS CloudFormation - Nested Stacks](https://learn.acloud.guru/handson/7e6eecaa-283a-46d2-a1ad-8ec41c198250)

**NOTE: Use an A Cloud Guru (ACG) AWS Playground for this lab**

**If you encounter "no space left on device issues", use https://ryansouthgate.com/aws-cloud9-no-space-left-on-device/#:~:text=There%E2%80%99s%20a%20few%20things%20we%20can%20tackle%20here%2C,clean%20up%20that%20much%20free%20space%20for%20me**

* In the lab environment, create a new Cloud9 environment by navigating to the Cloud9 console and clicking `Create environment`
    - Specify a name for the environment
    - Leave all other options at their defaults, and click `Create`
    - Click the radio button next to your Cloud9 environment and click `Open in Cloud9` (it may take a few seconds for the environment to come up)
* In the provided terminal, clone this repository using `git clone https://github.com/KernelGamut32/cloud-accel-aws-2024-public.git`
* In the project view on the left, navigate to the week 01/lab 01 folder and open `initial-stack.yaml`
* Update the `TableName` attribute, replacing `<initials>` with your initials; **save your changes**
* Push the CloudFormation template to AWS using `aws cloudformation create-stack --stack-name dynamodb --template-body file://./cloud-accel-aws-2024-public/week01/labs/lab01/initial-stack.yaml`
* Run `aws cloudformation describe-stack-events --stack-name dynamodb` to view the status of the stack creation
* Navigate to `DynamoDB` to view your newly-created table
* Navigate to `CloudFormation` to view the details of your stack; review the `Events` tab for details
* Open `stack-plus-role.yaml` and, once again, replace `<initials>` with your initials; **save your changes**
* In the terminal, run `aws cloudformation update-stack --stack-name dynamodb --template-body file://./cloud-accel-aws-2024-public/week01/labs/lab01/stack-plus-role.yaml` to apply the updates to the stack
* You will receive an error - because we are trying to add a "special" type of AWS object (an IAM Role), we need to explicitly call out our need for that capability when executing (in the Management Console, you'd be forced to click a checkbox)
* In the terminal, run `aws cloudformation update-stack --stack-name dynamodb --template-body file://./cloud-accel-aws-2024-public/week01/labs/lab01/stack-plus-role.yaml --capabilities CAPABILITY_IAM` to successfully apply the updates to the stack
* Run `aws cloudformation describe-stack-events --stack-name dynamodb` to view the status of the stack creation
* In `CloudFormation` in the Management Console, you can also watch the progress of your updates
* Navigate to `IAM` in the Management Console, click `Roles`, and search for `dynamodb` to view the details of the role created with the latest update
* In `stack-plus-role.yaml`, update `ReadCapacityUnits` from 5 to 10 and update `WriteCapacityUnits` from 5 to 10; **save your changes**
* Rerun `aws cloudformation update-stack --stack-name dynamodb --template-body file://./cloud-accel-aws-2024-public/week01/labs/lab01/stack-plus-role.yaml --capabilities CAPABILITY_IAM` to apply updates
* In `CloudFormation` in the Management Console, observe the progress of your updates and explore details about what changes
* In `DynamoDB` in the MC, you can see the updates to the table reflected in the `Additional settings` tab
* Run `aws cloudformation delete-stack --stack-name dynamodb` to delete the stack and the underlying resources in AWS
* Once the operation completes (you can monitor in MC), you can verify that the DynamoDB table has been deleted along with the IAM elements previously created as part of the lab
