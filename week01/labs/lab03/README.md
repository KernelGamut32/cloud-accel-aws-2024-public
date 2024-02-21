# Lab 03

**NOTE: Use an A Cloud Guru (ACG) AWS Playground for this lab**

**If you encounter "no space left on device issues", use https://ryansouthgate.com/aws-cloud9-no-space-left-on-device/#:~:text=There%E2%80%99s%20a%20few%20things%20we%20can%20tackle%20here%2C,clean%20up%20that%20much%20free%20space%20for%20me**

* In the lab environment, create a new Cloud9 environment by navigating to the Cloud9 console and clicking `Create environment` (or reuse a previously-created environment)
    - Specify a name for the environment
    - Leave all other options at their defaults, and click `Create`
    - Click the radio button next to your Cloud9 environment and click `Open in Cloud9` (it may take a few seconds for the environment to come up)
* In the provided terminal, clone this repository using `git clone https://github.com/KernelGamut32/cloud-accel-aws-2024-public.git`

## Part 1: [AWS CloudFormation - Looping in Resources](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/intrinsic-function-reference-foreach-example-resource.html#intrinsic-function-reference-foreach-example-replicate-ddb-resource)

* In the project view on the left, navigate to the week 01/lab 03/part 1 folder and open `start.yaml`
* Review the DynamoDB table definitions and notice the repetition within the table definitions
* Convert the template to use `ForEach` to efficiently replicate the parameterized table definitions
* To see one solution, you can review `end.yaml` in the week 01/lab 03/part 1 folder
* Replace `<initials>` with your initials; **save your changes**
* Push the CloudFormation template to AWS using `aws cloudformation create-stack --stack-name tables --template-body file://./cloud-accel-aws-2024-public/week01/labs/lab03/part1/end.yaml --capabilities CAPABILITY_AUTO_EXPAND`
* Run `aws cloudformation describe-stack-events --stack-name tables` to view the status of the stack creation
* Navigate to `DynamoDB` in the MC to view your newly-created tables
* Run `aws cloudformation delete-stack --stack-name tables` to delete the stack and the underlying resources in AWS
* Once the operation completes (you can monitor in MC), you can verify that the tables have been deleted

## Part 2: [AWS CloudFormation - Looping in Outputs](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/intrinsic-function-reference-foreach-example-outputs.html#intrinsic-function-reference-foreach-example-replicate-outputs)

* In the project view on the left, navigate to the week 01/lab 03/part 2 folder and open `start.yaml`
* Review the S3 bucket definitions and outputs, and notice the repetition within the template
* Convert the template to use `ForEach` to efficiently replicate the bucket definitions and the outputs
* To see one solution, you can review `end.yaml` in the week 01/lab 03/part 2 folder
* Push the CloudFormation template to AWS using `aws cloudformation create-stack --stack-name buckets --template-body file://./cloud-accel-aws-2024-public/week01/labs/lab03/part2/end.yaml --capabilities CAPABILITY_AUTO_EXPAND`
* Run `aws cloudformation describe-stack-events --stack-name buckets` to view the status of the stack creation
* Navigate to `S3` in the MC to view your newly-created buckets (including properties and static website hosting settings)
* Run `aws cloudformation describe-stacks --stack-name buckets --query 'Stacks[0].Outputs[*]'` to review the resulting outputs
* Run `aws cloudformation delete-stack --stack-name buckets` to delete the stack and the underlying resources in AWS
* Once the operation completes (you can monitor in MC), you can verify that the buckets have been deleted

## Part 3: [AWS CloudFormation - Looping in Conditions](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/intrinsic-function-reference-foreach-example-conditions.html)

* In the project view on the left, navigate to the week 01/lab 02 folder and open `vpc-initial.json`
* Update the VPC resource name attribute **AND** the tag value, replacing `<initials>` with your initials; **save your changes**
* Push the CloudFormation template to AWS using `aws cloudformation create-stack --stack-name vpc --template-body file://./cloud-accel-aws-2024-public/week01/labs/lab02/vpc-initial.json`
* Run `aws cloudformation describe-stack-events --stack-name vpc` to view the status of the stack creation
* Navigate to `VPC` in the MC to view your newly-created VPC; in the properties, tenancy will show `Dedicated`
* Open `vpc-with-condition.json` and, once again, replace `<initials>` with your initials; **save your changes**
* Push the CloudFormation template for the new VPC using `aws cloudformation create-stack --stack-name vpc2 --template-body file://./cloud-accel-aws-2024-public/week01/labs/lab02/vpc-with-condition.json --parameters ParameterKey=Tenancy,ParameterValue=default`
* Review the new VPC in the MC and notice the tenancy setting
* In the terminal, run `aws cloudformation update-stack --stack-name vpc2 --template-body file://./cloud-accel-aws-2024-public/week01/labs/lab02/vpc-with-condition.json --parameters ParameterKey=Tenancy,ParameterValue=dedicated` to apply the updates to the stack
* Review the updates to the VPN in MC
* Run `aws cloudformation delete-stack --stack-name vpc` and `aws cloudformation delete-stack --stack-name vpc2` to delete the stacks and the underlying resources in AWS
* Once the operation completes (you can monitor in MC), you can verify that VPCs have been deleted
