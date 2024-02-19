# Lab 02 - https://learn.acloud.guru/handson/e4e6a251-06af-4046-992b-84f0ece1d3fb

Review/highlight https://docs.aws.amazon.com/AmazonS3/latest/userguide/UsingEncryption.html and https://www.encryptionconsulting.com/amazon-s3-simple-storage-service-encryption-at-a-glance#:~:text=CMK%2C%20using%20the%20encryption%20algorithm%20%28AES-256%29%2C%20creates%20two,encrypted%20data%20key%20is%20then%20stored%20in%20S3. for additional information. 

* Locate S3 service and create a new bucket
    - Use `mytestbucket-<random characters>` for bucket name
    - Leave region as is
    - Note that server-side encryption (under "Default encryption") is enabled by default
    - Select `Server-side encryption with AWS Key Management Service keys` for encryption type
    - Click `Choose from your AWS KMS keys`, and choose`aws/s3` (see https://repost.aws/knowledge-center/s3-encrypt-specific-folder for information on `aws/s3` default key)
    - Leave all other defaults and click "Create bucket"
    - Master key stored in KMS - used to encrypt data key (which gets stored in S3 with data)
    - Navigate to KMS and explore (in a new tab)
        * Look for `aws/s3` in `AWS managed keys` (see https://docs.aws.amazon.com/AmazonS3/latest/userguide/configuring-bucket-key.html for more information on `aws/s3` default key)
        * Add file to S3 bucket using bucket policy
        * Navigate to object and review "server-side" settings (review KMS master key ARN); verify that this ARN represents the `aws/s3` key
    - Create our own master key
        * In KMS, navigate to "customer managed keys" and create new symmetric key
        * Add alias - "my_s3_key"
        * Select `cloud_user` and `admin` as "Key administrators" and click "Next"
        * Select `cloud_user` and `admin` as "Key users" and click "Next"
        * Leave all other defaults
        * Review key policy
        * Click "Finish"
    - Add new file to S3 bucket
        * Upload a different file
        * Under "Properties" and "Server-side encryption", notice that "Do not specify an encryption key" is selected; this will use bucket default
        * After upload, review uploaded document and show that still using `aws/s3`
        * Edit "server-side encryption settings" for bucket, select "override", select "Choose from your AWS KMS keys", and select "my_s3_key" for "choose from your KMS master keys"
        * Click "Save changes"
        * Review new KMS master key ARN under server-side encryption settings for uploaded document
        * Verify that the ARN matches `my_s3_key` in KMS
