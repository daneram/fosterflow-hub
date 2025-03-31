#!/bin/bash

# FosterFlow Hub - Database Setup Script
# This script helps set up the PostgreSQL database after deployment

set -e  # Exit on error

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Display banner
echo -e "${GREEN}"
echo "=============================================="
echo "  FosterFlow Hub - Database Setup Script"
echo "=============================================="
echo -e "${NC}"

# Check for psql
if ! command -v psql &> /dev/null; then
  echo -e "${RED}Error: PostgreSQL client (psql) is not installed.${NC}"
  echo "Please install the PostgreSQL client first."
  exit 1
fi

# Get RDS endpoint from CloudFormation stack
echo -e "${YELLOW}Getting RDS endpoint from CloudFormation stack...${NC}"
CF_OUTPUTS=$(aws cloudformation describe-stacks --stack-name fosterflow-preview --query "Stacks[0].Outputs" --output json)
RDS_ENDPOINT=$(echo $CF_OUTPUTS | jq -r '.[] | select(.OutputKey=="RDSEndpoint") | .OutputValue')

if [ -z "$RDS_ENDPOINT" ]; then
  echo -e "${RED}Error: Could not get RDS endpoint from CloudFormation stack.${NC}"
  echo "Please make sure the stack exists and has been successfully created."
  exit 1
fi

echo -e "RDS Endpoint: ${YELLOW}$RDS_ENDPOINT${NC}"

# Prompt for database credentials
echo -e "\n${YELLOW}Enter database credentials:${NC}"
read -p "Username (default is dbadmin): " DB_USERNAME
DB_USERNAME=${DB_USERNAME:-dbadmin}

read -sp "Password: " DB_PASSWORD
echo ""

read -p "Database name (default is fosterflow): " DB_NAME
DB_NAME=${DB_NAME:-fosterflow}

# Confirm before proceeding
echo -e "\n${YELLOW}This will set up the database schema for $DB_NAME at $RDS_ENDPOINT.${NC}"
read -p "Continue? (y/n): " CONFIRM
if [[ "$CONFIRM" != "y" && "$CONFIRM" != "Y" ]]; then
  echo -e "${RED}Operation cancelled.${NC}"
  exit 0
fi

# Create a temporary file with the connection string
echo "postgresql://$DB_USERNAME:$DB_PASSWORD@$RDS_ENDPOINT:5432/$DB_NAME" > .pgpass.tmp

# Set up the database using psql
echo -e "\n${GREEN}Setting up database schema...${NC}"
export PGPASSFILE=.pgpass.tmp
cat db-schema.sql | psql -h $RDS_ENDPOINT -U $DB_USERNAME -d $DB_NAME

# Clean up the temporary file
rm .pgpass.tmp

echo -e "\n${GREEN}Database setup complete!${NC}"
echo -e "${GREEN}=============================================="
echo "  FosterFlow Hub - Database Setup Complete!"
echo "===============================================${NC}" 