# Lab 03 - [AWS SAM and Powertools](https://docs.powertools.aws.dev/lambda/python/latest/tutorial/)

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
1. Follow along with the tutorial steps outlined in the link provided above
1. **IMPORTANT NOTE: When bootstrapping the initial project, use the second link (the first link is for the finished product) and use `python3.9` for the runtime (instead of `python3.12` as Cloud9 currently comes configured with `3.9`)**
1. When running the `sam build && sam deploy --guided` step, you will be prompted with several configuration questions - you can use the defaults for all except the `HelloWorldFunction has no authentication. Is this okay?`; for that question, you'll want to select `y` for yes
1. When executing the steps in the section titled `Simplifying with Event Handler`, don't forget to update the `template.yaml` to add the second route (code available in the previous step)
1. For the query against CloudWatch, you can use:

```
fields @timestamp, location, message.path as path, message as response
| filter service=="APP"
| sort @timestamp asc
| limit 20
```

7. For the `Simplifying with Tracer` section, don't forget to update `template.yaml` along with `app.py` (see previous step for updates)
8. Similarly, for the `Simplifying with Metrics` section, make sure you include the `template.yaml` updates from the previous step
