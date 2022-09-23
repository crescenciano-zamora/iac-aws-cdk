#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { TsmxSample4Stack } from '../lib/tsmx-sample-4-stack';

const app = new cdk.App();



new TsmxSample4Stack(app, 'TsmxSample4Stack-dev', {
  /* If you don't specify 'env', this stack will be environment-agnostic.
   * Account/Region-dependent features and context lookups will not work,
   * but a single synthesized template can be deployed anywhere. */

  /* Uncomment the next line to specialize this stack for the AWS Account
   * and Region that are implied by the current CLI configuration. */
  // env: { account: process.env.CDK_DEFAULT_ACCOUNT, region: process.env.CDK_DEFAULT_REGION },

  /* Uncomment the next line if you know exactly what Account and Region you
   * want to deploy the stack to. */
  // env: { account: '123456789012', region: 'us-east-1' },

  /* For more information, see https://docs.aws.amazon.com/cdk/latest/guide/environments.html */

  stackName:`TsmxSample4Stack-dev`,
  description:`Stack para crear un bucket y lambda para el demo -dev`,
  depEnv: "dev",


});




new TsmxSample4Stack(app, 'TsmxSample4Stack-qa', {
  stackName:`TsmxSample4Stack-qa`,
  description:`Stack para crear un bucket y lambda para el demo - qa`,
  depEnv: "qa",


});






new TsmxSample4Stack(app, 'TsmxSample4Stack-prd', {
  stackName:`TsmxSample4Stack-prd`,
  description:`Stack para crear un bucket y lambda para el demo - prd`,
  depEnv: "prd",


});