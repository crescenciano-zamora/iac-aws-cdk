import * as iam from 'aws-cdk-lib/aws-iam';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as s3n from 'aws-cdk-lib/aws-s3-notifications';
import * as cdk from 'aws-cdk-lib';
import * as path from 'path';
import { Construct } from 'constructs';

export class TsmxSample3Stack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // 👇 add stack tag
    cdk.Tags.of(this).add('project', 'tsmx-devops');




    // 👇 create bucket
    const s3Bucket = new s3.Bucket(this, 's3-bucket', {
      bucketName:"tsmx-devops-bucket-01",
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
    });

    // 👇 add bucket tag
    cdk.Tags.of(s3Bucket).add('project', 'tsmx-devops');







    // 👇 define lambda
    const lambdaFunction = new lambda.Function(this, 'lambda-function', {
      functionName:"tsmx-devops-function-01",
      description:"Funcion para el show de cdk",
      runtime: lambda.Runtime.NODEJS_16_X,
      handler: 'index.main',
      code: lambda.Code.fromAsset(path.join(__dirname, '/../src/lambda')),
      timeout: cdk.Duration.seconds(15),
      memorySize:128,
      environment:{
        "DESTINATION_S3_PATH": "module/out"
      }

    });

    // 👇 add lambda tag
    cdk.Tags.of(lambdaFunction).add('project', 'tsmx-devops');


    // 👇 create a s3 policy statement
    const s3ListBucketsPolicy = new iam.PolicyStatement({
      actions: ['s3:*'],
      resources: ['arn:aws:s3:::tsmx-devops*'],
    });
    //resources: ['arn:aws:s3:::tsmx-devops*'],
    //resources: [s3Bucket.bucketArn],

    // 👇 add the policy to the Function's role
    lambdaFunction.role?.attachInlinePolicy(
      new iam.Policy(this, 'list-buckets-policy', {
        statements: [s3ListBucketsPolicy],
      }),
    );



    // 👇 invoke lambda every time an object is created in the bucket
    s3Bucket.addEventNotification(
      s3.EventType.OBJECT_CREATED,
      new s3n.LambdaDestination(lambdaFunction),
      // 👇 only invoke lambda if object matches the filter
       {prefix: 'module1/in/', suffix: '.json'},
    );

    //grant permissions to the lambda
    s3Bucket.grantReadWrite(lambdaFunction)




    //Resources ARN
    new cdk.CfnOutput(this, 'functionArn', {
      value: lambdaFunction.functionArn
    });
    new cdk.CfnOutput(this, 'bucketNameArn', {
      value: s3Bucket.bucketArn,
    });
  }
}