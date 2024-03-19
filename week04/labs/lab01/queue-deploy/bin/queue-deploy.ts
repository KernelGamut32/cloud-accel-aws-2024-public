#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { QueueDeployStack } from '../lib/queue-deploy-stack';

const app = new cdk.App();
new QueueDeployStack(app, 'QueueDeployStack', {
});