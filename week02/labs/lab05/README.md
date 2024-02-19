# Lab 02 - https://docs.aws.amazon.com/codebuild/latest/userguide/getting-started.html

Follow along with steps outlined in tutorial in a Cloud9 environment created within ACG sandbox.

* Don't forget package names in .java files (e.g., `package main.java;` and `package test.java;`); also, don't forget to import the `MessageUtil` class in `TestMessageUtil.java`
* Use the following for initial version of `MessageUtil.java`:
```
package main.java;

public class MessageUtil {
  private String message;

  public MessageUtil(String message) {
    this.message = message;
  }

  public String printMessage() {
    System.out.println(message);
    return message;
  }

  public String salutationMessage() {
    message = "Hi!" + message;
    System.out.println(message);
    return message;
  }
}
```
* Use the following for initial version of `TestMessageUtil.java`:
```
package test.java;

import org.junit.Test;
import org.junit.Ignore;
import static org.junit.Assert.assertEquals;
import main.java.MessageUtil;

public class TestMessageUtil {

  String message = "Robert";
  MessageUtil messageUtil = new MessageUtil(message);
   
  @Test
  public void testPrintMessage() {      
    System.out.println("Inside testPrintMessage()");     
    assertEquals(message,messageUtil.printMessage());
  }

  @Test
  public void testSalutationMessage() {
    System.out.println("Inside testSalutationMessage()");
    message = "Hi!" + "Robert";
    assertEquals(message,messageUtil.salutationMessage());
  }
}
```
* Use the following for `pom.xml`:
```
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/maven-v4_0_0.xsd">
    <modelVersion>4.0.0</modelVersion>
    <groupId>org.example</groupId>
    <artifactId>messageUtil</artifactId>
    <version>1.0</version>
    <packaging>jar</packaging>
    <name>Message Utility Java Sample App</name>
    <dependencies>
        <dependency>
            <groupId>junit</groupId>
            <artifactId>junit</artifactId>
            <version>4.11</version>
            <scope>test</scope>
        </dependency>
    </dependencies>
    <build>
        <plugins>
            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-compiler-plugin</artifactId>
                <version>3.8.0</version>
                <configuration>
                    <source>1.8</source>
                    <target>1.8</target>
                </configuration>
            </plugin>
        </plugins>
    </build>
</project>
```
* Use the following for `buildspec.yml`:
```
version: 0.2

phases:
  install:
    runtime-versions:
      java: corretto17
  pre_build:
    commands:
      - echo Nothing to do in the pre_build phase...
  build:
    commands:
      - echo Build started on `date`
      - mvn install
  post_build:
    commands:
      - echo Build completed on `date`
artifacts:
  files:
    - target/messageUtil-1.0.jar
```
* You can validate local build in Cloud9 by installing Maven (`sudo yum -y install maven`) and running `mvn clean package` in the project directory
* Navigate to the folder where your project is stored and use `zip -r MessageUtil.zip .` to create zip file for upload to S3; it is important that the zip file be created with `zip` vs `tar`
* Use the following to upload the .zip file to S3:
```
aws s3 ls
aws s3 mb s3://<bucket-name>-input
aws s3 mb s3://<bucket-name>-output
aws s3 cp MessageUtil.zip s3://<bucket-name>-input/MessageUtil.zip
```
* Use https://former2 to view the CloudFormation template for the CodeBuild project
