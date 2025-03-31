// AWS Configuration file for the FosterFlow application

// Get environment variables from Vite
const apiEndpoint = import.meta.env.VITE_API_ENDPOINT || '';
const s3Bucket = import.meta.env.VITE_S3_BUCKET || '';
const userPoolId = import.meta.env.VITE_COGNITO_USER_POOL_ID || '';
const clientId = import.meta.env.VITE_COGNITO_CLIENT_ID || '';
const region = import.meta.env.VITE_AWS_REGION || 'us-east-1';

// AWS Configuration object
export const awsConfig = {
  // General AWS configuration
  region,
  
  // S3 configuration
  s3: {
    bucket: s3Bucket,
    region,
  },
  
  // Cognito configuration
  cognito: {
    userPoolId,
    clientId,
    region,
  },
  
  // API configuration
  api: {
    endpoint: apiEndpoint,
  }
};

export default awsConfig; 