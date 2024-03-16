# Lab 06 - [AWS CloudFormation - Nested Stacks](https://learn.acloud.guru/handson/7e6eecaa-283a-46d2-a1ad-8ec41c198250)

**NOTE: Use an A Cloud Guru (ACG) AWS Playground for this lab**

**If you encounter "no space left on device issues", use https://ryansouthgate.com/aws-cloud9-no-space-left-on-device/#:~:text=There%E2%80%99s%20a%20few%20things%20we%20can%20tackle%20here%2C,clean%20up%20that%20much%20free%20space%20for%20me**

Nested Stacks can use outputs from other stacks within the same group. Exporting an output enables usage of that output in other stacks in the same AWS account and region via import (see https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/using-cfn-stack-imports.html for additional information).

* In the lab environment, create a new Cloud9 environment by navigating to the Cloud9 console and clicking `Create environment` (or reuse a previously-created environment)
    - Specify a name for the environment
    - Select `t3.small` for instance type
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
* Push the CloudFormation template to AWS using `aws cloudformation create-stack --stack-name site-stack --template-body file://./cloud-accel-aws-2024-public/week01/labs/lab06/root.json`
* Run `aws cloudformation describe-stack-events --stack-name site-stack` to view the status of the stack creation
* Run `aws cloudformation describe-stacks --stack-name site-stack --query 'Stacks[0].Outputs[*]'` to review the resulting outputs
* Using the output value for `NoRetainS3Uri` (passthrough from child template to parent template), execute `aws s3 cp ./cloud-accel-aws-2024-public/week01/labs/lab06/index.html <NoRetainS3Uri>` and `aws s3 cp ./cloud-accel-aws-2024-public/week01/labs/lab06/error.html <NoRetainS3Uri>`
* Using the output value for `NoRetainS3SecureURL` (passthrough from child template to parent template), navigate to `index.html` to view the page
* Using the provided output URL, navigate to `error.html` to see the error page
* In the project view on the left, navigate to the week 01/lab 06 folder and open `multinest.json` to review the template definition for the second nested stack (parent CFT)
* Replace `<bucket-name>` in the `TemplateURL` property in `multinest.json` with your bucket name; **save your changes**
* Create a new changeset using `aws cloudformation create-change-set --stack-name site-stack --change-set-name site-updates --template-body file://./cloud-accel-aws-2024-public/week01/labs/lab06/multinest.json`
* Run `aws cloudformation describe-change-set --stack-name site-stack --change-set-name site-updates` to review the changeset details
* Run `aws cloudformation execute-change-set --stack-name site-stack --change-set-name site-updates` to execute the changeset (and create/update AWS resources)
* Run `aws cloudformation describe-stack-events --stack-name site-stack` to view the status of the stack creation resulting from changeset execution
* Run `aws cloudformation describe-stacks --stack-name site-stack --query 'Stacks[0].Outputs[*]'` to review the resulting outputs
* Using the output value for `RetainS3Uri` (passthrough from child template to parent template), execute `aws s3 cp ./cloud-accel-aws-2024-public/week01/labs/lab06/index.html <RetainS3Uri>` and `aws s3 cp ./cloud-accel-aws-2024-public/week01/labs/lab06/booboo.html <RetainS3Uri>`
* Using the output value for `RetainS3SecureURL` (passthrough from child template to parent template), navigate to `index.html` to view the page
* Using the provided output URL, navigate to `booboo.html` to see the error page
* Using the output value for `NoRetainS3SecureURL` (passthrough from child template to parent template), verify that `index.html` and `error.html` remain accessible
* Run `aws cloudformation delete-stack --stack-name site-stack` to delete the stack and the underlying resources in AWS
* Run `aws cloudformation describe-stack-events --stack-name site-stack` to view the status of the stack creation resulting from changeset execution
* Run `aws cloudformation describe-stacks --stack-name site-stack --query 'Stacks[0].Outputs[*]'` to review the available outputs again
* Run `aws s3 rm <NoRetainS3Uri> --recursive` and `aws s3 rm <RetainS3Uri> --recursive` to empty the buckets
* Rerun `aws cloudformation delete-stack --stack-name site-stack` to delete the stack and the underlying resources in AWS
* Rerun `aws cloudformation describe-stack-events --stack-name site-stack` to view the status of the stack creation resulting from changeset execution
* Note that for the S3 bucket set with "retain", the CloudFormation stack will be deleted but the S3 bucket remains
