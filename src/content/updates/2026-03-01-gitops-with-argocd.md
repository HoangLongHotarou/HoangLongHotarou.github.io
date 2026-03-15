---
title: GitOps with ArgoCD — From Theory to Production
date: 2026-03-01
summary: How to use ArgoCD to drive cluster state from Git, enabling automated, auditable deployments with rollback in seconds.
---

# GitOps with ArgoCD — From Theory to Production

GitOps treats your Git repository as the single source of truth for cluster state. ArgoCD continuously reconciles what's in Git with what's running in Kubernetes.

## Why GitOps?

Traditional push-based CI/CD (GitHub Actions → `kubectl apply`) has risks:

- **No drift detection** — someone `kubectl apply`s a hotfix and Git falls out of sync
- **No audit trail** — you see who triggered the pipeline, not what changed in the cluster
- **Rollback is hard** — requires re-running an old pipeline

GitOps solves all three.

## ArgoCD Application Manifest

```yaml
apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: portfolio-app
  namespace: argocd
spec:
  source:
    repoURL: https://github.com/HoangLongHotarou/portfolio
    targetRevision: main
    path: k8s/
  destination:
    server: https://kubernetes.default.svc
    namespace: default
  syncPolicy:
    automated:
      prune: true
      selfHeal: true
```

## Branching Strategy

Use environment branches to map Git branches to clusters:

- `main` → production cluster (manual sync gate)
- `staging` → staging cluster (auto-synced)
- Feature branches → preview environments via ApplicationSets

## Rollback in Seconds

ArgoCD keeps a full history of every sync. Rolling back is as simple as clicking **Rollback to revision 42** in the UI, or running:

```bash
argocd app rollback portfolio-app 42
```

## Lessons Learned

1. **Seal your secrets early** — use Sealed Secrets or External Secrets Operator before adopting GitOps; plain secrets in Git are a security incident waiting to happen
2. **Enable notifications** — ArgoCD's notification engine integrates with Slack/Teams to alert on sync failures
3. **Start with one app** — validate the pattern on a low-risk service before migrating your entire fleet
