# Repository layout (Aura Fit)

Recommended setup on your machine:

```text
parent-folder/
  aura-fit/          ← Git remote: monorepo (server, mobile web, web-portal)
  aura-fit-native/   ← Git remote: this React Native WebView shell (this repo)
```

Do **not** nest one repo inside the other’s `.git` directory. Keeping `aura-fit` and `aura-fit-native` as **sibling folders** avoids accidental commits and keeps CI/deploy simple.

If you previously initialized `git` at a parent folder that contains both projects, split them into two clones/remotes as above before long-term work.
