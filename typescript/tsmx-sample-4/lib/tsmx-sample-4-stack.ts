import * as iam from 'aws-cdk-lib/aws-iam';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as s3n from 'aws-cdk-lib/aws-s3-notifications';
import * as cdk from 'aws-cdk-lib';
import * as path from 'path';
import { Construct } from 'constructs';
import { TsmxSample4Props } from './tsmx-sample-4-props';

export class TsmxSample4Stack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: TsmxSample4Props) {
    super(scope, id, props);


    //get from cdk.json
    const context = this.node.tryGetContext(props.depEnv)


    // 👇 add stack tag
    cdk.Tags.of(this).add('project', context["project"]);




    // 👇 create bucket
    const s3Bucket = new s3.Bucket(this, context["bucketName"], {
      bucketName:context["bucketName"],
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
    });






    // 👇 add bucket tag
    cdk.Tags.of(s3Bucket).add('project', context["project"]);







    // 👇 define lambda
    const lambdaFunction = new lambda.Function(this, context["functionName"], {
      functionName:context["functionName"],
      description:"Funcion para el show de cdk",
      runtime: lambda.Runtime.NODEJS_16_X,
      handler: 'index.main',
      code: lambda.Code.fromAsset(path.join(__dirname, '/../src/lambda')),
      timeout: cdk.Duration.seconds(15),
      memorySize:context["memorySize"],
      environment:{
        "DESTINATION_S3_PATH": "module/out"
      }

    });

    // 👇 add lambda tag
    cdk.Tags.of(lambdaFunction).add('project', context["project"]);


    // 👇 create a s3 policy statement
    const s3ListBucketsPolicy = new iam.PolicyStatement({
      actions: ['s3:*'],
      resources: ['arn:aws:s3:::tsmx-devops*'],
    });
    //resources: ['arn:aws:s3:::tsmx-devops*'],
    //resources: [s3Bucket.bucketArn],

    // 👇 add the policy to the Function's role
    lambdaFunction.role?.attachInlinePolicy(
      new iam.Policy(this, `list-buckets-policy--${props.depEnv}`, {
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
    new cdk.CfnOutput(this, `functionArn-${props.depEnv}`, {
      value: lambdaFunction.functionArn
    });
    new cdk.CfnOutput(this, `bucketNameArn-${props.depEnv}`, {
      value: s3Bucket.bucketArn,
    });
  }
}