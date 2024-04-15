# Lab 03

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
2. In the provided terminal, clone this repository using `git clone https://github.com/KernelGamut32/cloud-accel-aws-2024-public.git`

## Part 1: [AWS CloudFormation - Looping in Resources](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/intrinsic-function-reference-foreach-example-resource.html#intrinsic-function-reference-foreach-example-replicate-ddb-resource)

3. In the project view on the left, navigate to the week 01/lab 03/part 1 folder and open `start.yaml`
4. Review the DynamoDB table definitions and notice the repetition within the table definitions
5. Convert the template to use `ForEach` to efficiently replicate the parameterized table definitions
6. To see one solution, you can review `end.yaml` in the week 01/lab 03/part 1 folder
7. Replace `<initials>` with your initials; **save your changes**
8. Push the CloudFormation template to AWS using `aws cloudformation create-stack --stack-name tables --template-body file://./cloud-accel-aws-2024-public/week01/labs/lab03/part1/end.yaml --capabilities CAPABILITY_AUTO_EXPAND`
9. Run `aws cloudformation describe-stack-events --stack-name tables` to view the status of the stack creation
10. Navigate to `DynamoDB` in the MC to view your newly-created tables
11. Run `aws cloudformation delete-stack --stack-name tables` to delete the stack and the underlying resources in AWS
12. Once the operation completes (you can monitor in MC), you can verify that the tables have been deleted

## Part 2: [AWS CloudFormation - Looping in Outputs](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/intrinsic-function-reference-foreach-example-outputs.html#intrinsic-function-reference-foreach-example-replicate-outputs)

13. In the project view on the left, navigate to the week 01/lab 03/part 2 folder and open `start.yaml`
14. Review the S3 bucket definitions and outputs, and notice the repetition within the template
15. Convert the template to use `ForEach` to efficiently replicate the bucket definitions and the outputs
16. To see one solution, you can review `end.yaml` in the week 01/lab 03/part 2 folder
17. Push the CloudFormation template to AWS using `aws cloudformation create-stack --stack-name buckets --template-body file://./cloud-accel-aws-2024-public/week01/labs/lab03/part2/end.yaml --capabilities CAPABILITY_AUTO_EXPAND`
18. Run `aws cloudformation describe-stack-events --stack-name buckets` to view the status of the stack creation
19. Navigate to `S3` in the MC to view your newly-created buckets (including properties and static website hosting settings)
20. Run `aws cloudformation describe-stacks --stack-name buckets --query 'Stacks[0].Outputs[*]'` to review the resulting outputs
21. Run `aws cloudformation delete-stack --stack-name buckets` to delete the stack and the underlying resources in AWS
22. Once the operation completes (you can monitor in MC), you can verify that the buckets have been deleted
