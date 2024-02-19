# Lab 03 - https://learn.acloud.guru/handson/f3a6e65f-261a-4337-816f-5875ed4dd3e7

**NOTE: See https://docs.aws.amazon.com/guardduty/latest/ug/what-is-guardduty.html for additional information on Amazon GuardDuty.**

* Create a GuardDuty role to allow for integration with other AWS services
    - Navigate to IAM
    - Create a new role under "Roles"
    - Choose "AWS Service" and select "GuardDuty" as the service that will use this role
    - Review default policy applied
    - Leave all other defaults and create new role
    - Search for new role using "GuardDuty" as search string, review role details (including maximum session duration) - remember roles are intended to be temporary
* Configure an S3 bucket for GuardDuty to export to
    - Navigate to GuardDuty landing page and choose "Get Started"
    - Enable GuardDuty
    - Navigate to "Settings"
        * Review service roles (matches to role just created)
        * Configure "findings export options" using "Configure now"
        * Change 6 hours update to 15 minutes (more granular to help see issues) for "Frequency"
        * Configure the S3 bucket for findings; use "New bucket" with a name of `guardduty<randomnumbers>`
        * Create a prefix called `/findings` for hierarchical organization of results
        * Click "Go to KMS console to create a new key" and create a key (in a new tab in KMS)
        * Create a symmetric key, review advanced options (leave defaults)
        * Give key name of `guarddutyfindings`, click "Next"
        * Add "cloud_user", "admin", and GuardDuty role as key administrators
        * Do same for key usage permissions
        * Update key policy to allow GuardDuty to use the key
            - Go back to GuardDuty screen, click "View Policy", and copy the policy detail (select all)
            - Paste into the key policy, appending to the existing policy (within [] collection)
            - Click "Finish"
        * Refresh S3 bucket settings (click refresh icon) in GuardDuty and select "guarddutyfindings" key
        * Click "Save"
* Generate sample findings and confirm
    - Click "Generate sample findings" and navigate to "Findings" to view data
    - Notice the different severities
    - Review details of first item and available options, action, actors, etc.
    - Check different severity levels in GuardDuty
    - Navigate to S3 bucket and review contents (it may take a couple of minutes)
    - Drill into the hierarchy to see the data
