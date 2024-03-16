# Lab 03 - [Serverless Java App with CDK](https://docs.aws.amazon.com/cdk/v2/guide/serverless_example.html)

**NOTE: Use an A Cloud Guru (ACG) AWS Playground for this lab**

**If you encounter "no space left on device issues", use https://ryansouthgate.com/aws-cloud9-no-space-left-on-device/#:~:text=There%E2%80%99s%20a%20few%20things%20we%20can%20tackle%20here%2C,clean%20up%20that%20much%20free%20space%20for%20me**

* In the lab environment, create a new Cloud9 environment by navigating to the Cloud9 console and clicking `Create environment` (or reuse a previously-created environment)
    - Specify a name for the environment
    - Select `t3.small` for instance type
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
* Make sure that you are in the `~/environment` folder in the terminal and follow along with the instructions in the AWS tutorial using Java as the language
* Install Maven in Cloud9 using `sudo yum install maven`; upon completion, verify using `mvn --version`
* For the "Create a Lambda function to list all widgets" step, use the contents of the provided `cloud-accel-aws-2024-public/week03/labs/lab03/step01.widgets.js` for the `widgets.js` file at this step
* For the "Create a widget service" step, use the contents of the provided `cloud-accel-aws-2024-public/week03/labs/lab03/step02.WidgetService.java` for the `WidgetService.java` file at this step
* When testing the initial GET operation of the API use the API Gateway service in the AWS Management Console
* For the "Add the individual widget functions" step, use the contents of the provided `cloud-accel-aws-2024-public/week03/labs/lab03/step03.widgets.js` for the `widgets.js` file at this step
* Use the contents of the provided `cloud-accel-aws-2024-public/week03/labs/lab03/step04.WidgetService.java` for the `WidgetService.java` file at this step
* As before, use the API Gateway service to run the tests - make sure that the `Test` interface in API Gateway shows the `id` value for input (you can do this by clicking `Method response` and then clicking back to `Test`)
