/**
 * AWS Utilities for FosterFlow Hub
 * 
 * This file contains utility functions for interacting with AWS services.
 */

import AWS from 'aws-sdk';
import awsConfig from './aws-config';

// Initialize AWS services
AWS.config.update({
  region: awsConfig.region
});

// Initialize S3 client
const s3 = new AWS.S3({
  region: awsConfig.s3.region
});

// Initialize Cognito client
const cognitoIdentityServiceProvider = new AWS.CognitoIdentityServiceProvider({
  region: awsConfig.cognito.region
});

/**
 * Upload a file to S3
 * @param file The file to upload
 * @param key The key to use for the file in S3 (e.g., 'folder/filename.ext')
 * @returns A promise that resolves with the S3 upload result
 */
export const uploadFileToS3 = async (file: File, key: string): Promise<AWS.S3.ManagedUpload.SendData> => {
  const params: AWS.S3.PutObjectRequest = {
    Bucket: awsConfig.s3.bucket,
    Key: key,
    Body: file,
    ContentType: file.type
  };
  
  return s3.upload(params).promise();
};

/**
 * Get a signed URL for downloading a file from S3
 * @param key The key of the file in S3 (e.g., 'folder/filename.ext')
 * @param expiresIn The number of seconds until the URL expires (default: 60)
 * @returns A signed URL for downloading the file
 */
export const getSignedUrlForS3 = (key: string, expiresIn: number = 60): string => {
  const params: AWS.S3.GetObjectRequest = {
    Bucket: awsConfig.s3.bucket,
    Key: key
  };
  
  return s3.getSignedUrl('getObject', {
    ...params,
    Expires: expiresIn
  });
};

/**
 * Sign up a new user with Cognito
 * @param username The username (typically an email address)
 * @param password The password
 * @param attributes Additional user attributes
 * @returns A promise that resolves with the sign-up result
 */
export const signUpWithCognito = async (
  username: string, 
  password: string, 
  attributes: { [key: string]: string }
): Promise<AWS.CognitoIdentityServiceProvider.SignUpResponse> => {
  const userAttributes = Object.entries(attributes).map(([Name, Value]) => ({ Name, Value }));
  
  const params: AWS.CognitoIdentityServiceProvider.SignUpRequest = {
    ClientId: awsConfig.cognito.clientId,
    Username: username,
    Password: password,
    UserAttributes: userAttributes
  };
  
  return cognitoIdentityServiceProvider.signUp(params).promise();
};

/**
 * Sign in a user with Cognito
 * @param username The username (typically an email address)
 * @param password The password
 * @returns A promise that resolves with the authentication result
 */
export const signInWithCognito = async (
  username: string, 
  password: string
): Promise<AWS.CognitoIdentityServiceProvider.InitiateAuthResponse> => {
  const params: AWS.CognitoIdentityServiceProvider.InitiateAuthRequest = {
    ClientId: awsConfig.cognito.clientId,
    AuthFlow: 'USER_PASSWORD_AUTH',
    AuthParameters: {
      USERNAME: username,
      PASSWORD: password
    }
  };
  
  return cognitoIdentityServiceProvider.initiateAuth(params).promise();
};

/**
 * Confirm a user's registration with a verification code
 * @param username The username (typically an email address)
 * @param code The verification code sent to the user
 * @returns A promise that resolves when the confirmation is complete
 */
export const confirmSignUpWithCognito = async (
  username: string, 
  code: string
): Promise<AWS.CognitoIdentityServiceProvider.ConfirmSignUpResponse> => {
  const params: AWS.CognitoIdentityServiceProvider.ConfirmSignUpRequest = {
    ClientId: awsConfig.cognito.clientId,
    Username: username,
    ConfirmationCode: code
  };
  
  return cognitoIdentityServiceProvider.confirmSignUp(params).promise();
};

export default {
  uploadFileToS3,
  getSignedUrlForS3,
  signUpWithCognito,
  signInWithCognito,
  confirmSignUpWithCognito
}; 