## CI/CD PipeLine for Frontend PipeLine

***For a frontend application (React, Angular, Vue, etc.), the goal of a CI/CD pipeline is to ensure that every code change is automatically tested, built, and deployed safely across environments like***

```Development → QA → Staging → Production.```


### A typical architecture looks like this:

```
Developer
    │
    ▼
Git (Feature Branch)
    │
    ▼
Pull Request
    │
    ▼
──────────── CI ────────────
✔ Install dependencies
✔ Lint
✔ Unit Tests
✔ Build
✔ Security Scan
✔ Bundle Size Check
    │
    ▼
Merge to main
    │
    ▼
──────────── CD ────────────
Deploy → Dev
      │
Smoke Tests
      │
Deploy → QA
      │
Automation Tests
      │
Deploy → Staging
      │
UAT
      │
Manual Approval
      │
Deploy → Production
```


## Jenkins

Jenkins is neither a CI tool nor a CD tool. It is a CI/CD automation server (orchestrator) that can perform both CI and CD depending on how you configure the pipeline.

### Jenkins can be used for both CI and CD
```
                Jenkins
                   │
        ┌──────────┴──────────┐
        │                     │
        ▼                     ▼
   Continuous            Continuous
   Integration           Deployment

```

# How Jenkins Knows When to Trigger a Pipeline

## Overview

Jenkins does not automatically know when code changes occur. It must
either:

1.  Be notified by the Git provider (Webhook) **(Most Common)**
2.  Periodically check the repository (Poll SCM)
3.  Be started manually
4.  Run on a schedule (Cron)

------------------------------------------------------------------------

# 1. GitHub Webhooks (Recommended)

``` text
Developer
    │
git push
    │
    ▼
GitHub
    │
HTTP POST (Webhook)
    ▼
Jenkins
    │
Starts Pipeline
```

## How it works

``` bash
git push origin feature/login
```

GitHub immediately sends an HTTP POST request to Jenkins:

``` text
POST https://jenkins.company.com/github-webhook/
```

Example payload:

``` json
{
  "event": "push",
  "branch": "feature/login",
  "commit": "abc123",
  "repository": "ui"
}
```

Jenkins receives the event and starts the configured pipeline.

## GitHub Configuration

Repository → Settings → Webhooks → Add Webhook

``` text
Payload URL:
https://jenkins.company.com/github-webhook/

Events:
✓ Push
✓ Pull Request
```

## Jenkins Configuration

Install the GitHub plugin and configure:

``` text
Source Code Management
    ↓
Git Repository URL
```

Enable:

``` text
Build Triggers
☑ GitHub hook trigger for GITScm polling
```

------------------------------------------------------------------------

# 2. Poll SCM

If webhooks are unavailable (e.g., firewall restrictions), Jenkins can
periodically check Git.

``` text
Every 5 minutes
      │
      ▼
Has Git Changed?
      │
      ├── No → Wait
      └── Yes → Start Pipeline
```

Example cron:

``` text
H/5 * * * *
```

Internally Jenkins performs:

``` bash
git fetch
```

and compares the latest commit with the previous one.

------------------------------------------------------------------------

# 3. Manual Trigger

A user can manually click **Build Now**.

``` text
Release Manager
      │
      ▼
Build Now
      │
      ▼
Pipeline Starts
```

Commonly used for production deployments.

------------------------------------------------------------------------

# 4. Scheduled Trigger

Jenkins can execute pipelines on a schedule.

Example:

``` text
Every day at 2:00 AM
```

Cron:

``` text
0 2 * * *
```

Typical uses:

-   Nightly builds
-   Regression testing
-   Security scans
-   Dependency updates

------------------------------------------------------------------------

# Pull Request Flow

``` text
Developer
    │
git push
    │
    ▼
GitHub
    │
Webhook
    ▼
Jenkins
    │
Checkout Code
    │
npm ci
    │
npm test
    │
npm run build
    │
Status Returned
    ▼
GitHub Pull Request
```

------------------------------------------------------------------------

# After Merge

``` text
Merge PR
    │
    ▼
GitHub
    │
Webhook
    ▼
Jenkins
    │
Deployment Pipeline
```

------------------------------------------------------------------------

# How Jenkins Chooses the Pipeline

Example jobs:

``` text
UI-Feature-Build
UI-Main-Deploy
```

Webhook payload:

``` text
Branch = feature/login
```

Runs:

``` text
UI-Feature-Build
```

Webhook payload:

``` text
Branch = main
```

Runs:

``` text
UI-Main-Deploy
```

The branch information in the webhook payload determines which Jenkins
pipeline executes.

------------------------------------------------------------------------

# Complete Flow

``` text
Developer
     │
git push
     │
     ▼
GitHub Repository
     │
HTTP POST (Webhook)
     ▼
Jenkins
     │
Receives Event
     │
Reads Branch
     │
Loads Jenkinsfile
     │
Creates Build Agent
     │
Checks Out Code
     │
Runs CI/CD Pipeline
     ▼
Deployment Complete
```

------------------------------------------------------------------------

# Trigger Comparison

  Trigger Method           Common Today?   Description
  ------------------------ --------------- --------------------------------
  GitHub/GitLab Webhooks   ✅ Yes          Event-driven and immediate
  Poll SCM                 ⚠️ Sometimes    Periodically checks repository
  Manual Trigger           ✅ Yes          User starts pipeline
  Scheduled (Cron)         ✅ Yes          Nightly jobs and maintenance

## Key Takeaway

Modern CI/CD pipelines primarily use **webhooks**. GitHub or GitLab
notifies Jenkins immediately after a push, merge, or pull request event.
Jenkins receives the event, identifies the branch, loads the appropriate
`Jenkinsfile`, provisions a build agent, and executes the CI/CD
pipeline.
