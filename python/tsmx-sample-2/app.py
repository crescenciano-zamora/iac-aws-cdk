#!/usr/bin/env python3

import aws_cdk as cdk

from tsmx_sample_2.tsmx_sample_2_stack import TsmxSample2Stack


app = cdk.App()
TsmxSample2Stack(app, "tsmx-sample-2")

app.synth()
