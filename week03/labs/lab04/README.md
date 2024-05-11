# Lab 04 - [Aurora Serverless with Lambda](https://learn.acloud.guru/handson/cdc003fa-1484-4707-bba4-0ea1e9039339)

Follow along with the "Guide" tab in the ACG lab definition. In this lab, you will use the environment created by the lab rather than Cloud9 since we need some pre-existing resources the lab environment provides.

1. For the "Create a Lambda Function" step, use the following instead for Lambda creation (Python 3.7 no longer valid)

```
aws lambda create-function \
--memory-size 512  \
--function-name pymysql-function \
 --runtime python3.12 \
--handler pymysql_lambda.lambda_handler \
--zip-file fileb://pymysql_function.zip \
--role "<ROLE_ARN>" \
--region us-east-1
```
2. To find the `<ROLE_ARN>`, click the right arrow on the A Cloud Guru lab page to see definition of the role
3. For the "Create Lambda Layer with Provided Zipped Python Library" step, we need to adjust to get an up-to-date version of the `pymysql` dependency:
    <ol type="a">
    <li>From the `~/exercise_files/Section5-BackendLayer` folder, run `mkdir -p python`
    <li>Execute `cd python`
    <li>Execute `pip3 install --target . --python-version 3.12 --only-binary=:all: pymysql`
    <li>Execute `cd ..` and run `zip -r pymysql.zip python`
    <li>For the step in the lab, use this instead `aws lambda publish-layer-version --layer-name pymysql-layer --zip-file fileb:///home/cloud_user/exercise_files/Section5-BackendLayer/pymysql.zip --compatible-runtimes python3.12 --region us-east-1`
    </ol>
4. Continue with the lab steps
5. When instructed to configure the RDS instance to use "Burstable classes (includes t classes)", use `db.t3.medium` instead of the recommended `db.t3.small` (as you'll likely not be able to find the instance class called out by the lab)
6. **NOTE: It may take several minutes for the RDS instance to be created (approx 5 - 10 minutes)**
7. Wait until the Lambda update operation for adding VPC and subnets is complete before updating the Lambda code to reference the RDS instance
8. After completion of regular lab, from the same SSH session:
    <ol type="a">
    <li>Execute nano ~/exercise_files/Section5-BackendLayer/pymysql_lambda.py in the terminal</li>
    <li>Copy the contents of the provided cloud-accel-aws-2024-public/week03/labs/lab04/pymysql_lambda_update.py into the file, replacing what is currently there; don't forget to reset the RDS endpoint, username, and password</li>
    <li>From the ~/exercise_files/Section5-BackendLayer folder, create a new zip file using zip new_function_code.zip pymysql_lambda.py</li>
    <li>Execute aws lambda update-function-code --function-name pymysql-function --zip-file fileb:///home/cloud_user/exercise_files/Section5-BackendLayer/new_function_code.zip</li>
    <li>Run sudo yum install -y mysql and provide the shell password for cloud_user</li>
    <li>Navigate to the EC2 dashboard and find the private IP address of the instance where you've been running your terminal session from; copy that IP address</li>
    <li>Navigate to the security group associated to the Aurora database and add the private IP address for access to port 3306 (under "Inbound rules")</li>
    <li>Connect to MySQL from the terminal session using mysql -u admin -h [URL for writer instance] -p; when prompted, enter the password you used when creating the database</li>
    <li>Once connected, execute CREATE DATABASE widgets; and then USE widgets;</li>
    <li>Execute</li>
    
    ```
    CREATE TABLE Catalog (
    WidgetId int NOT NULL AUTO_INCREMENT,
    Name varchar(50) NOT NULL,
    Description varchar(100),
    PRIMARY KEY (WidgetId)
    );
    ```

    <li>Execute</li> 
    
    ```
    INSERT INTO Catalog (
    Name, Description) VALUES (
    'Thing-a-Ma-Bob', 'Regular old thing-a-ma-bob'
    );
    ```
    
    <li>Execute</li>
    
    ```
    INSERT INTO Catalog (
    Name, Description) VALUES (
    'What-Cha-Ma-Call-It', 'Handy dandy new widget'
    );
    ```

    <li>Execute SELECT * FROM Catalog; to confirm presence of new records</li>
    <li>Run exit to exit the MySQL session</li>
    <li>Try executing the updated function using aws lambda invoke --function-name pymysql-function --payload '{}' /dev/stdout to see the records returned from the newly created database and table</li>
    </ol>