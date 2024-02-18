# Lab 01 - https://learn.acloud.guru/handson/c3870bf7-5d98-44fe-acf5-4c0bbdddb3d9

**Run the following in an ACG sandbox**

* In the lab environment, open Cloud Shell and clone this repository using `git clone https://github.com/KernelGamut32/cloud-accelerator-program-aws-public.git`
* In the lab environment, open Cloud Shell and clone the repository for the lab using `git clone https://github.com/ACloudGuru-Resources/S3BucketsLabFiles.git`
* Create the S3 buckets using the CloudFormation template in the lab repository by running `aws cloudformation create-stack --stack-name s3buckets --template-body file://./cloud-accelerator-program-aws-public/week06/labs/lab01/create-buckets.yaml`
* Run `aws cloudformation describe-stack-events --stack-name s3buckets` to view the status of the stack creation
* Once stack is complete, run `aws s3 ls` to view the buckets
* Run `aws s3 cp ./S3BucketsLabFiles/cat1.jpg s3://<private-bucket-name>` to copy the file to the private bucket
* Attempt to access the uploaded file at `https://<private-bucket-name>.s3.amazonaws.com/cat1.jpg` and note the "Access Denied" error since the bucket is private
* Run `aws s3 cp ./S3BucketsLabFiles/cat1.jpg s3://<public-bucket-name>` to copy the file to the public bucket
* Attempt to access the uploaded file at `https://<public-bucket-name>.s3.amazonaws.com/cat1.jpg` and note the "Access Denied" error since the bucket is public but the object is not
* Run `aws s3api put-object-acl --bucket <public-bucket-name> --key cat1.jpg --acl public-read` to make the object public
* Attempt to access the uploaded file at `https://<public-bucket-name>.s3.amazonaws.com/cat1.jpg` again and note that access is now available
* Run `vi ./cloud-accelerator-program-aws-public/week06/labs/lab01/create-buckets.yaml` to open the CloudFormation template in the vi editor and uncomment the lines for enable versioning on the public bucket; hit escape and type `:wq!` to save and exit
* Run `aws cloudformation update-stack --stack-name s3buckets --template-body file://./cloud-accelerator-program-aws-public/week06/labs/lab01/create-buckets.yaml` to apply the updates to the stack
* Use `aws cloudformation describe-stack-events --stack-name s3buckets` to view the status of the stack update
* Run `mv ./S3BucketsLabFiles/cat1.jpg ./S3BucketsLabFiles/cat1.jpg.backup` to backup the original file
* Run `mv ./S3BucketsLabFiles/cat2.jpg ./S3BucketsLabFiles//cat1.jpg` to replace the original file with the new file
* Run `ls ./S3BucketsLabFiles` to verify that the file changes are complete
* Run `aws s3 cp ./S3BucketsLabFiles/cat1.jpg s3://<public-bucket-name>` to add a new version of the file to the S3 bucket
* Run `aws s3api put-object-acl --bucket <public-bucket-name> --key cat1.jpg --acl public-read` to make the new version accessible
* Attempt to access the uploaded file at `https://<public-bucket-name>.s3.amazonaws.com/cat1.jpg` again and note the updated version of the object
* Run `aws s3api list-object-versions --bucket <public-bucket-name> --prefix cat1.jpg` to view the versions of the object
* Attempt to access the file at `https://<public-bucket-name>.s3.amazonaws.com/cat1.jpg?versionId=null` and note that the original version is still accessible
