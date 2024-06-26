# Lab 05 - [AWS CloudFormation - Drift Detection](https://github.com/PacktPublishing/Mastering-AWS-CloudFormation/tree/master/Chapter1/DriftDetection)

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
1. In the project view on the left, navigate to the week 01/lab 05 folder and open `iam-role.yaml` to review the template definition
1. Push the CloudFormation template to AWS using `aws cloudformation create-stack --stack-name drift --template-body file://./cloud-accel-aws-2024-public/week01/labs/lab05/iam-role.yaml --capabilities CAPABILITY_IAM`
1. Run `aws cloudformation describe-stack-events --stack-name drift` to view the status of the stack creation
1. In a separate tab, using "CloudShell", run `ROLENAME=$(aws cloudformation describe-stack-resources --stack-name drift --query "StackResources[0].PhysicalResourceId" --output text)`
1. In "CloudShell", run `aws iam attach-role-policy --role-name $ROLENAME --policy-arn "arn:aws:iam::aws:policy/AdministratorAccess"`
1. In `IAM`, review the set of permissions assigned by the CFT to the role
1. In "CloudShell", run `DRIFT_ID=$(aws cloudformation detect-stack-drift --stack-name drift --query "StackDriftDetectionId" --output text)`
1. In "CloudShell", run `aws cloudformation describe-stack-drift-detection-status --stack-drift-detection-id $DRIFT_ID` and observe results
1. In "CloudShell", run `aws iam detach-role-policy --role-name $ROLENAME --policy-arn "arn:aws:iam::aws:policy/AdministratorAccess"`
1. In "CloudShell", rerun `DRIFT_ID=$(aws cloudformation detect-stack-drift --stack-name drift --query "StackDriftDetectionId" --output text)`
1. In "CloudShell", rerun `aws cloudformation describe-stack-drift-detection-status --stack-drift-detection-id $DRIFT_ID` and observe results
1. In the Cloud9 terminal, run `aws cloudformation delete-stack --stack-name drift` to delete the stack and the underlying resources in AWS
