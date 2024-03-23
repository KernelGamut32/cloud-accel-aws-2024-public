#!/bin/bash

# Publish regular EU order message
aws sns publish \
    --message '{"location": "eu-west", "quantity": 34}' \
    --topic-arn $1

# Publish large EU order message
aws sns publish \
    --message '{"location": "eu-north", "quantity": 111}' \
    --topic-arn $1

# Publish large other order message
aws sns publish \
    --message '{"location": "us-west", "quantity": 222, "state": "OH"}' \
    --topic-arn $1

# Publish regular other order message
aws sns publish \
    --message '{"location": "us-east", "quantity": 33, "state": "NY"}' \
    --topic-arn $1
