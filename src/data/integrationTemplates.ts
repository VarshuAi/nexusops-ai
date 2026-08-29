export const GITHUB_ACTION_WORKFLOW = `name: NexusOps AI - Autonomous PR Review & Security Gate

on:
  pull_request:
    types: [opened, synchronize, reopened]
  workflow_dispatch:

permissions:
  contents: write
  pull-requests: write
  security-events: write

jobs:
  nexusops-agent-review:
    name: 🤖 NexusOps Autonomous Multi-Agent Gate
    runs-on: ubuntu-latest
    steps:
      - name: 📥 Checkout Repository
        uses: actions/checkout@v4
        with:
          fetch-depth: 0

      - name: ⚙️ Setup Node.js Environment
        uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: 'npm'

      - name: 🚀 Run NexusOps Multi-Agent Scanner
        uses: nexusops-ai/action-pr-review@v2
        with:
          github-token: \${{ secrets.GITHUB_TOKEN }}
          anthropic-api-key: \${{ secrets.ANTHROPIC_API_KEY }}
          gemini-api-key: \${{ secrets.GEMINI_API_KEY }}
          security-threshold: 'CRITICAL,HIGH'
          auto-apply-safe-patches: 'true'
          generate-unit-tests: 'true'
          comment-mode: 'inline_diff'
          report-format: 'sarif,markdown'

      - name: 📊 Upload SARIF Security Findings
        uses: github/codeql-action/upload-sarif@v3
        if: always()
        with:
          sarif_file: 'nexusops-report.sarif'
`;

export const CLI_INSTALL_COMMANDS = {
  npm: 'npx nexusops-ai scan . --agents all --output markdown',
  docker: 'docker run --rm -v $(pwd):/workspace ghcr.io/nexusops-ai/engine:latest scan /workspace',
  curl: 'curl -sSL https://nexusops.dev/install.sh | bash',
  brew: 'brew install nexusops/tap/nexusops-cli'
};
