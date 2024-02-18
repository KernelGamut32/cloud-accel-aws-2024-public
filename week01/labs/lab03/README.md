# CloudFormation Demo - https://github.com/KernelGamut32/Mastering-AWS-CloudFormation

**Install AWS Toolkit in VS Code**

Review https://github.com/KernelGamut32/Mastering-AWS-CloudFormation/blob/master/Chapter2/core.yaml

* Review parameters (Default, AllowedValues, and AllowedPattern) – use !Ref later in template; without default, missing param will fail
* Touch briefly on mappings (https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/mappings-section-structure.html)
* Review conditions – able to create (true or false), use !Equals, etc., works with !If, can create and ref later in template
* Resources – types, properties; supports DependsOn, CreationPolicy (for waiting like with ASG), DeletionPolicy (what to do with resource when stack is deleted; e.g., important production db needs to stay in place)
* We saw outputs – for displaying resulting data
* Review Mappings --> https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/mappings-section-structure.html
* From Chapter2 folder, run `aws cloudformation create-stack --stack-name core --template-body file://core.yaml --parameters file://testing.json --capabilities CAPABILITY_IAM`
* Review activity in MC
* Touch on Export in core – show corresponding import in middleware.yaml
