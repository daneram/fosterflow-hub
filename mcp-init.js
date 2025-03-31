#!/usr/bin/env node

/**
 * MCP Initialization Script
 * This script initializes and runs the Multi-Context Processing system
 */

const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

// Configuration
const CONFIG_PATH = path.resolve(__dirname, './mcp.config.js');

// Check if configuration exists
if (!fs.existsSync(CONFIG_PATH)) {
  console.error('Error: MCP configuration file not found.');
  process.exit(1);
}

// Load configuration
const config = require(CONFIG_PATH);
console.log('MCP configuration loaded successfully.');

// Initialize MCP system
function initMcp() {
  console.log('Initializing MCP system...');
  
  // Create necessary directories
  if (config.contextTracking.enabled) {
    const docPath = path.dirname(config.contextTracking.documentationPath);
    if (!fs.existsSync(docPath)) {
      fs.mkdirSync(docPath, { recursive: true });
      console.log(`Created documentation directory: ${docPath}`);
    }
  }
  
  // Set up Git hooks if Git automation is enabled
  if (config.automations.git && config.automations.git.enabled) {
    setupGitHooks();
  }
  
  console.log('MCP system initialized successfully.');
  startMcp();
}

// Set up Git hooks
function setupGitHooks() {
  console.log('Setting up Git hooks...');
  
  const hookScript = `#!/bin/sh
# MCP Git pre-commit hook
node -e "
  const files = process.env.STAGED_FILES ? process.env.STAGED_FILES.split(' ') : [];
  const config = require('${CONFIG_PATH.replace(/\\/g, '\\\\')}');
  const commitPaths = config.automations.git.commitOnChanges;
  
  // Check if any changed files match the configured paths
  const relevantChanges = files.filter(file => 
    commitPaths.some(path => file.startsWith(path))
  );
  
  if (relevantChanges.length > 0) {
    const msg = config.automations.git.commitMessage.replace('{files}', relevantChanges.join(', '));
    console.log('MCP auto-commit message: ' + msg);
    process.env.GIT_COMMIT_MSG = msg;
  }
"
`;

  // Create .git/hooks directory if it doesn't exist
  const hooksDir = path.resolve(__dirname, '.git/hooks');
  if (!fs.existsSync(hooksDir)) {
    fs.mkdirSync(hooksDir, { recursive: true });
  }
  
  // Write pre-commit hook
  const preCommitPath = path.resolve(hooksDir, 'pre-commit');
  fs.writeFileSync(preCommitPath, hookScript);
  fs.chmodSync(preCommitPath, '755');
  
  console.log('Git hooks set up successfully.');
}

// Start MCP monitoring
function startMcp() {
  console.log('Starting MCP monitoring...');
  
  if (!config.monitoring.enabled) {
    console.log('Monitoring is disabled in configuration. Exiting.');
    return;
  }
  
  const watchDirs = config.monitoring.watchDirectories.join(' ');
  console.log(`Watching directories: ${watchDirs}`);
  
  // In a real implementation, you would set up file watchers here
  // This is a simplified example
  console.log('MCP is now running and monitoring project files.');
  console.log('Press Ctrl+C to stop.');
}

// Execute the initialization
initMcp(); 