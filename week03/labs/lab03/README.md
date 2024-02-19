# Lab 03 - https://docs.aws.amazon.com/cdk/v2/guide/serverless_example.html

**NOTE: Use the same AWS sandbox used with Lab 01**

**If you encounter "no space left on device issues", use https://ryansouthgate.com/aws-cloud9-no-space-left-on-device/#:~:text=There%E2%80%99s%20a%20few%20things%20we%20can%20tackle%20here%2C,clean%20up%20that%20much%20free%20space%20for%20me**

Follow along with the instructions in the AWS tutorial using Java as the language in a Cloud9 environment in an ACG sandbox.

* If using same Cloud9 environment used with the previous labs, run `cd ~/environment` before executing any commands
* Install maven using `sudo yum install -y maven` in the Cloud9 terminal
* Run `cdk bootstrap` to bootstrap the environment
* **Sample file for `WidgetService.java` is missing a parenthesis at the end of line 27**
* Use the provided `widgets.js` file contents for the corresponding step
* Use the provided `WidgetService.java` file contents for the corresponding step
* Use the provided `curl` statements to test - note that a `GET` request will return an error if a specific widget key is not provided or if the widget key does not exist
* You can also navigate the S3 bucket to view the contents of the corresponding folder as you execute `POST` or `DELETE` requests
