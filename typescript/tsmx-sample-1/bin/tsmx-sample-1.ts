#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { TsmxSample1Stack } from '../lib/tsmx-sample-1-stack';

const app = new cdk.App();
new TsmxSample1Stack(app, 'TsmxSample1Stack');
