#!/bin/bash
echo "Creating Cloud9 environment $1 with instance type $2 and image id $3"
aws cloud9 create-environment-ec2 --name $1 --instance-type $2 --image-id $3
echo "Sleeping for $4 seconds to allow Cloud9 environment to be created"
sleep $4
echo "Getting instance id and volume id for Cloud9 environment $1"
instance_id=$(aws ec2 describe-instances --query "Reservations[].Instances[] | [? Tags[?Value.contains(@, '$1')]].InstanceId" --output text)
volume_id=$(aws ec2 describe-instances --query "Reservations[].Instances[] | [? Tags[?Value.contains(@, '$1')]].BlockDeviceMappings[0].Ebs.VolumeId" --output text)
echo "Modifying volume size for instance $instance_id to 50GB"
aws ec2 modify-volume --volume-id $volume_id --size 50 > /dev/null
echo "Rebooting instance $instance_id"
aws ec2 reboot-instances --instance-ids $instance_id
