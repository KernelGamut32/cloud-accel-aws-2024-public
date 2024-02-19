# Lab 06 - https://learn.acloud.guru/handson/cdc003fa-1484-4707-bba4-0ea1e9039339

Follow along with the "Guide" tab in the ACG lab definition.

* To find the `<ROLE_ARN>`, click the right arrow to see definition of the role
* When instructed to configure the RDS instance to use "Burstable classes (includes t classes)", use `db.t3.medium` instead of the recommended `db.t3.small` (as you'll likely not be able to find the instance class called out by the lab)
* **NOTE: It may take several minutes for the RDS instance to be created (approx 5 - 10 minutes)**
* Wait until the Lambda update operation for adding VPC and subnets is complete before updating the Lambda code to reference the RDS instance
* After completion of regular lab, from the same SSH session, run `sudo yum install -y mysql` and provide the password for `cloud_user`
* Navigate to the EC2 dashboard and find the private IP address of the instance where you've been running your terminal session from; copy that IP address
* Navigate to the security group associated to the Aurora database and add the private IP address for access to port 3306 (under "Inbound rules")
* Connect to MySQL from the terminal session using `mysql -u admin -h <db URL for writer instance> -p`; when prompted, enter the password you used when creating the database
* Once connected, execute `CREATE DATABASE widgets;` and then `USE widgets;`
* Execute ```CREATE TABLE Catalog (
    WidgetId int NOT NULL AUTO_INCREMENT,
    Name varchar(50) NOT NULL,
    Description varchar(100),
    PRIMARY KEY (WidgetId)
    );```
* Execute ```INSERT INTO Catalog (
    Name, Description) VALUES (
    'Thing-a-Ma-Bob', 'Regular old thing-a-ma-bob'
    );```
* Execute ```INSERT INTO Catalog (
    Name, Description) VALUES (
    'What-Cha-Ma-Call-It', 'Handy dandy new widget'
    );```
* Execute `SELECT * FROM Catalog;` to confirm presence of new records
* Run `exit` to exit the MySQL session
* Update the lambda code to reference the new database and update the SELECT statement to pull data from the new table
* Deploy the updated lambda code
* Run test again to confirm your ability to retrieve the new records
