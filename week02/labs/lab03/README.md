# Lab 03 - [AWS Security Hub](https://learn.acloud.guru/handson/c084edc8-8e1f-4dfe-9c89-237a229f61d0)

See https://aws.amazon.com/security-hub/ for additional information on AWS Security Hub.

* Use the provided ACG lab environment - this will be a manual configuration using the Management Console
* We will be focusing on one region but AWS Security Hub is a multi-region service and can aggregate findings from multiple regions into a single pane of glass
* Navigate to `Config` (AWS Config) and click `1-click setup` to record all resources; click `Confirm`
* Navigate to `Settings` to confirm that recording is `on`
* In a separate tab, navigate to `S3` to see the bucket created for config recordings (name likely starts with `config-bucket`)

Let's create some "insecure" resources:

* Create a new VPC
    - In a separate tab, navigate to `VPC` and click `Create VPC`
    - Select `VPC and more`
    - Accepting defaults are not really a security best practice - you have to be vigilant and intentional about security
    - For this lab, leave all settings at the defaults and clicke `Create VPC`
    - Once complete, click `View VPC` to explore the configuration
* Create a new EC2 instance
    - In a separate tab, navigate to `EC2` and click `Launch instance`
    - Give your instance a name and leave all other settings at the defaults
    - We will not need a keypair as we won't actually be connecting to this instance - select `Proceed without a key pair (Not recommended)`
    - Notice that the security group configuration allows SSH traffic to the EC2 instance from `Anywhere`
    - Click `Launch instance`
* Create a new security group
    - In a separate tab, navigate to `Security groups` and click `Create security group`
    - Give your new security group a unique name and a description
    - Under `VPC`, select your previously-created VPC
    - Under `Inbound rules` click `Add rule`
    - Use `RDP` for `Type` and use `Anywhere-IPv4` for `Source`
    - Click `Create security group`
* Create a new S3 bucket
    - In a separate tab, navigate to `S3` and click `Create bucket`
    - Give your bucket a unique name using a combination of initials and current date (make sure you only use lowercase letters, numbers, and dashes)
    - Uncheck `Block all public access`, click the acknowledgment, and click `Create bucket` 
    - Use unique name
    - By default, blocks all public access; turn off the block
    - Create bucket
* Return to the `Security Hub` tab
    - Click `Conformance packs` and click `Deploy conformance pack`
    - Make sure `Use sample template` is selected, pick `Operational Best Practices for NIST 800 181` from the `Sample template` dropdown, and click `Next`
    - Give your conformance pack a distinguishable name and click `Next`
    - Click `Deploy conformance pack`
    - When deployment completes, click `View`
    - After a few minutes, notice that the newly-created resources (purposefully created with security issues) begin showing findings - you may need to refresh the view
    - Under `Dashboard`, `Compliance status`, and `Resources`, click the link for the identified non-compliant resources; explore
    - Click `Rules` and set `Filter by compliance status` dropdown to `Noncompliant`; explore
    - In `S3`, update your previously-created bucket - edit `Block public access` settings under `Permissions`
    - Check `Block all public access` and click `Save changes`; confirm in the requested dialog
    - After a few minutes, check compliance status for the related rule again to see that it now shows `Compliant`; use the provided dropdown to quickly filter by `Compliant` vs. `Noncompliant`

This tool will aggregates across multiple accounts, regions, and tools in AWS. Note that this is more of a reactive approach. To be more proactive, we can create a "hardened" CloudFormation template or CDK library that automatically includes all security best practices as part of its definition.
