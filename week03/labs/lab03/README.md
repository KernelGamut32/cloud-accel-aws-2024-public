# Lab 03 - [Serverless Java App with CDK](https://docs.aws.amazon.com/cdk/v2/guide/serverless_example.html)

**NOTE: Use an A Cloud Guru (ACG) AWS Playground for this lab**

**If you encounter "no space left on device issues", use https://ryansouthgate.com/aws-cloud9-no-space-left-on-device/#:~:text=There%E2%80%99s%20a%20few%20things%20we%20can%20tackle%20here%2C,clean%20up%20that%20much%20free%20space%20for%20me**

1. In the lab environment, create a new Cloud9 environment using the following steps:
    - Open `CloudShell` (in the upper right)
    - Clone this repository to `CloudShell` using `git clone https://github.com/KernelGamut32/cloud-accel-aws-2024-public.git`
    - Navigate to the root folder using `cd cloud-accel-aws-2024-public`
    - Execute the bash script to create a new Cloud9 environment using `./cloud9.sh '<env-name>' 't3.medium' 'amazonlinux-2023-x86_64' <sleep-time>` (replace `<env-name>` with your environment name and `<sleep-time>` with the targeted delay)
    - Close `CloudShell`
    - In the search bar, search for `Cloud9` (open in a new tab)
    - Click the radio button next to your environment and click `Open in Cloud9`
    - Execute the remaining instructions in the Cloud9 environment
1. In the provided terminal, clone this repository using `git clone https://github.com/KernelGamut32/cloud-accel-aws-2024-public.git`
1. Install Maven in Cloud9 using `sudo yum install maven -y`; upon completion, verify using `mvn --version`
1. Make sure that you are in the `~/environment` folder in the terminal and follow along with the instructions in the AWS tutorial using Java as the language
1. For the requested updates to `CdkHelloWorldApp.java`, use this code (instead of what's referenced in the tutorial); **make sure you save your changes**:

```
package com.myorg;

import software.amazon.awscdk.App;
import software.amazon.awscdk.Environment;
import software.amazon.awscdk.StackProps;

import java.util.Arrays;

public class CdkHelloWorldApp {
    public static void main(final String[] args) {
        App app = new App();

        new CdkHelloWorldStack(app, "CdkHelloWorldStack", StackProps.builder()
                .build());

        app.synth();
    }
}
```

6. For the requested updates to `CdkHelloWorldStack.java`, use this code (instead of what's referenced in the tutorial); **make sure you save your changes**:

```
package com.myorg;

import software.amazon.awscdk.services.lambda.Code;
import software.amazon.awscdk.services.lambda.Function;
import software.amazon.awscdk.services.lambda.Runtime;
import software.amazon.awscdk.services.apigateway.LambdaRestApi;
import software.amazon.awscdk.services.apigateway.Resource;
import software.amazon.awscdk.Stack;
import software.amazon.awscdk.StackProps;
import software.constructs.Construct;

public class CdkHelloWorldStack extends Stack {
    public CdkHelloWorldStack(final Construct scope, final String id) {
        this(scope, id, null);
    }

    public CdkHelloWorldStack(final Construct scope, final String id, final StackProps props) {
        super(scope, id, props);

        // Define the Lambda function resource
        Function helloWorldFunction = Function.Builder.create(this, "HelloWorldFunction")
                .runtime(Runtime.NODEJS_20_X)  // Choose any supported Node.js runtime
                .code(Code.fromAsset("src/main/resources/lambda")) // Points to the lambda directory
                .handler("hello.handler")  // Points to the 'hello' file in the lambda directory
                .build();
                
        // Define the API Gateway resource
        LambdaRestApi api = LambdaRestApi.Builder.create(this, "HelloWorldApi")
                .handler(helloWorldFunction)
                .proxy(false) // Turn off default proxy integration
                .build();

        // Define the '/hello' resource and its GET method
        Resource helloResource = api.getRoot().addResource("hello");
        helloResource.addMethod("GET");
    }
}
```
