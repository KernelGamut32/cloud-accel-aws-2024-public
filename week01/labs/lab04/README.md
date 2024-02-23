# Lab 04 - [AWS CloudFormation - Working with Roles](https://learn.acloud.guru/handson/cc08fe37-5a2f-4fe3-87c7-4f5a3fd2abe8)

**NOTE: Use an A Cloud Guru (ACG) AWS Playground for this lab**

**If you encounter "no space left on device issues", use https://ryansouthgate.com/aws-cloud9-no-space-left-on-device/#:~:text=There%E2%80%99s%20a%20few%20things%20we%20can%20tackle%20here%2C,clean%20up%20that%20much%20free%20space%20for%20me**

* In the lab environment, create a new Cloud9 environment by navigating to the Cloud9 console and clicking `Create environment`
    - Specify a name for the environment
    - Leave all other options at their defaults, and click `Create`
    - Click the radio button next to your Cloud9 environment and click `Open in Cloud9` (it may take a few seconds for the environment to come up)
* In the provided terminal, clone this repository using `git clone https://github.com/KernelGamut32/cloud-accel-aws-2024-public.git`
* In the project view on the left, navigate to the week 01/lab 04 folder and open `role-template.yaml` to review the template definition
* In the project view on the left, navigate to the week 01/lab 04 folder and open `inputs.json`; replace `<initials>` with your initials; **save your changes**
* Push the CloudFormation template to AWS using `aws cloudformation create-stack --stack-name role --parameters file://./cloud-accel-aws-2024-public/week01/labs/lab04/inputs.json --template-body file://./cloud-accel-aws-2024-public/week01/labs/lab04/role-template.yaml --capabilities CAPABILITY_NAMED_IAM`
* Run `aws cloudformation describe-stack-events --stack-name role` to view the status of the stack creation
* Navigate to `IAM` to view the role and associated policy
* In `role-template.yaml`, under the "policy document" definition, change the `Allow` effect to `Deny`
* In the terminal, run `aws cloudformation update-stack --stack-name role --parameters file://./cloud-accel-aws-2024-public/week01/labs/lab04/inputs.json --template-body file://./cloud-accel-aws-2024-public/week01/labs/lab04/role-template.yaml --capabilities CAPABILITY_NAMED_IAM` to apply the updates to the stack
* Review the updates to the role in `IAM`
* Run `aws cloudformation delete-stack --stack-name role` to delete the stack and the underlying resources in AWS
