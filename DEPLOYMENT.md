# AWS Deployment Guide for FosterFlow Hub

This guide provides step-by-step instructions for deploying the FosterFlow Hub application to AWS using Elastic Beanstalk, RDS PostgreSQL, S3, and Cognito.

## Prerequisites

1. **AWS Account**: You need an AWS account with appropriate permissions.
2. **AWS CLI**: Install and configure the AWS CLI on your local machine.
3. **EB CLI**: Install the Elastic Beanstalk CLI.
4. **Node.js and npm**: Ensure you have the latest LTS version installed.

## Setup AWS CLI and EB CLI

1. Install the AWS CLI:
   ```bash
   # For macOS (using Homebrew)
   brew install awscli

   # For Windows (using chocolatey)
   choco install awscli

   # For Linux (Ubuntu/Debian)
   sudo apt-get install awscli
   ```

2. Configure AWS CLI:
   ```bash
   aws configure
   ```
   Enter your AWS Access Key ID, Secret Access Key, default region (us-east-1), and output format (json).

3. Install the EB CLI:
   ```bash
   # Using pip
   pip install awsebcli
   ```

## Deployment Steps

### 1. Create AWS Resources using CloudFormation

1. Deploy the CloudFormation template:
   ```bash
   aws cloudformation create-stack \
     --stack-name fosterflow-preview \
     --template-body file://cloudformation-template.yaml \
     --parameters \
       ParameterKey=DBUsername,ParameterValue=dbadmin \
       ParameterKey=DBPassword,ParameterValue=YOUR_SECURE_PASSWORD \
       ParameterKey=DBName,ParameterValue=fosterflow \
     --capabilities CAPABILITY_IAM
   ```

2. Wait for the stack creation to complete:
   ```bash
   aws cloudformation wait stack-create-complete --stack-name fosterflow-preview
   ```

3. Get the outputs from the CloudFormation stack:
   ```bash
   aws cloudformation describe-stacks --stack-name fosterflow-preview --query "Stacks[0].Outputs"
   ```
   Note down the values for RDSEndpoint, S3BucketName, CognitoUserPoolId, and CognitoAppClientId.

### 2. Initialize Elastic Beanstalk

1. Initialize the Elastic Beanstalk application:
   ```bash
   eb init
   ```
   Follow the prompts to select your region, application name (fosterflow-hub), and platform (Node.js).

2. Create the Elastic Beanstalk environment:
   ```bash
   eb create fosterflow-preview --single --instance-type t2.micro
   ```

### 3. Configure Environment Variables

1. Set environment variables in Elastic Beanstalk:
   ```bash
   eb setenv \
     VITE_API_ENDPOINT=YOUR_API_ENDPOINT \
     VITE_S3_BUCKET=YOUR_S3_BUCKET_NAME \
     VITE_COGNITO_USER_POOL_ID=YOUR_USER_POOL_ID \
     VITE_COGNITO_CLIENT_ID=YOUR_CLIENT_ID \
     VITE_AWS_REGION=us-east-1
   ```
   Replace the placeholders with the values from the CloudFormation outputs.

### 4. Deploy the Application

1. Build the application:
   ```bash
   npm run build
   ```

2. Deploy to Elastic Beanstalk:
   ```bash
   eb deploy
   ```

3. Open the deployed application:
   ```bash
   eb open
   ```

## Testing and Verifying the Deployment

1. Verify that the application is accessible via the Elastic Beanstalk URL.
2. Test user registration and login using Cognito.
3. Test file uploads to S3.
4. Test database connectivity to RDS PostgreSQL.

## Monitoring and Troubleshooting

1. View application logs:
   ```bash
   eb logs
   ```

2. SSH into the EC2 instance:
   ```bash
   eb ssh
   ```

3. View RDS logs via AWS RDS Console.

4. Monitor application performance in CloudWatch.

## Cleanup

To avoid incurring charges, clean up the resources when you're done:

1. Terminate the Elastic Beanstalk environment:
   ```bash
   eb terminate fosterflow-preview
   ```

2. Delete the CloudFormation stack:
   ```bash
   aws cloudformation delete-stack --stack-name fosterflow-preview
   ```

## Future Improvements

1. Set up CI/CD pipeline using AWS CodePipeline.
2. Add AWS WAF for web application firewall protection.
3. Implement SSL certificates with ACM.
4. Configure auto-scaling for the Elastic Beanstalk environment.
5. Implement database backup and restore procedures. 