import aws_cdk as core
import aws_cdk.assertions as assertions
from tsmx_sample_2.tsmx_sample_2_stack import TsmxSample2Stack


def test_sqs_queue_created():
    app = core.App()
    stack = TsmxSample2Stack(app, "tsmx-sample-2")
    template = assertions.Template.from_stack(stack)

    template.has_resource_properties("AWS::SQS::Queue", {
        "VisibilityTimeout": 300
    })


def test_sns_topic_created():
    app = core.App()
    stack = TsmxSample2Stack(app, "tsmx-sample-2")
    template = assertions.Template.from_stack(stack)

    template.resource_count_is("AWS::SNS::Topic", 1)
