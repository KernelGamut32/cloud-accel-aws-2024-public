# Lab 03 - [AWS Security Hub](https://learn.acloud.guru/handson/c084edc8-8e1f-4dfe-9c89-237a229f61d0)

See https://aws.amazon.com/security-hub/ for additional information on AWS Security Hub.

1. Use the provided ACG lab environment - this will be a manual configuration using the Management Console
2. We will be focusing on one region but AWS Security Hub is a multi-region service and can aggregate findings from multiple regions into a single pane of glass
3. Navigate to `Config` (AWS Config) and click `1-click setup` to record all resources; click `Confirm`
4. Navigate to `Settings` to confirm that recording is `on`
5. In a separate tab, navigate to `S3` to see the bucket created for config recordings (name likely starts with `config-bucket`)

Let's create some "insecure" resources:

6. Create a new VPC
    <ol type="a">
    <li>In a separate tab, navigate to `VPC` and click `Create VPC`</li>
    <li>Select `VPC and more`</li>
    <li>Accepting defaults are not really a security best practice - you have to be vigilant and intentional about security</li>
    <li>For this lab, leave all settings at the defaults and clicke `Create VPC`</li>
    <li>Once complete, click `View VPC` to explore the configuration</li>
    </ol>
7. Create a new EC2 instance
    <ol type="a">
    <li>In a separate tab, navigate to `EC2` and click `Launch instance`</li>
    <li>Give your instance a name and leave all other settings at the defaults</li>
    <li>We will not need a keypair as we won't actually be connecting to this instance - select `Proceed without a key pair (Not recommended)`</li>
    <li>Notice that the security group configuration allows SSH traffic to the EC2 instance from `Anywhere`</li>
    <li>Click `Launch instance`</li>
    </ol>
8. Create a new security group
    <ol type="a">
    <li>In a separate tab, navigate to `Security groups` and click `Create security group`</li>
    <li>Give your new security group a unique name and a description</li>
    <li>Under `VPC`, select your previously-created VPC</li>
    <li>Under `Inbound rules` click `Add rule`</li>
    <li>Use `RDP` for `Type` and use `Anywhere-IPv4` for `Source`</li>
    <li>Click `Create security group`</li>
    </ol>
9. Create a new S3 bucket
    <ol type="a">
    <li>In a separate tab, navigate to `S3` and click `Create bucket`</li>
    <li>Give your bucket a unique name using a combination of initials and current date (make sure you only use lowercase letters, numbers, and dashes)</li>
    <li>Uncheck `Block all public access`, click the acknowledgment, and click `Create bucket`</li>
    <li>Use unique name</li>
    <li>By default, blocks all public access; turn off the block</li>
    <li>Create bucket</li>
    </ol>
10. Return to the `Security Hub` tab
    <ol type="a">
    <li>Click `Conformance packs` and click `Deploy conformance pack`</li>
    <li>Make sure `Use sample template` is selected, pick `Operational Best Practices for NIST 800 181` from the `Sample template` dropdown, and click `Next`</li>
    <li>Give your conformance pack a distinguishable name and click `Next`</li>
    <li>Click `Deploy conformance pack`</li>
    <li>When deployment completes, click `View`</li>
    <li>After a few minutes, notice that the newly-created resources (purposefully created with security issues) begin showing findings - you may need to refresh the view</li>
    <li>Under `Dashboard`, `Compliance status`, and `Resources`, click the link for the identified non-compliant resources; explore</li>
    <li>Click `Rules` and set `Filter by compliance status` dropdown to `Noncompliant`; explore</li>
    <li>In `S3`, update your previously-created bucket - edit `Block public access` settings under `Permissions`</li>
    <li>Check `Block all public access` and click `Save changes`; confirm in the requested dialog</li>
    <li>After a few minutes, check compliance status for the related rule again to see that it now shows `Compliant`; use the provided dropdown to quickly filter by `Compliant` vs. `Noncompliant`</li>
    </ol>

This tool will aggregates across multiple accounts, regions, and tools in AWS. Note that this is more of a reactive approach. To be more proactive, we can create a "hardened" CloudFormation template or CDK library that automatically includes all security best practices as part of its definition.
