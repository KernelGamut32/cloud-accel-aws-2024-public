#!/bin/bash

# Publish regular EU order message
aws sns publish \
    --message '{"location": "eu zone 1", "country": "Germany", "quantity": 34}' \
    --topic-arn $1

# Publish large EU order message
aws sns publish \
    --message '{"location": "eu zone 2", "country": "Spain", "quantity": 111}' \
    --topic-arn $1

# Publish large other order message
aws sns publish \
    --message '{"location": "us-west", "state": "OH", "quantity": 222}' \
    --topic-arn $1

# Publish regular other order message
aws sns publish \
    --message '{"location": "us-east", "state": "NY", "quantity": 33}' \
    --topic-arn $1
