# Lab 02 - [Amazon GuardDuty](https://learn.acloud.guru/handson/f3a6e65f-261a-4337-816f-5875ed4dd3e7)

See https://docs.aws.amazon.com/guardduty/latest/ug/what-is-guardduty.html for additional information on Amazon GuardDuty.

1. Use the provided ACG lab environment - this will be a manual configuration using the Management Console
1. In the MC, navigate to `IAM` and click `Roles` to create a new role
1. Make sure `AWS Service` is selected and choose `GuardDuty` from the service/use case dropdown; verify that `GuardDuty` is selected under "Use case"
1. Click `Next`
1. Expand the provided policy and review the policy definition. It seems overly broad - why do you think it's configured that way?
1. Click `Next` and `Create role`
1. Verify that the new role exists
1. In a separate tab, navigate to `S3` to create a new bucket for housing the `GuardDuty` findings
1. Click `Create bucket`; give your new bucket a unique name (you can use `guarddutyfindings-<initials>-<currentdate>`, making sure to use only lowercase letters, numbers, and dashes)
1. Leave all other settings at their defaults and click `Create bucket`
1. Once creation is complete, click the bucket link, click `Properties` and copy the bucket's ARN
1. In a separate tab, navigate to `KMS` to create a new key for encrypting/decrypting `GuardDuty` findings detail that will be placed in the bucket
1. Click `Create key`
1. Review the settings (but leave at their defaults); click `Next`
1. Give your new key a unique alias (you can include a combination of initials and/or current date)
1. Click `Next`
1. Under `Key administrators`, select `cloud_user`, `admin`, and search for `guardduty`; select the `GuardDuty` role as well
1. Click `Next`
1. Repeat for `Key users` and click `Next`
1. Click `Finish`
1. Once creation is complete, click the key link, and copy the key's ARN
1. Leave tabs open for both `S3` and `KMS` as we will need to attach specific policies for `GuardDuty` to the bucket and key we created
1. In a separate tab, navigate to `GuardDuty`
1. Click `Get Started` and `Enable GuardDuty`
1. Click `Settings` in the left menu
1. Under `Frequency`, click `Edit` and update to `15 minutes`; click `Save changes`
1. Under `S3 bucket`, click `Configure now`
1. For `S3 bucket ARN`, paste in the ARN from the bucket copied in the earlier step
1. For `KMS key ARN`, paste in the ARN from the key copied in the earlier step
1. Under `Attach policy` and `S3 bucket`, click `View policy for S3 bucket`; click `Copy`
1. In `S3`, find `Bucket policy` under your previously-created bucket's `Permissions` tab, click `Edit`, and paste in the policy
1. Click `Save changes`
1. Back in `GuardDuty`, under `Attach policy` and `KMS key`, click `View policy for KMS key`; click `Copy`
1. In `KMS`, find `Key policy` under your previously-created key's settings, click `Switch to policy view`, and click `Edit`
1. Under `Key policy`, find the last `}` before the closing `]`; add a comma, hit enter, and paste in the policy snippet copied from `GuardDuty`
1. Click `Save changes`; review the resulting policy to ensure it is formatted correctly
1. In `GuardDuty`, click `Save` to update the bucket and encryption configuration
1. In `Settings`, under `Sample findings`, click `Generate sample findings`
1. Navigate to `Findings` in the left menu to explore the types of information that `GuardDuty` will provide
1. After a few minutes, you should be able to navigate to your previously-created bucket and drilldown into the findings details
1. For a given object in the bucket, if you review the `Server-side encryption settings`, you should see your previously-created key being used for encrypting/decrypting the bucket objects
1. There is also an API (https://docs.aws.amazon.com/pdfs/guardduty/latest/APIReference/guardduty-api.pdf) that can be used for programmatically integrating with `GuardDuty`
