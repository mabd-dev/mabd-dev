# How to Update OSS Contributions Stats

This guide explains how to manually run the workflow to update your OSS contributions data.

## Prerequisites ✅

You've already completed this:
- Creat Personal Access Token
- Add `GH_OSS_TOKEN` secret to repository

## How to Run the Workflow

### Method 1: GitHub Web UI (Easiest)

1. Go to your repository on GitHub
2. Click **"Actions"** tab
3. Click **"Update OSS Contributions"** in the left sidebar
4. Click **"Run workflow"** button (top right)
5. Select branch (usually `main`)
6. Click green **"Run workflow"** button
7. Wait for completion (~1-2 minutes)

### Method 2: GitHub CLI

```bash
gh workflow run update-oss-stats.yml
```

Check status:
```bash
gh run list --workflow=update-oss-stats.yml
```

## What the Workflow Does

1. **Installs** `gh-oss-stats` tool
2. **Runs** with these arguments:
   ```bash
   --user mabd-dev
   --include-loc=true
   -v=true
   --exclude-orgs="gh-oss-tools"
   -o scripts/oss-contributions/contributions.json
   ```
3. **Commits** the JSON file with:
   - Username: `MABD`
   - Email: `mabd.universe@gmail.com`
4. **Pushes** to the repository
5. **Uploads** artifact as backup (retained for 30 days)

## Output Location

The generated file is saved at:
```
scripts/oss-contributions/contributions.json
```

## Viewing Results

### After Workflow Completes

**Option A: Check the commit**
- Go to your repository
- Look for latest commit: "Update OSS contributions data"
- View `scripts/oss-contributions/contributions.json`

**Option B: Download artifact**
- Go to Actions tab
- Click on the workflow run
- Scroll down to "Artifacts"
- Download `oss-contributions`

## Customizing the Workflow

If you want to change parameters, edit `.github/workflows/update-oss-stats.yml`:

### Change Arguments

```yaml
- name: Run gh-oss-stats
  env:
    GITHUB_TOKEN: ${{ secrets.GH_OSS_TOKEN }}
  run: |
    gh-oss-stats \
      --user YOUR_USERNAME \           # Change username
      --include-loc=true \
      --min-stars 50 \                 # Add star filter
      --max-prs 1000 \                 # Increase PR limit
      --exclude-orgs="org1,org2" \     # Exclude multiple orgs
      -o scripts/oss-contributions/contributions.json
```

### Change Output Path

```yaml
-o scripts/my-stats/stats.json  # Custom path
```

### Add Schedule (Auto-run)

If you later want automatic updates, add to the `on:` section:

```yaml
on:
  workflow_dispatch:  # Keep manual trigger
  schedule:
    - cron: '0 0 * * 0'  # Every Sunday at midnight UTC
```

## Troubleshooting

### ❌ "Error: Bad credentials"

**Problem**: Token is invalid or expired

**Fix**:
1. Create new token: https://github.com/settings/tokens
2. Update secret: Repo → Settings → Secrets → Actions → `GH_OSS_TOKEN`

### ❌ "Error: User not found: MABD"

**Problem**: Username in workflow is wrong

**Fix**: Edit workflow file, change `--user` value

### ❌ "Nothing to commit"

**Problem**: No changes since last run

**Solution**: This is normal! The workflow skips commit if data hasn't changed.

### ❌ "Permission denied" when pushing

**Problem**: Repository permissions issue

**Fix**:
1. Go to Settings → Actions → General
2. Scroll to "Workflow permissions"
3. Select "Read and write permissions"
4. Click "Save"

### ⚠️ "API rate limit exceeded"

**Problem**: Token hit rate limit

**Fix**:
- Wait 1 hour for reset
- Check token is valid: `echo ${{ secrets.GH_OSS_TOKEN }}`
- Verify token has no unnecessary scopes

## Workflow Status Badge

Add this badge to your README to show workflow status:

```markdown
[![Update OSS Stats](https://github.com/gh-oss-tools/gh-oss-stats/actions/workflows/update-oss-stats.yml/badge.svg)](https://github.com/gh-oss-tools/gh-oss-stats/actions/workflows/update-oss-stats.yml)
```

## Advanced: Parameterized Manual Runs

You can add inputs to customize each run:

```yaml
on:
  workflow_dispatch:
    inputs:
      min_stars:
        description: 'Minimum stars filter'
        required: false
        default: '0'
      max_prs:
        description: 'Maximum PRs to fetch'
        required: false
        default: '500'
```

Then use in the workflow:
```yaml
--min-stars ${{ github.event.inputs.min_stars }}
```

## Security Notes

✅ **Good practices:**
- Token stored as secret (encrypted)
- Workflow only runs when you trigger it
- Token only used for reading public data
- Commits signed with your info

❌ **Don't:**
- Share your `GH_OSS_TOKEN` secret value
- Commit tokens to the repository
- Give token unnecessary scopes

## Quick Reference

| Action | Command |
|--------|---------|
| **Run workflow** | Actions → Update OSS Contributions → Run workflow |
| **View output** | Check latest commit → `scripts/oss-contributions/contributions.json` |
| **Download artifact** | Workflow run → Artifacts → Download |
| **Check logs** | Workflow run → Click on job → Expand steps |

## Next Steps

After running the workflow, you can:
- 📊 Use the JSON data to create visualizations
- 🌐 Display stats on your website/portfolio
- 📈 Track your OSS contributions over time
- 🔄 Run periodically to keep data fresh

---

**Ready to run?** Go to Actions → Update OSS Contributions → Run workflow! 🚀
