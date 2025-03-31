# Welcome to FosterFlow Hub

## Project Info
A private case management system built with React and AWS, vibe-coded with Cursor.

**Repo**: Private GitHub repository (authenticated access required).

## Development Guidelines
- Focus on UI design—Cursor handles backend and deployment automatically.
- See [CONTRIBUTING.md](./CONTRIBUTING.md) for details (if exists).

## Setup
1. **Clone the Repo**: Use SSH or authenticated HTTPS (configured in Cursor or your IDE).  
   - Example: `git clone git@github.com:daneram/fosterflow-hub.git` (if SSH setup).  
2. **Install Dependencies**: `cd fosterflow-hub && npm i`  
3. **Run Locally**: `npm run dev` (starts Vite dev server)  
- Requires Node.js (LTS) - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

## Workflow
- **Vibe Code UI**: Edit React components with Tailwind CSS in Cursor.
- **Backend Automation**: Cursor prompts for backend needs (e.g., "Add API?")—approve with yes/no.
- **Task Tracking**: See `TASKS.md` (UI) and `backendtasks.md` (backend)—updated automatically.
- **Testing**: Jest tests run automatically on code changes and via GitHub Actions.
- **CI/CD**: GitHub Actions runs tests and deploys to AWS testing environment on push.

## Tech Stack
- **Frontend**: Vite, TypeScript, React, shadcn-ui, Tailwind CSS
- **Backend**: AWS Lambda, RDS PostgreSQL, S3, Cognito
- **Tools**: Cursor (AI assistant), MCP (automation), GitHub Actions (CI/CD)

## Deployment
- **Testing**: Automatically deployed to AWS Elastic Beanstalk testing environment on push to main/develop branches.
- **Production**: When UI is ready, Cursor prompts: "Deploy to AWS?"—run `npm run deploy`.
- **Rollback**: Blue-green deployments ensure safe updates.

## Automated Backups
- **GitHub**: Daily commits, hourly change detection, weekly releases (via existing automation).
- **Cursor**: Adds backup branches before major changes (e.g., 'backup-before-vibe-plan').

## GitHub Actions
- **Test**: Runs Jest tests on every push and pull request to main/develop branches.
- **Deploy**: Deploys to AWS testing environment after successful tests on push to main/develop.
- **Secrets**: Required AWS credentials and environment variables must be configured in GitHub repository secrets.

## Custom Domains
- Use AWS Route 53 after deployment—Cursor can guide setup when ready.
