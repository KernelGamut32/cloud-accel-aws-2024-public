# Lab 03 - [AWS SAM and Powertools](https://docs.powertools.aws.dev/lambda/python/latest/tutorial/)

**NOTE: Use an A Cloud Guru (ACG) AWS Playground for this lab**

**If you encounter "no space left on device issues", use https://ryansouthgate.com/aws-cloud9-no-space-left-on-device/#:~:text=There%E2%80%99s%20a%20few%20things%20we%20can%20tackle%20here%2C,clean%20up%20that%20much%20free%20space%20for%20me**

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
