#!/bin/bash

# Deploy AWS Resources Script for FosterFlow Hub
# This script automates the process of deploying the required AWS resources
# and deploying the application to Elastic Beanstalk

set -e  # Exit on error

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Display banner
echo -e "${GREEN}"
echo "=============================================="
echo "  FosterFlow Hub - AWS Deployment Script"
echo "=============================================="
echo -e "${NC}"

# Check for AWS CLI
if ! command -v aws &> /dev/null; then
  echo -e "${RED}Error: AWS CLI is not installed.${NC}"
  echo "Please install AWS CLI first: https://aws.amazon.com/cli/"
  exit 1
fi

# Check for EB CLI
if ! command -v eb &> /dev/null; then
  echo -e "${RED}Error: Elastic Beanstalk CLI is not installed.${NC}"
  echo "Please install EB CLI first: https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/eb-cli3-install.html"
  exit 1
fi

# Prompt for AWS credentials if not configured
if ! aws sts get-caller-identity &> /dev/null; then
  echo -e "${YELLOW}AWS credentials not configured. Let's set them up.${NC}"
  aws configure
fi

# Prompt for DB credentials
echo -e "${YELLOW}Enter PostgreSQL database credentials:${NC}"
read -p "Username (default is dbadmin): " DB_USERNAME
DB_USERNAME=${DB_USERNAME:-dbadmin}

read -sp "Password (must be at least 8 characters): " DB_PASSWORD
echo ""
if [ ${#DB_PASSWORD} -lt 8 ]; then
  echo -e "${RED}Error: Password must be at least 8 characters long.${NC}"
  exit 1
fi

read -p "Database name (default is fosterflow): " DB_NAME
DB_NAME=${DB_NAME:-fosterflow}

# Create CloudFormation stack
echo -e "\n${GREEN}Creating CloudFormation stack...${NC}"
aws cloudformation create-stack \
  --stack-name fosterflow-preview \
  --template-body file://cloudformation-template.yaml \
  --parameters \
    ParameterKey=DBUsername,ParameterValue=$DB_USERNAME \
    ParameterKey=DBPassword,ParameterValue=$DB_PASSWORD \
    ParameterKey=DBName,ParameterValue=$DB_NAME \
  --capabilities CAPABILITY_IAM

echo -e "${YELLOW}Waiting for CloudFormation stack creation to complete...${NC}"
aws cloudformation wait stack-create-complete --stack-name fosterflow-preview

# Get outputs from CloudFormation stack
echo -e "\n${GREEN}Getting outputs from CloudFormation stack...${NC}"
CF_OUTPUTS=$(aws cloudformation describe-stacks --stack-name fosterflow-preview --query "Stacks[0].Outputs" --output json)

# Extract values from outputs
RDS_ENDPOINT=$(echo $CF_OUTPUTS | jq -r '.[] | select(.OutputKey=="RDSEndpoint") | .OutputValue')
S3_BUCKET=$(echo $CF_OUTPUTS | jq -r '.[] | select(.OutputKey=="S3BucketName") | .OutputValue')
COGNITO_USER_POOL_ID=$(echo $CF_OUTPUTS | jq -r '.[] | select(.OutputKey=="CognitoUserPoolId") | .OutputValue')
COGNITO_APP_CLIENT_ID=$(echo $CF_OUTPUTS | jq -r '.[] | select(.OutputKey=="CognitoAppClientId") | .OutputValue')

echo -e "${GREEN}CloudFormation resources created successfully!${NC}"
echo -e "RDS Endpoint: ${YELLOW}$RDS_ENDPOINT${NC}"
echo -e "S3 Bucket: ${YELLOW}$S3_BUCKET${NC}"
echo -e "Cognito User Pool ID: ${YELLOW}$COGNITO_USER_POOL_ID${NC}"
echo -e "Cognito App Client ID: ${YELLOW}$COGNITO_APP_CLIENT_ID${NC}"

# Initialize Elastic Beanstalk if not already initialized
if [ ! -d .elasticbeanstalk ]; then
  echo -e "\n${GREEN}Initializing Elastic Beanstalk...${NC}"
  eb init --platform "node.js-18" --region "eu-west-1"
else
  echo -e "\n${GREEN}Elastic Beanstalk already initialized.${NC}"
fi

# Create Elastic Beanstalk environment if it doesn't exist
if ! eb status fosterflow-preview &> /dev/null; then
  echo -e "\n${GREEN}Creating Elastic Beanstalk environment...${NC}"
  eb create fosterflow-preview --single --instance-type t2.micro
else
  echo -e "\n${GREEN}Elastic Beanstalk environment already exists.${NC}"
fi

# Set environment variables
echo -e "\n${GREEN}Setting environment variables...${NC}"
eb setenv \
  VITE_API_ENDPOINT="http://$RDS_ENDPOINT/api" \
  VITE_S3_BUCKET="$S3_BUCKET" \
  VITE_COGNITO_USER_POOL_ID="$COGNITO_USER_POOL_ID" \
  VITE_COGNITO_CLIENT_ID="$COGNITO_APP_CLIENT_ID" \
  VITE_AWS_REGION="eu-west-1"

# Build the application
echo -e "\n${GREEN}Building the application...${NC}"
npm run build

# Deploy to Elastic Beanstalk
echo -e "\n${GREEN}Deploying to Elastic Beanstalk...${NC}"
eb deploy

# Open the application
echo -e "\n${GREEN}Deployment complete!${NC}"
echo -e "Opening the application..."
eb open

echo -e "\n${GREEN}=============================================="
echo "  FosterFlow Hub - Deployment Complete!"
echo "===============================================${NC}" 