# Lab 02 - [AWS CloudFormation - Condition Functions](https://learn.acloud.guru/handson/234d14a4-2051-4ec1-a282-c64493dd47eb)

**NOTE: Use an A Cloud Guru (ACG) AWS Playground for this lab**

**If you encounter "no space left on device issues", use https://ryansouthgate.com/aws-cloud9-no-space-left-on-device/#:~:text=There%E2%80%99s%20a%20few%20things%20we%20can%20tackle%20here%2C,clean%20up%20that%20much%20free%20space%20for%20me**

* In the lab environment, create a new Cloud9 environment by navigating to the Cloud9 console and clicking `Create environment` (or reuse a previously-created environment)
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
* In the provided terminal, clone this repository using `git clone https://github.com/KernelGamut32/cloud-accel-aws-2024-public.git`
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
