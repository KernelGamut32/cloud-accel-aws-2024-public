# Lab 06 - [AWS CloudFormation - Nested Stacks](https://learn.acloud.guru/handson/7e6eecaa-283a-46d2-a1ad-8ec41c198250)

**NOTE: Use an A Cloud Guru (ACG) AWS Playground for this lab**

**If you encounter "no space left on device issues", use https://ryansouthgate.com/aws-cloud9-no-space-left-on-device/#:~:text=There%E2%80%99s%20a%20few%20things%20we%20can%20tackle%20here%2C,clean%20up%20that%20much%20free%20space%20for%20me**

Nested Stacks can use outputs from other stacks within the same group. Exporting an output enables usage of that output in other stacks in the same AWS account and region via import (see https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/using-cfn-stack-imports.html for additional information).

* In the lab environment, create a new Cloud9 environment by navigating to the Cloud9 console and clicking `Create environment`
    - Specify a name for the environment
    - Leave all other options at their defaults, and click `Create`
    - Click the radio button next to your Cloud9 environment and click `Open in Cloud9` (it may take a few seconds for the environment to come up)
* In the provided terminal, clone this repository using `git clone https://github.com/KernelGamut32/cloud-accel-aws-2024-public.git`
* In the project view on the left, navigate to the week 01/lab 06 folder and open `noretain.json` to review the template definition
* In the project view on the left, navigate to the week 01/lab 06 folder and open `s3static.json` to review the template definition
* In the provided terminal, run `aws s3 mb s3://<bucket-name>` to create a new S3 bucket to house the child templates that will be used in the nested stacks (use lowercase letters and numbers only)
* Run `aws s3 ls` to confirm creation of the new bucket
* Using the bucket name, run `aws s3 cp ./cloud-accel-aws-2024-public/week01/labs/lab06/noretain.json s3://<bucket-name>`
* Using the bucket name, run `aws s3 cp ./cloud-accel-aws-2024-public/week01/labs/lab06/s3static.json s3://<bucket-name>`
* In the project view on the left, navigate to the week 01/lab 06 folder and open `root.json` to review the template definition for the first nested stack (parent CFT)
* Replace `<bucket-name>` in the `TemplateURL` property in `root.json` with your bucket name; **save your changes**
* Push the CloudFormation template to AWS using `aws cloudformation create-stack --stack-name nested-noretain --template-body file://./cloud-accel-aws-2024-public/week01/labs/lab06/root.json`
* Run `aws cloudformation describe-stack-events --stack-name nested-noretain` to view the status of the stack creation
* Using the provided output URL (passthrough from child template to parent template), navigate to `index.html` to view the page
* Using the provided output URL, navigate to `doh.html` to see the error page
* In the project view on the left, navigate to the week 01/lab 06 folder and open `multinest.json` to review the template definition for the first nested stack (parent CFT)
* Replace `<bucket-name>` in the `TemplateURL` property in `multinest.json` with your bucket name; **save your changes**
* Push the CloudFormation template to AWS using `aws cloudformation create-stack --stack-name nested-retain --template-body file://./cloud-accel-aws-2024-public/week01/labs/lab06/multinest.json`
* Run `aws cloudformation describe-stack-events --stack-name nested-retain` to view the status of the stack creation
* Using the provided output URL (passthrough from child template to parent template), navigate to `index.html` to view the page (in each S3 location)
* Using the provided output URL, navigate to `doh.html` to see the error page (in each S3 location)
* Run `aws cloudformation delete-stack --stack-name nested-noretain` to delete the stack and the underlying resources in AWS
* Run `aws cloudformation delete-stack --stack-name nested-retain` to delete the stack and the underlying resources in AWS
* Note that for the S3 bucket set for retain, the CloudFormation stack will be deleted but the S3 bucket remains
