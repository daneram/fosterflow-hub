# GitHub Actions Setup for FosterFlow Hub

This document explains how to set up the required GitHub repository secrets for the CI/CD workflow.

## Required Secrets

The following secrets need to be configured in your GitHub repository settings to enable the test and deployment workflow:

1. **AWS Credentials**
   - `AWS_ACCESS_KEY_ID`: Your AWS access key
   - `AWS_SECRET_ACCESS_KEY`: Your AWS secret access key

2. **AWS Environment Variables**
   - `VITE_API_ENDPOINT`: The API endpoint for your application
   - `VITE_S3_BUCKET`: The S3 bucket name for file storage
   - `VITE_COGNITO_USER_POOL_ID`: Your Cognito user pool ID
   - `VITE_COGNITO_CLIENT_ID`: Your Cognito client ID
   - `VITE_AWS_REGION`: The AWS region (default: eu-west-1)

## Setting Up Secrets

1. Navigate to your GitHub repository
2. Go to Settings > Secrets and variables > Actions
3. Click on "New repository secret"
4. Add each required secret with its value
5. Click "Add secret"

## IAM Permissions

The AWS IAM user associated with the provided credentials should have the following permissions:

- AmazonS3FullAccess
- AmazonRDSFullAccess
- AmazonCognitoPowerUser
- AWSElasticBeanstalkFullAccess

It's recommended to create a dedicated IAM user with only the necessary permissions for GitHub Actions.

## Environment Setup

The workflow is configured to deploy to a testing environment. The environment name is set to `fosterflow-testing` by default.

You can modify the environment name in the `.github/workflows/test-and-deploy.yml` file if needed.

## Workflow Configuration

The GitHub Actions workflow is configured to:

1. Run tests on every push and pull request to main and develop branches
2. Deploy to AWS only on push to main and develop branches (not on pull requests)
3. Install and configure Jest if not already set up
4. Create a new Elastic Beanstalk environment if it doesn't exist

## Troubleshooting

If you encounter issues with the workflow:

1. Check the workflow run logs in the Actions tab of your repository
2. Verify that all required secrets are properly configured
3. Ensure your AWS credentials have the necessary permissions
4. Check that the Elastic Beanstalk environment exists or can be created

For additional help, refer to the AWS and GitHub Actions documentation. 