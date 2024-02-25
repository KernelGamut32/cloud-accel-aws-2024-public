# Lab 05 - https://aws.amazon.com/blogs/apn/using-gitlab-ci-cd-pipeline-to-deploy-aws-sam-applications/

**See: https://docs.gitlab.com/ee/ci/yaml/gitlab_ci_yaml.html and https://docs.gitlab.com/ee/ci/yaml/index.html for additional information on the syntax used in the `.gitlab-ci.yml` file**

* Execute in a Cloud9 environment in an ACG sandbox host
* Create a new project in GitLab (I used public) but **do not initialize with a README** (I used `gitlabci-lab` for project name)
* Execute the following: `sam init -r python3.8 -n <repository name> --app-template "hello-world"`
* You do not need to enable XRay and you do not want to enable app insights (if you're running in an ACG sandbox)
* Navigate to the newly-created folder in a terminal
* **NOTE: If running in Cloud9, you can use link in GitLab for info on running and storing a new SSH key using `ssh-keygen`; add the public key to GitLab**
  * Execute `ssh-keygen -t ed25519 -C "<comment>"` to generate a new SSH key in the default location in Cloud9 (`~/.ssh/`)
  * Run `cat ~/.ssh/id_ed25519.pub` to display the public key; copy the results into GitLab to generate a new SSH key
* Execute `git init --initial-branch=main`
* Execute `git remote add origin <remote repository URL>`
* Execute `git add .`
* Execute `git commit -m "Initial commit"`
* Execute `git push -u origin main`
* Test SAM locally
  * Run `sam build --use-container` to build the project
  * Run `sam local invoke HelloWorldFunction -e events/event.json` to test the function locally
  * Test the API gateway using `sam local start-api` and then `curl http://localhost:3000/hello`
* Add the build pipeline - in the project root, create a new `.gitlab-ci.yml` file and copy/paste the following (**you'll need to adjust from what's in the article**)

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

* Integrate and verify the build
  * For the project in GitLab, under "Settings" | "CI/CD" | "Variables", set the "AWS_ACCESS_KEY_ID" and "AWS_SECRET_ACCESS_KEY" variables to the values for the `cloud_user` account (or whatever AWS account you are using)
  * Push the updated `.gitlab-ci.yml` file to the repository and observe build progress
  * Confirm successful build and test the deployed application through the API gateway URL (it should show as an output from the pipeline run)

* Verify automatic test run locally
  * In the project root, run `pip install -r tests/requirements.txt` to install the test dependencies
  * In the project root, run `AWS_SAM_STACK_NAME=<project name> pytest` to run the tests locally and verify that all pass successfully

* Add a test stage to the pipeline
  * Add a new environment variable called `AWS_SAM_STACK_NAME` with the value of the project name to the GitLab project
  * Update `client = boto3.client("cloudformation")` in tests/integration/test_api_gateway.py to `client = boto3.client("cloudformation", region_name="us-east-1")`
  * Update the `.gitlab-ci.yml` file to the following:

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
    - sam deploy --stack-name gitlabci-lab --no-confirm-changeset --no-fail-on-empty-changeset --resolve-s3 --capabilities CAPABILITY_IAM --region us-east-1
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

* Push the updates to the repository and observe the pipeline run
* Confirm that each stage runs successfully
* Make a small change to the lambda code and push the changes to the repository
* Note that the test stage runs automatically and that the pipeline fails because the test fails
* Note also that previous version of application is still accessible
* Fix the test(s) and push the changes to the repository
* Verify a successful build

**See https://docs.gitlab.com/ee/tutorials/create_register_first_runner/ for an example of how to create and use a GitLab runner**
