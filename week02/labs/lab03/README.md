# Lab 04 - https://learn.acloud.guru/handson/c084edc8-8e1f-4dfe-9c89-237a229f61d0

NOTE: Walk through diagram at https://aws.amazon.com/security-hub/

* Will be focusing on one region but AWS Security Hub is a multi-region service and can aggregate findings from multiple regions into a single pane of glass
* Navigate to "Config" (AWS Config) and setup "one click setup" to record all resources
* Navigate to settings to confirm that recording is "On"
* Navigate to S3 (in separate tab) to see bucket created for Config recordings
* Navigate to AWS Security Hub and enable it
* Note warnings/notes about amount of time required to receive a "grade"
* After about 5 minutes, explore critical findings uncovered
* Create a VPC
    - Select "VPC and more"
    - Accepting defaults are not really a security best practice - have to be vigilant and intentional about security
    - For the lab, however, we will use defaults
    - Notice the "Details" displayed for the newly created VPC
* Create a new EC2 instance
    - Amazon Linux 2 AMI
    - Provide a name
    - Set type to `t3.micro`
    - Don't need a keypair - notice allow SSH from "Anywhere" (leave in place)
    - Launch instance
* Create a security group
    - Add inbound rule of SSH from "Anywhere"
    - Create group
* Create a new S3 bucket
    - Use unique name
    - By default, blocks all public access; turn off the block
    - Create bucket
* Go back to Security Hub
    - Notice that the newly created resources (purposefully created with security issues) are now showing findings (after about 5 minutes)
    - Aggregates across multiple accounts and regions and tools in AWS
    - Note that this is more of a reactive approach
    - To be more proactive, we can create a "hardened" CloudFormation template that automatically includes all security best practices as part of its definition
    - Toggle block public access for the S3 bucket and, after about 5 minutes, notice that the finding is now resolved
    - Use `Severity (label)` of `CRITICAL` and `Severity (label)` of `HIGH` to initially filter findings
    - After resolving issues, clear filter and use `Compliance status` of `PASSED` to see resolved issues (it may take a few minutes for the resolved issues to show up)
