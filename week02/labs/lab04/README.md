# Lab 04 - [AWS CodePipeline](https://aws.amazon.com/blogs/devops/new-fine-grained-continuous-delivery-with-codepipeline-and-aws-stepfunctions/)

**NOTE: Use an A Cloud Guru (ACG) AWS Playground for this lab**

**If you encounter "no space left on device issues", use https://ryansouthgate.com/aws-cloud9-no-space-left-on-device/#:~:text=There%E2%80%99s%20a%20few%20things%20we%20can%20tackle%20here%2C,clean%20up%20that%20much%20free%20space%20for%20me**

* In the lab environment, create a new Cloud9 environment by navigating to the Cloud9 console and clicking `Create environment` (or reuse a previously-created environment)
    - Specify a name for the environment
    - Select `t3.small` for instance type
    - Leave all other options at their defaults, and click `Create`
    - Click the radio button next to your Cloud9 environment and click `Open in Cloud9` (it may take a few seconds for the environment to come up)
* In the provided terminal, clone this repository using `git clone https://github.com/KernelGamut32/cloud-accel-aws-2024-public.git`
* In the project view on the left, navigate to the week 02/lab 04 folder and open `buildspec.yaml` to review the simple CI/CD pipeline definition
* Create a new S3 bucket for storage of the provided `buildspec.yaml` file using `aws s3 mb s3://<bucket-name>`
* Copy the provided `source.zip` file (which contains the `buildspec.yaml` file) to the newly created bucket using `aws s3 cp ./cloud-accel-aws-2024-public/week02/labs/lab04/source.zip s3://<bucket-name>`; in this case, our "source code" is very, very minimal (but it could include more)
* In the project view on the left, navigate to the week 02/lab 04 folder and open `inputs.json`
  - Update the `BuildSpecBucketName` parameter value to the name of the bucket you created in the previous step
  - Update the `EngineeringApprovalTeamAlias` parameter value to an email address that you have access to
  - Update the `ResearchApprovalTeamAlias` parameter value to an email address that you have access to
  - **Save your changes**
* In the project view on the left, navigate to the week 02/lab 04 folder and open `resources.yaml` to review the template definition
* Package the resources for deployment using `aws cloudformation package --template-file ./cloud-accel-aws-2024-public/week02/labs/lab04/resources.yaml --s3-bucket <bucket-name> --output-template-file ./cloud-accel-aws-2024-public/week02/labs/lab04/workflow-template.yaml`
* In the project view on the left, navigate to the week 02/lab 04 folder and open `workflow-template.yaml` to review the template definition
* Deploy the approval step function using `aws cloudformation deploy --parameter-overrides file://./cloud-accel-aws-2024-public/week02/labs/lab04/inputs.json --template-file ./cloud-accel-aws-2024-public/week02/labs/lab04/workflow-template.yaml --stack-name approval-pipeline --capabilities CAPABILITY_IAM`
* Review all resources created via CFT:
  - Bucket that ends in `-capdelta`
  - Roles created for CodePipeline and CodeBuild
  - CodeCommit repository
  - CodeBuild project and CodePipeline pipeline
  - Notifier Lambda
  - The Step Functions state machine
  - API Gateway used to process approval or rejection in the pipeline flow
* Navigate to the Simple Email Service and add two **different** email addresses that you have access to under `Identities`
* Access the email sent to those addresses to verify
* To test the pipeline, create a `results.json` file in the `main` branch of the CodeCommit repo; use the following contents for the file to test the engineering approval route

```
{
  "accuracypct": 100,
  "latencyMs": 225
}
```

* Update the `results.json` file in the `main` branch of the CodeCommit repo; use the following contents for the file to test the research approval route

```
{
  "accuracypct": 89,
  "latencyMs": 75
}
```

* Observe the build progress in CodePipeline and select different combinations of `PASS` or `FAIL` to see the processing (you may need to check junk or spam for the approval emails)
