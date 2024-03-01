# Lab 04 - [AWS CodePipeline](https://aws.amazon.com/blogs/devops/new-fine-grained-continuous-delivery-with-codepipeline-and-aws-stepfunctions/)

**NOTE: Use an A Cloud Guru (ACG) AWS Playground for this lab**

**If you encounter "no space left on device issues", use https://ryansouthgate.com/aws-cloud9-no-space-left-on-device/#:~:text=There%E2%80%99s%20a%20few%20things%20we%20can%20tackle%20here%2C,clean%20up%20that%20much%20free%20space%20for%20me**

* In the lab environment, create a new Cloud9 environment by navigating to the Cloud9 console and clicking `Create environment` (or reuse a previously-created environment)
    - Specify a name for the environment
    - Leave all other options at their defaults, and click `Create`
    - Click the radio button next to your Cloud9 environment and click `Open in Cloud9` (it may take a few seconds for the environment to come up)
* In the provided terminal, clone this repository using `git clone https://github.com/KernelGamut32/cloud-accel-aws-2024-public.git`
* In the project view on the left, navigate to the week 02/lab 04 folder and open `buildspec.yaml` to review the simple CI/CD pipeline definition
* Create a new S3 bucket for storage of the provided `buildspec.yaml` file using `aws s3 mb s3://<bucket-name>`
* Copy the provided `source.zip` file (which contains the `buildspec.yaml` file) to the newly created bucket using `aws s3 cp ./cloud-accel-aws-2024-public/week02/labs/lab04/source.zip s3://<bucket-name>`
* In the project view on the left, navigate to the week 02/lab 04 folder and open `inputs.json`; update the parameter value to the name of the bucket you created in the previous step and **save your changes**
* In the project view on the left, navigate to the week 02/lab 04 folder and open `codepipeline.yaml` to review the template definition
* Push the CloudFormation template to AWS using `aws cloudformation create-stack --stack-name code-pipeline-lab --parameters file://./cloud-accel-aws-2024-public/week02/labs/lab04/inputs.json --template-body file://./cloud-accel-aws-2024-public/week02/labs/lab04/codepipeline.yaml --capabilities CAPABILITY_IAM`
* Run `aws cloudformation describe-stack-events --stack-name code-pipeline-lab` to view the status of the stack creation
* In the project view on the left, navigate to the week 02/lab 04 folder and open `workflow-template.yaml` to review the template definition
* Deploy the approval step function using `aws cloudformation deploy --template-file ./cloud-accel-aws-2024-public/week02/labs/lab04/workflow-template.yaml --stack-name approval-step-function --capabilities CAPABILITY_IAM`
* Run `aws cloudformation describe-stack-events --stack-name approval-step-function` to view the status of the stack creation
* Navigate to the Simple Email Service instance created by the CFT and add two **different** email addresses that you have access to under `Verified Identities`
* Access the email sent to those addresses to verify
* In the MC, navigate to the approval Step Function and click "Edit"
* Click the "EngineeringApproval" state, scroll down to "Payload" section; update `team_alias` and `sender` values to the two different email addresses

![EngineeringApproval Updates](eng-approval-updates.png "EngineeringApproval Updates")

* Repeat the same step for the "ResearchApproval" state

![ResearchApproval Updates](res-approval-updates.png "ResearchApproval Updates")

* Pick up from the remaining instructions outlined in the provided lab URL to inject the approval step function into the CodePipeline; when instructed to select an input artifact, use `SourceArtifact` (in reality, you would likely be using the results of the build process but our build process here is minimal)
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
