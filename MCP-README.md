# Multi-Context Processing (MCP)

MCP is a configuration-based automation system that helps streamline your development workflow by automating repetitive tasks, tracking project context, and enabling consistent Git commits.

## Features

- **Automated File Creation**: Create new components and services using predefined templates
- **Git Automation**: Automatically stage and commit changes with consistent "UI update" messages
- **Project Context Tracking**: Generate documentation that tracks component relationships and dependencies
- **File Monitoring**: Watch specific directories for changes and trigger automated actions

## Installation

The MCP system is already set up in this project. To install dependencies:

```bash
npm install
```

## Usage

### Starting MCP

To start the MCP system, run:

```bash
npm run mcp
```

This will initialize the MCP system and start monitoring your project files.

### Creating Files from Templates

MCP comes with predefined templates for components and services. You can create new files using these templates programmatically:

```javascript
const { createFileFromTemplate } = require('./mcp-watcher');
createFileFromTemplate('component', 'MyNewComponent');
```

This will create a new component in `src/components/MyNewComponent/MyNewComponent.tsx`.

### Git Automation

MCP will automatically stage and commit changes to files in the configured directories (by default `src/components` and `src/pages`) with commit messages like:

```
UI update: Button.tsx, Header.tsx
```

### Project Context Documentation

MCP generates project context documentation that helps understand component relationships and dependencies. This is stored in the configured documentation path (by default `docs/project-context.md`).

## Configuration

MCP is configured in the `mcp.config.js` file. You can customize:

- Directories to watch for changes
- File types to monitor
- File templates
- Git automation settings
- Context tracking options
- And more

Example configuration:

```javascript
module.exports = {
  monitoring: {
    enabled: true,
    watchDirectories: ['src', 'public'],
    excludePaths: ['node_modules', 'dist', '.git'],
    fileTypes: ['.ts', '.tsx', '.js', '.jsx', '.html', '.css', '.scss']
  },
  automations: {
    fileTemplates: {
      component: { 
        path: 'src/components/{name}/{name}.tsx',
        // template content...
      },
      // more templates...
    },
    git: {
      enabled: true,
      commitMessage: 'UI update: {files}',
      commitOnChanges: ['src/components', 'src/pages'],
      autoStage: true
    }
  },
  contextTracking: {
    enabled: true,
    trackDependencies: true,
    trackComponentRelationships: true,
    generateDocumentation: true,
    documentationPath: 'docs/project-context.md',
    updateFrequency: 'daily'
  }
};
```

## Scripts

The following npm scripts are available:

- `npm run mcp:init`: Initialize the MCP system
- `npm run mcp:watch`: Start the file watcher
- `npm run mcp`: Run both initialization and file watching 