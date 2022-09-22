import { Duration, Stack, StackProps } from 'aws-cdk-lib';
import * as sns from 'aws-cdk-lib/aws-sns';
import * as subs from 'aws-cdk-lib/aws-sns-subscriptions';
import * as sqs from 'aws-cdk-lib/aws-sqs';
import { Construct } from 'constructs';

export class TsmxSample1Stack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const queue = new sqs.Queue(this, 'TsmxSample1Queue', {
      visibilityTimeout: Duration.seconds(300)
    });

    const topic = new sns.Topic(this, 'TsmxSample1Topic');

    topic.addSubscription(new subs.SqsSubscription(queue));
  }
}
