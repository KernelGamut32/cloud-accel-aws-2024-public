# Lab 04 - [Quarkus – Lambda & DynamoDB (Part 1)](https://dzone.com/articles/dynamic-data-processing-using-serverless-java-with) and [Quarkus – Lambda & DynamoDB (Part 2)](https://dzone.com/articles/dynamic-data-processing-using-serverless-java-with-1)

**NOTE: Use an A Cloud Guru (ACG) AWS Playground for this lab**

**If you encounter "no space left on device issues", use https://ryansouthgate.com/aws-cloud9-no-space-left-on-device/#:~:text=There%E2%80%99s%20a%20few%20things%20we%20can%20tackle%20here%2C,clean%20up%20that%20much%20free%20space%20for%20me**

* In the lab environment, create a new Cloud9 environment by navigating to the Cloud9 console and clicking `Create environment` (or reuse a previously-created environment)
    - Specify a name for the environment
    - Select `t3.small` for instance type
    - Leave all other options at their defaults, and click `Create`
    - Wait for the Cloud9 environment creation to complete and click the link for your newly created environment
    - Under `EC2 instance` click `Manage EC2 instance`
    - Click the `Instance ID` link
    - Select `Storage`, click the `Volume ID` link, click the checkbox next to your volume, and select `Modify volume` from the `Actions` dropdown
    - Increase size from `10` to `30` GiB; click `Modify` and click `Modify` in the confirmation dialog
    - Reboot your EC2 instance
    - Go back to Cloud9, click the radio button next to your Cloud9 environment, and click `Open in Cloud9`
    - In the terminal window, you can run `lsblk` to confirm new size
* Follow along with the initial instructions in the part 1 tutorial link
* Use the `JBang` instructions for installing the `Quarkus` cli available at https://quarkus.io/guides/cli-tooling
* Before running `quarkus --version` to verify installation, close the existing terminal and open a new window (to pickup updates to `PATH`)
* Use the folder structure in `https://github.com/danieloh30/quarkus-piggybank/tree/main/src/main/java/org/acme` to help guide organization of your code and content
* When creating the files called out in the tutorial, use file contents at `https://github.com/danieloh30/quarkus-piggybank/tree/main/src/main/java/org/acme` to ensure you have the latest version
* For the docker compose steps, use the following to help you get docker-compose setup in Cloud9:
    * Run `sudo curl -SL https://github.com/docker/compose/releases/download/v2.20.2/docker-compose-linux-x86_64 -o /usr/local/bin/docker-compose` to install docker-compose in Cloud9
    * Add execution permissions (using `+x`) to the docker-compose binary: `sudo chmod +x /usr/local/bin/docker-compose`
    * Use the following for your docker-compose in Cloud9:

```
version: '3.8'

services:
  dynamodb-local:
    image: amazon/dynamodb-local:latest
    container_name: dynamodb-local
    restart: unless-stopped
    ports:
      - "8000:8000"
    user: root
    volumes:
      - ../tmp/dynamodb:/home/dynamodblocal/data
    working_dir: /home/dynamodblocal
    command: "-jar DynamoDBLocal.jar -sharedDb -dbPath ./data"
```

* In a new terminal, use the following for the "Creating an Entry Table Locally" step

```
/usr/local/bin/aws dynamodb create-table --endpoint-url http://localhost:8000 --table-name finance \
--attribute-definitions AttributeName=accountID,AttributeType=S AttributeName=timestamp,AttributeType=N \
--key-schema AttributeName=timestamp,KeyType=HASH AttributeName=accountID,KeyType=RANGE \
--provisioned-throughput ReadCapacityUnits=5,WriteCapacityUnits=5 --table-class STANDARD
```

* Use the following for adding test records to the "local" table (don't forget the steps for adding the additional dependency and updating `application.properties`; **NOTE: Watch formatting in your `pom.xml` file**)

```
curl -X POST http://localhost:8080/entryResource -H 'Content-Type: application/json' -d '{"accountID": "Food", "description": "Shrimp", "category": "Seafood", "amount": "-20", "balance": "0", "date": "2023-02-01+12:00"}'
curl -X POST http://localhost:8080/entryResource -H 'Content-Type: application/json' -d '{"accountID": "Car", "description": "Flat tires", "category": "Automotive", "amount": "-200", "balance": "0", "date": "2023-03-01+12:00"}'
curl -X POST http://localhost:8080/entryResource -H 'Content-Type: application/json' -d '{"accountID": "Payslip", "description": "Income", "category": "Get Paide", "amount": "2000", "balance": "0", "date": "2023-04-01+12:00"}'
curl -X POST http://localhost:8080/entryResource -H 'Content-Type: application/json' -d '{"accountID": "Utilities", "description": "Gas", "category": "Necessary Evils", "amount": "-400", "balance": "0", "date": "2023-05-01+12:00"}'
```

* Use the following to retrieve all records from the "local" table:

```
curl -X GET http://localhost:8080/entryResource/findAll 
```

* Use the following to find a record by account in the "local" table:

```
curl -X GET http://localhost:8080/entryResource/findByAccount/Food
```

* Shift over to the second URL (for part 2 of the lab)
* For the `Creating a Serverless Database Using Amazon DynamoDB` step, use the following to create the DynamoDB table in AWS:

```
aws dynamodb create-table \
    --table-name finance \
    --attribute-definitions \
        AttributeName=accountID,AttributeType=S \
        AttributeName=timestamp,AttributeType=N \
    --key-schema \
        AttributeName=accountID,KeyType=HASH \
        AttributeName=timestamp,KeyType=RANGE \
    --provisioned-throughput \
        ReadCapacityUnits=5,WriteCapacityUnits=5 \
    --table-class STANDARD
```

* When adding the new extension for Lambda, make sure that you are in the project root
* Use the following for your SAM template:

```
AWSTemplateFormatVersion: '2010-09-09'
Transform: AWS::Serverless-2016-10-31
Description: >
  PiggyBank AWS SAM application

Resources:
  Piggybank:
    Type: AWS::Serverless::Function
    Properties:
      Handler: io.quarkus.amazon.lambda.runtime.QuarkusStreamHandler::handleRequest
      Runtime: java17
      CodeUri: target/function.zip
      MemorySize: 1024
      SnapStart:
        ApplyOn: PublishedVersions
      AutoPublishAlias: snap
      Policies:
        - DynamoDBCrudPolicy:
            TableName: finance
      Timeout: 15
      Environment:
        Variables:
          JAVA_TOOL_OPTIONS: "-XX:+TieredCompilation -XX:TieredStopAtLevel=1"
      Events:
        HttpApiEvent:
          Type: HttpApi
Outputs:
  PiggybankApi:
    Description: URL for application
    Value: !Sub 'https://${ServerlessHttpApi}.execute-api.${AWS::Region}.amazonaws.com/'
    Export:
      Name: PiggybankApi
```

* Before running `sam deploy -g`, make sure you run `quarkus build --no-tests` again to ensure latest build is available
* Use the following to test the deployed API:

```
export API_URL=$(aws cloudformation describe-stacks --query 'Stacks[0].Outputs[?OutputKey==`PiggybankApi`].OutputValue' --output text)
echo $API_URL
```

```
curl -X POST ${API_URL}/entryResource -H 'Content-Type: application/json' -d '{"accountID": "Food", "description": "Shrimp", "category": "Seafood", "amount": "-20", "balance": "0", "date": "2023-02-01+12:00"}'
curl -X POST ${API_URL}/entryResource -H 'Content-Type: application/json' -d '{"accountID": "Car", "description": "Flat tires", "category": "Automotive", "amount": "-200", "balance": "0", "date": "2023-03-01+12:00"}'
curl -X POST ${API_URL}/entryResource -H 'Content-Type: application/json' -d '{"accountID": "Payslip", "description": "Income", "category": "Get Paide", "amount": "2000", "balance": "0", "date": "2023-04-01+12:00"}'
curl -X POST ${API_URL}/entryResource -H 'Content-Type: application/json' -d '{"accountID": "Utilities", "description": "Gas", "category": "Necessary Evils", "amount": "-400", "balance": "0", "date": "2023-05-01+12:00"}'
curl -X GET ${API_URL}/entryResource/findAll
curl -X GET ${API_URL}/entryResource/findByAccount/Food
```

* To verify, review the DynamoDB table in the AWS Console to see the newly created items
* You can also view the configuration for the Lambda to see the SnapStart settings applied
