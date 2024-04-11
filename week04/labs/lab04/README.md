# Lab 04 - [Handling ClickStream with MSK](https://catalog.us-east-1.prod.workshops.aws/workshops/c2b72b6f-666b-4596-b8bc-bafa5dcca741/en-US/mskkdaflinklab)

**NOTE: Use an A Cloud Guru (ACG) AWS Playground for this lab**

**If you encounter "no space left on device issues", use https://ryansouthgate.com/aws-cloud9-no-space-left-on-device/#:~:text=There%E2%80%99s%20a%20few%20things%20we%20can%20tackle%20here%2C,clean%20up%20that%20much%20free%20space%20for%20me**

* In the lab environment, create a new Cloud9 environment by navigating to the Cloud9 console and clicking `Create environment` (or reuse a previously-created environment)
    - Specify a name for the environment
    - Select `Additional instance types` and choose `t3.medium`
    - Leave all other options at their defaults, and click `Create`
    - Wait for the Cloud9 environment creation to complete and click the link for your newly created environment
    - Under `EC2 instance` click `Manage EC2 instance`
    - Click the `Instance ID` link
    - Select `Storage`, click the `Volume ID` link, click the checkbox next to your volume, and select `Modify volume` from the `Actions` dropdown
    - Increase size from `10` to `30` GiB; click `Modify` and click `Modify` in the confirmation dialog
    - Reboot your EC2 instance
    - Go back to Cloud9, click the radio button next to your Cloud9 environment, and click `Open in Cloud9`
    - In the terminal window, you can run `lsblk` to confirm new size
* In the provided terminal from the `~/environment` folder, clone the class repository using `git clone https://github.com/KernelGamut32/cloud-accel-aws-2024-public.git`
* Review the `MSKFlinkPrivate.yml` file in the week 04 / lab 04 folder
* This template requires a KeyPair (as a parameter) for use with the EC2/Kafka client created by it - in the AWS MC, search for `Key pairs` and open in a new tab
* Click `Create key pair`, use an easy to remember name for the key pair (e.g., `msk-clickstream`); leave all other settings at their defaults, and click `Create key pair`
* The new key will be automatically downloaded to your local system
* Pick up with the lab instructions from https://catalog.us-east-1.prod.workshops.aws/workshops/c2b72b6f-666b-4596-b8bc-bafa5dcca741/en-US/mskkdaflinklab/setup
* Create the AWS resources using the CloudFormation template in the lab repository by running `aws cloudformation create-stack --stack-name msk-clickstream --parameters ParameterKey=KeyName,ParameterValue=<key pair name> --template-body file://./cloud-accel-aws-2024-public/week04/labs/lab04/MSKFlinkPrivate.yml --capabilities CAPABILITY_NAMED_IAM`
* Run `aws cloudformation describe-stack-events --stack-name msk-clickstream` to check the status of the stack creation (or view in the CloudFormation Management Console); **NOTE: This will take about 1/2 hour to complete**
* Before connecting to the EC2 Kafka client, set `IMDSv2` metadata to `Required` under `Instance settings` | `Modify instance metadata options` on the Kafka client instance
* When connecting the EC2 Kafka client, use `ssh -i "<key pair name>.pem" ec2-user@<dns name in output>`; you can find additional instructions for connecting in the EC2 Management Console
* When following steps in the lab, you will need to manually install Confluent dependencies using the following executed from `~/`

```
mkdir -p confluent kafka
cd ~/confluent
wget http://packages.confluent.io/archive/5.3/confluent-community-5.3.1-2.12.tar.gz
tar -xzf confluent-community-5.3.1-2.12.tar.gz --strip 1
cd ~/kafka
wget https://archive.apache.org/dist/kafka/2.3.1/kafka_2.12-2.3.1.tgz
tar -xzf kafka_2.12-2.3.1.tgz --strip 1
```

* You will also need to install the sample producer manually using
    - Install `maven` on the Kafka client machine using `sudo yum install -y maven`
    - Follow instructions provided at https://github.com/aws-samples/clickstream-producer-for-apache-kafka/tree/master
* Execute `cp ~/clickstream-producer-for-apache-kafka/target/KafkaClickstreamClient-1.0-SNAPSHOT.jar /tmp/kafka/` to copy the producer to the spot expected by the lab
* Use `aws cloudformation delete-stack --stack-name msk-clickstream` to delete the AWS resources for the lab
