/**
 * Multi-Context Processing (MCP) Configuration
 * This configuration automates file creation, Git commits with 'UI update', and project context tracking
 */

module.exports = {
  // Project monitoring settings
  monitoring: {
    enabled: true,
    watchDirectories: ['src', 'public'],
    excludePaths: ['node_modules', 'dist', '.git'],
    fileTypes: ['.ts', '.tsx', '.js', '.jsx', '.html', '.css', '.scss']
  },

  // Automated actions on changes
  automations: {
    // File creation templates
    fileTemplates: {
      component: {
        path: 'src/components/{name}/{name}.tsx',
        template: `import React from 'react';

interface {name}Props {
  // Define props here
}

export function {name}({ ...props }: {name}Props) {
  return (
    <div className="component-{name}">
      {/* {name} component content */}
    </div>
  );
}
`
      },
      service: {
        path: 'src/services/{name}.service.ts',
        template: `/**
 * {name} Service
 */

export class {name}Service {
  // Service implementation
}
`
      }
    },
    
    // Git automation
    git: {
      enabled: true,
      commitMessage: 'UI update: {files}',
      commitOnChanges: ['src/components', 'src/pages'],
      autoStage: true,
      autoCommitThreshold: {
        timeInterval: 30, // minutes
        fileCount: 5     // files changed
      }
    }
  },
  
  // Project context tracking
  contextTracking: {
    enabled: true,
    trackDependencies: true,
    trackComponentRelationships: true,
    generateDocumentation: true,
    documentationPath: 'docs/project-context.md',
    updateFrequency: 'daily' // or 'hourly', 'weekly'
  },
  
  // Notification settings
  notifications: {
    enabled: true,
    channels: ['console'], // or 'slack', 'email'
    events: ['git-commit', 'file-created', 'context-updated']
  }
}; 