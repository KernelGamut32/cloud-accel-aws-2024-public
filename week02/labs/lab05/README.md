# Lab 05 - [GitLab CI/CD](https://aws.amazon.com/blogs/apn/using-gitlab-ci-cd-pipeline-to-deploy-aws-sam-applications/)

**NOTE: Use an A Cloud Guru (ACG) AWS Playground for this lab**

**If you encounter "no space left on device issues", use https://ryansouthgate.com/aws-cloud9-no-space-left-on-device/#:~:text=There%E2%80%99s%20a%20few%20things%20we%20can%20tackle%20here%2C,clean%20up%20that%20much%20free%20space%20for%20me**

**See: https://docs.gitlab.com/ee/ci/yaml/gitlab_ci_yaml.html and https://docs.gitlab.com/ee/ci/yaml/index.html for additional information on the syntax used in the `.gitlab-ci.yml` file**

1. In the lab environment, create a new Cloud9 environment by navigating to the Cloud9 console and clicking `Create environment` (or reuse a previously-created environment)
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
1. Create a new project in GitLab (I used public) but **do not initialize with a README** (I used `gitlabci-lab` for project name)
1. Execute the following: `sam init -r python3.8 -n <repository name> --app-template "hello-world"` from the `~/environment` path in the terminal (use value from previous step for `<repository name>`)
1. This will create a new folder containing a simple SAM (Serverless Application Model) Lambda
1. You do not need to enable XRay and you do not want to enable app insights (if you're running in an ACG sandbox)
1. Navigate to the newly-created folder in a terminal
1. **NOTE: If running in Cloud9, you can use [link in GitLab](https://docs.gitlab.com/ee/user/ssh.html) for info on running and storing a new SSH key using `ssh-keygen`; add the public key to GitLab**
    - Execute `ssh-keygen -t ed25519 -C "<comment>"` to generate a new SSH key in the default location in Cloud9 (`~/.ssh/`); use a value for `"<comment>"` and leave all other settings at the defaults
    - Run `cat ~/.ssh/id_ed25519.pub` to display the public key; copy the results into GitLab to generate a new SSH key
1. Execute `git init --initial-branch=main`
1. Execute `git remote add origin <remote repository URL>`; use the SSH repository URL from GitLab project
1. Execute `git add .`
1. Execute `git commit -m "Initial commit"`
1. Execute `git push -u origin main`
1. If you refresh the project view in GitLab, you should see the new files and folders
1. Test SAM locally
    - Run `sam build --use-container` to build the project
    - Run `sam local invoke HelloWorldFunction -e events/event.json` to test the function locally
    - Test the API gateway using `sam local start-api` and then `curl http://localhost:3000/hello`
1. Add the build pipeline - in the project root, create a new `.gitlab-ci.yml` file and copy/paste the following, changing `<project name>` to the name of your GitHub project (**you'll need to adjust from what's in the article**); **save your changes**

```
image: python:3.8

stages:
  - deploy

production:
  stage: deploy
  before_script:
    - pip3 install awscli --upgrade
    - pip3 install aws-sam-cli --upgrade
  script:
    - sam build
    - sam deploy --stack-name <project name> --no-confirm-changeset --no-fail-on-empty-changeset --resolve-s3 --capabilities CAPABILITY_IAM --region us-east-1
  environment: production
```

16. Integrate and verify the build
    - For the project in GitLab, under "Settings" | "CI/CD" | "Variables", set the "AWS_ACCESS_KEY_ID" and "AWS_SECRET_ACCESS_KEY" variables to the values for the `cloud_user` account (or whatever AWS account you are using)
    - Push the updated `.gitlab-ci.yml` file to the repository and observe build progress
    - Confirm successful build and test the deployed application through the API gateway URL (it should show as an output from the pipeline run)

17. Verify automatic test run locally
    - In the project root, run `pip install -r tests/requirements.txt` to install the test dependencies
    - In the project root, run `AWS_SAM_STACK_NAME=<project name> pytest` to run the tests locally and verify that all pass successfully

18. Add a test stage to the pipeline
    - Add a new environment variable called `AWS_SAM_STACK_NAME` with the value of the project name to the GitLab project
    - Update `client = boto3.client("cloudformation")` in tests/integration/test_api_gateway.py to `client = boto3.client("cloudformation", region_name="us-east-1")`
    - Update the `.gitlab-ci.yml` file to the following; **save all changes**:

```
image: python:3.8

stages:
  - build
  - unit_test
  - deploy
  - integration_test

build-code-job:
  stage: build
  before_script:
    - echo "Prepping for build"
    - pip3 install awscli --upgrade
    - pip3 install aws-sam-cli --upgrade
  script:
    - echo "Building the project"
    - sam build

unit-test-code-job:
  stage: unit_test
  before_script:
    - echo "Prepping for unit tests"
    - pip3 install -r tests/requirements.txt
  script:
    - echo "Running unit test suite"
    - pytest tests/unit/test_handler.py

deploy-code-job:
  stage: deploy
  before_script:
    - echo "Prepping for deploy"
    - pip3 install awscli --upgrade
    - pip3 install aws-sam-cli --upgrade
  script:
    - echo "Deploying code to AWS"
    - sam deploy --stack-name <project name> --no-confirm-changeset --no-fail-on-empty-changeset --resolve-s3 --capabilities CAPABILITY_IAM --region us-east-1
  environment: production

integration-test-code-job:
  stage: integration_test
  before_script:
    - echo "Prepping for integration tests"
    - pip3 install -r tests/requirements.txt
  script:
    - echo "Running integration test suite"
    - pytest tests/integration/test_api_gateway.py
```

19. Push the updates to the repository and observe the pipeline run
20. Confirm that each stage runs successfully
21. Make a small change to the lambda code and push the changes to the repository
22. Note that the test stage runs automatically and that the pipeline fails because the test fails
23. Note also that previous version of application is still accessible
24. Fix the test(s) and push the changes to the repository
25. Verify a successful build

**See https://docs.gitlab.com/ee/tutorials/create_register_first_runner/ for an example of how to create and use a GitLab runner**
