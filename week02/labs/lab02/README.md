# Lab 02 - [Amazon GuardDuty](https://learn.acloud.guru/handson/f3a6e65f-261a-4337-816f-5875ed4dd3e7)

See https://docs.aws.amazon.com/guardduty/latest/ug/what-is-guardduty.html for additional information on Amazon GuardDuty.

* Use the provided ACG lab environment - this will be a manual configuration using the Management Console
* In the MC, navigate to `IAM` and click `Roles` to create a new role
* Make sure `AWS Service` is selected and choose `GuardDuty` from the service/use case dropdown; verify that `GuardDuty` is selected under "Use case"
* Click `Next`
* Expand the provided policy and review the policy definition. It seems overly broad - why do you think it's configured that way?
* Click `Next` and `Create role`
* Verify that the new role exists
* In a separate tab, navigate to `S3` to create a new bucket for housing the `GuardDuty` findings
* Click `Create bucket`; give your new bucket a unique name (you can use `guarddutyfindings-<initials>-<currentdate>`, making sure to use only lowercase letters, numbers, and dashes)
* Leave all other settings at their defaults and click `Create bucket`
* Once creation is complete, click the bucket link, click `Properties` and copy the bucket's ARN
* In a separate tab, navigate to `KMS` to create a new key for encrypting/decrypting `GuardDuty` findings detail that will be placed in the bucket
* Click `Create key`
* Review the settings (but leave at their defaults); click `Next`
* Give your new key a unique alias (you can include a combination of initials and/or current date)
* Click `Next`
* Under `Key administrators`, select `cloud_user`, `admin`, and search for `guardduty`; select the `GuardDuty` role as well
* Click `Next`
* Repeat for `Key users` and click `Next`
* Click `Finish`
* Once creation is complete, click the key link, and copy the key's ARN
* Leave tabs open for both `S3` and `KMS` as we will need to attach specific policies for `GuardDuty` to the bucket and key we created
* In a separate tab, navigate to `GuardDuty`
* Click `Get Started` and `Enable GuardDuty`
* Click `Settings` in the left menu
* Under `Frequency`, click `Edit` and update to `15 minutes`; click `Save changes`
* Under `S3 bucket`, click `Configure now`
* For `S3 bucket ARN`, paste in the ARN from the bucket copied in the earlier step
* For `KMS key ARN`, paste in the ARN from the key copied in the earlier step
* Under `Attach policy` and `S3 bucket`, click `View policy for S3 bucket`; click `Copy`
* In `S3`, find `Bucket policy` under your previously-created bucket's `Permissions` tab, click `Edit`, and paste in the policy
* Click `Save changes`
* Back in `GuardDuty`, under `Attach policy` and `KMS key`, click `View policy for KMS key`; click `Copy`
* In `KMS`, find `Key policy` under your previously-created key's settings, click `Switch to policy view`, and click `Edit`
* Under `Key policy`, find the last `}` before the closing `]`; add a comma, hit enter, and paste in the policy snippet copied from `GuardDuty`
* Click `Save changes`; review the resulting policy to ensure it is formatted correctly
* In `GuardDuty`, click `Save` to update the bucket and encryption configuration
* In `Settings`, under `Sample findings`, click `Generate sample findings`
* Navigate to `Findings` in the left menu to explore the types of information that `GuardDuty` will provide
* After a few minutes, you should be able to navigate to your previously-created bucket and drilldown into the findings details
* For a given object in the bucket, if you review the `Server-side encryption settings`, you should see your previously-created key being used for encrypting/decrypting the bucket objects
* There is also an API (https://docs.aws.amazon.com/pdfs/guardduty/latest/APIReference/guardduty-api.pdf) that can be used for programmatically integrating with `GuardDuty`
