import * as cdk from 'aws-cdk-lib';


/**
  * Stack properties
  */
 export interface TsmxSample4Props extends cdk.StackProps {
   //Deployment environment
   depEnv: string ;

 }
