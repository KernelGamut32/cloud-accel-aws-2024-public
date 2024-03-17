# DEMO - Aspects and Config

**NOTE: Use an A Cloud Guru (ACG) AWS Playground for this lab**

**If you encounter "no space left on device issues", use https://ryansouthgate.com/aws-cloud9-no-space-left-on-device/#:~:text=There%E2%80%99s%20a%20few%20things%20we%20can%20tackle%20here%2C,clean%20up%20that%20much%20free%20space%20for%20me**

See https://blog.jannikwempe.com/mastering-aws-cdk-aspects and https://www.rehanvdm.com/blog/4-methods-to-configure-multiple-environments-in-the-aws-cdk for additional information.

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
* Clone the following repo to your Cloud9 environment in `~/environment` using `git clone https://github.com/KernelGamut32/cdk-aspects-examples.git`
* Navigate to target folder using `cd cdk-aspects-examples`
* Run `npm install` to install the required dependencies
* Run `cdk bootstrap` to bootstrap the CDK environment
* Navigate to `/cdk-aspects-examples/src/aspects/enforce-minimum-lambda-node-runtime-version.ts` to review the aspect code
* Navigate to `/cdk-aspects-examples/bin/cdk-aspects-examples.ts` and uncomment line 34; **save your changes**
* Run `cdk synth` to view the template that will be generated for the CDK stack
* Navigate to `/cdk-aspects-examples/lib/my-stack.ts` change line 28 to `runtime: Runtime.NODEJS_12_X,`; **save your changes**
* Run `cdk synth` again and observe the error; change line 28 back to `runtime: Runtime.NODEJS_16_X,`; **save your changes**
* Navigate to `/cdk-aspects-examples/cdk.json` and add the following to the end of the `context` section: `"timeout": 15`; **save your changes**
* Navigate to `/cdk-aspects-examples/bin/cdk-aspects-examples.ts` and change line 15 to `new MyStack(app, 'MyStack', app.node.tryGetContext('timeout'));`; **save your changes**
* Navigate to `/cdk-aspects-examples/lib/my-stack.ts` and change line 14 to `constructor(scope: Construct, id: string, timeout: number, props?: cdk.StackProps) {`; **save your changes**
* Add the following after line 28: `timeout: Duration.seconds(timeout),`; **save your changes**
* Rerun `cdk synth` and observe the change in the template at `/cdk-aspects-examples/cdk.out/MyStack.template.json` (search for `Timeout` and observe the timeout value under the `MyLambda1` resource definition)
* Modify the `timeout` entry in `cdk.json` and rerun `cdk synth` to see the impact
