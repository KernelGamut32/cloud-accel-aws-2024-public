# Lab 04 - [Handling ClickStream with MSK](https://catalog.us-east-1.prod.workshops.aws/workshops/c2b72b6f-666b-4596-b8bc-bafa5dcca741/en-US/mskkdaflinklab)

**NOTE: Use an A Cloud Guru (ACG) AWS Playground for this lab**

**If you encounter "no space left on device issues", use https://ryansouthgate.com/aws-cloud9-no-space-left-on-device/#:~:text=There%E2%80%99s%20a%20few%20things%20we%20can%20tackle%20here%2C,clean%20up%20that%20much%20free%20space%20for%20me**

1. In the lab environment, create a new Cloud9 environment using the following steps:
    - Open `CloudShell` (in the upper right)
    - Clone this repository to `CloudShell` using `git clone https://github.com/KernelGamut32/cloud-accel-aws-2024-public.git`
    - Navigate to the root folder using `cd cloud-accel-aws-2024-public`
    - Execute the bash script to create a new Cloud9 environment using `./cloud9.sh '<env-name>' 't3.medium' 'amazonlinux-2023-x86_64'` (replace `<env-name>` with your environment name)
    - Close `CloudShell`
    - In the search bar, search for `Cloud9` (open in a new tab)
    - Click the radio button next to your environment and click `Open in Cloud9`
    - Execute the remaining instructions in the Cloud9 environment
1. In the provided terminal from the `~/environment` folder, clone the class repository using `git clone https://github.com/KernelGamut32/cloud-accel-aws-2024-public.git`
1. Review the `MSKFlinkPrivate.yml` file in the week 04 / lab 04 folder
1. This template requires a KeyPair (as a parameter) for use with the EC2/Kafka client created by it - in the AWS MC, search for `Key pairs` and open in a new tab
1. Click `Create key pair`, use an easy to remember name for the key pair (e.g., `msk-clickstream`); leave all other settings at their defaults, and click `Create key pair`
1. The new key will be automatically downloaded to your local system
1. Pick up with the lab instructions from https://catalog.us-east-1.prod.workshops.aws/workshops/c2b72b6f-666b-4596-b8bc-bafa5dcca741/en-US/mskkdaflinklab/setup
1. Create the AWS resources using the CloudFormation template in the lab repository by running `aws cloudformation create-stack --stack-name msk-clickstream --parameters ParameterKey=KeyName,ParameterValue=<key pair name> --template-body file://./cloud-accel-aws-2024-public/week04/labs/lab04/MSKFlinkPrivate.yml --capabilities CAPABILITY_NAMED_IAM`
1. Run `aws cloudformation describe-stack-events --stack-name msk-clickstream` to check the status of the stack creation (or view in the CloudFormation Management Console); **NOTE: This will take about 1/2 hour to complete**
1. Before connecting to the EC2 Kafka client, set `IMDSv2` metadata to `Required` under `Instance settings` | `Modify instance metadata options` on the Kafka client instance
1. When connecting the EC2 Kafka client, use `ssh -i "<key pair name>.pem" ec2-user@<dns name in output>`; you can find additional instructions for connecting in the EC2 Management Console
1. When following steps in the lab, you will need to manually install Confluent dependencies using the following executed from `~/`

```
mkdir -p confluent kafka
cd ~/confluent
wget http://packages.confluent.io/archive/5.3/confluent-community-5.3.1-2.12.tar.gz
tar -xzf confluent-community-5.3.1-2.12.tar.gz --strip 1
cd ~/kafka
wget https://archive.apache.org/dist/kafka/2.3.1/kafka_2.12-2.3.1.tgz
tar -xzf kafka_2.12-2.3.1.tgz --strip 1
```

13. You will also need to install the sample producer manually using
    - Install `maven` on the Kafka client machine using `sudo yum install -y maven`
    - Follow instructions provided at https://github.com/aws-samples/clickstream-producer-for-apache-kafka/tree/master
14. Execute `cp ~/clickstream-producer-for-apache-kafka/target/KafkaClickstreamClient-1.0-SNAPSHOT.jar /tmp/kafka/` to copy the producer to the spot expected by the lab
15. Use `aws cloudformation delete-stack --stack-name msk-clickstream` to delete the AWS resources for the lab
