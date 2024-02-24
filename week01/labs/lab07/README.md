# Lab 07 - [S3 Bucket Versioning](https://learn.acloud.guru/handson/c3870bf7-5d98-44fe-acf5-4c0bbdddb3d9)

**NOTE: Use an A Cloud Guru (ACG) AWS Playground for this lab**

**If you encounter "no space left on device issues", use https://ryansouthgate.com/aws-cloud9-no-space-left-on-device/#:~:text=There%E2%80%99s%20a%20few%20things%20we%20can%20tackle%20here%2C,clean%20up%20that%20much%20free%20space%20for%20me**

* In the lab environment, create a new Cloud9 environment by navigating to the Cloud9 console and clicking `Create environment`
    - Specify a name for the environment
    - Leave all other options at their defaults, and click `Create`
    - Click the radio button next to your Cloud9 environment and click `Open in Cloud9` (it may take a few seconds for the environment to come up)
* In the provided terminal, clone this repository using `git clone https://github.com/KernelGamut32/cloud-accel-aws-2024-public.git`
* In the provided terminal, open Cloud Shell and clone the repository for the lab using `git clone https://github.com/ACloudGuru-Resources/S3BucketsLabFiles.git`
* In the project view on the left, navigate to the week 01/lab 07 folder and open `create-buckets.yaml` to review the template definition
* Push the CloudFormation template to AWS using `aws cloudformation create-stack --stack-name s3buckets --template-body file://./cloud-accel-aws-2024-public/week01/labs/lab07/create-buckets.yaml`
* Run `aws cloudformation describe-stack-events --stack-name s3buckets` to view the status of the stack creation
* Once stack is complete, run `aws s3 ls` to view the buckets
* Run `aws s3 cp ./S3BucketsLabFiles/cat1.jpg s3://<private-bucket-name>` to copy the file to the private bucket
* Attempt to access the uploaded file at `https://<private-bucket-name>.s3.amazonaws.com/cat1.jpg` and note the "Access Denied" error since the bucket is private
* Run `aws s3 cp ./S3BucketsLabFiles/cat1.jpg s3://<public-bucket-name>` to copy the file to the public bucket
* Attempt to access the uploaded file at `https://<public-bucket-name>.s3.amazonaws.com/cat1.jpg` and note the "Access Denied" error since the bucket is public but the object is not
* Run `aws s3api put-object-acl --bucket <public-bucket-name> --key cat1.jpg --acl public-read` to make the object public
* Attempt to access the uploaded file at `https://<public-bucket-name>.s3.amazonaws.com/cat1.jpg` again and note that access is now available
* In `create-buckets.yaml`, uncomment the lines used to enable versioning on the public bucket; **save your changes**
* Run `aws cloudformation update-stack --stack-name s3buckets --template-body file://./cloud-accel-aws-2024-public/week01/labs/lab07/create-buckets.yaml` to apply the updates to the stack
* Run `aws cloudformation describe-stack-events --stack-name s3buckets` to view the status of the stack creation
* Run `mv ./S3BucketsLabFiles/cat1.jpg ./S3BucketsLabFiles/cat1.jpg.backup` to backup the original file
* Run `mv ./S3BucketsLabFiles/cat2.jpg ./S3BucketsLabFiles/cat1.jpg` to replace the original file with the new file
* Run `ls ./S3BucketsLabFiles` to verify that the file changes are complete
* Run `aws s3 cp ./S3BucketsLabFiles/cat1.jpg s3://<public-bucket-name>` to add a new version of the file to the S3 bucket
* Run `aws s3api put-object-acl --bucket <public-bucket-name> --key cat1.jpg --acl public-read` to make the new version accessible
* Attempt to access the uploaded file at `https://<public-bucket-name>.s3.amazonaws.com/cat1.jpg` again and note the updated version of the object
* Run `aws s3api list-object-versions --bucket <public-bucket-name> --prefix cat1.jpg` to view the versions of the object
* Attempt to access the file at `https://<public-bucket-name>.s3.amazonaws.com/cat1.jpg?versionId=null` and note that the original version is still accessible
