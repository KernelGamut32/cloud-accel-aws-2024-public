# CloudFormation Demo - https://github.com/KernelGamut32/Mastering-AWS-CloudFormation

**Install AWS Toolkit in VS Code**

Review https://github.com/KernelGamut32/Mastering-AWS-CloudFormation/tree/master/Chapter1/DriftDetection

* Run `aws configure` - set credentials and make sure region is us-east-1
* From Chapter1 folder, run `aws cloudformation create-stack --stack-name iamrole --template-body file://./DriftDetection/IamRole.yaml --capabilities CAPABILITY_IAM`
* From Chapter1 folder, run `ROLENAME=$(aws cloudformation describe-stack-resources --stack-name iamrole --query "StackResources[0].PhysicalResourceId" --output text)`
* From Chapter1 folder, run `aws iam attach-role-policy --role-name $ROLENAME --policy-arn "arn:aws:iam::aws:policy/AdministratorAccess“`
* Go to “Drifts” and detect drift
* From Chapter1 folder, run `aws iam detach-role-policy --role-name $ROLENAME --policy-arn "arn:aws:iam::aws:policy/AdministratorAccess“`
* Detect drift again
* From Chapter1 folder, run `aws cloudformation delete-stack --stack-name iamrole`
