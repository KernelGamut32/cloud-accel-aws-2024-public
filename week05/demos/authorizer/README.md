# DEMO - [Lambda Authorizer](https://aws.amazon.com/blogs/opensource/creating-a-custom-lambda-authorizer-using-open-policy-agent/)

**NOTE: Use an A Cloud Guru (ACG) AWS Playground for this lab**

**If you encounter "no space left on device issues", use https://ryansouthgate.com/aws-cloud9-no-space-left-on-device/#:~:text=There%E2%80%99s%20a%20few%20things%20we%20can%20tackle%20here%2C,clean%20up%20that%20much%20free%20space%20for%20me**

See https://www.alexdebrie.com/posts/lambda-custom-authorizers/ for additional information.

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
1. The Cloud9 environment should come with Go preinstalled so no need to execute explicitly
1. From the `~/environment` root folder, clone the class repository using `git clone https://github.com/KernelGamut32/cloud-accel-aws-2024-public.git`
1. Navigate to the demo folder using `cd ~/environment/cloud-accel-aws-2024-public/week05/demos/authorizer/cdk-opa-blog`
1. Review the various source files provided in the demo project (both the Lambda and the custom authorizer)
1. Execute `npm install`
1. Run `cdk bootstrap` in the terminal to bootstrap the CDK environment
1. If you run into any issues running `cdk bootstrap`, execute the following steps:
    - Click the "Cloud9" logo in the upper left corner of the IDE and click "Preferences"
    - Click "AWS Settings" and uncheck "AWS managed temporary credentials"
    - In the Cloud9 terminal, run `aws configure` and set access key ID (from ACG credentials), secret access key (from ACG credentials), and default region (`us-east-1`)
    - Run `cdk bootstrap` again and confirm completes successfully
1. Navigate to the Go authorizer folder using `cd ~/environment/cloud-accel-aws-2024-public/week05/demos/authorizer/cdk-opa-blog/opaCustomGoAuthorizer`
1. From that folder, run `go mod tidy`
1. From that folder, run `GOOS=linux GOARCH=amd64 go build -o bootstrap main.go`
1. Navigate back to the project root using `cd ..`
1. Run `cdk deploy` to deploy the AWS resources
1. Use the following requests to test the authorizer:

```
curl --location --request GET 'HelloAPIURL_FROM_OUTPUT' \
--header 'usergroup: ViewerGroup' \
--header 'resource: record1'
```

```
curl --location --request GET 'HelloAPIURL_FROM_OUTPUT' \
--header 'usergroup: ViewerGroup' \
--header 'resource: record_secret'
```

```
curl --location --request GET 'HelloAPIURL_FROM_OUTPUT' \
--header 'usergroup: AdminGroup' \
--header 'resource: record_secret'
```

15. Run `cdk destroy` to cleanup the AWS resources
