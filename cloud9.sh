#!/bin/bash
aws cloud9 create-environment-ec2 --name $1 --instance-type $2 --image-id $3
sleep 60
instance_id=$(aws ec2 describe-instances --query "Reservations[].Instances[] | [? Tags[?Value.contains(@, '$1')]].InstanceId" --output text)
volume_id=$(aws ec2 describe-instances --query "Reservations[].Instances[] | [? Tags[?Value.contains(@, '$1')]].BlockDeviceMappings[0].Ebs.VolumeId" --output text)
aws ec2 modify-volume --volume-id $volume_id --size 50 > /dev/null
aws ec2 reboot-instances --instance-ids $instance_id
