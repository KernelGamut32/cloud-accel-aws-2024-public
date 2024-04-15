# Lab 01 - [Orchestrating Lambda Using Step Functions](https://learn.acloud.guru/handson/c262c886-cd93-4a0c-bda8-a2453c44f38e)

**For this lab, we will be following along (mostly) with the ACG lab Guide. This will give us a chance to see how the individual pieces of the workflow are created (vs. pure automation). Ultimately, this should be built out into a CDK project that can be used to automatically generate all required resources. We will see that in upcoming labs.**

1. Start the ACG lab - when lab startup is complete, open the lab environment in an incognito browser
1. For the `Grant Functions Access to S3` step, instead of creating the policy through one of the Lambda roles, create the policy as a separate step and then attach the policy to each function role
1. Other than that, all defined steps in the guide with the lab should be executable as defined
