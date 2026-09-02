# GitHub Pages Deployment

This repository is configured to automatically deploy to GitHub Pages at `https://ipython.github.io` (or `https://ipython.github.com` which still works).

## Setup Instructions

### 1. Enable GitHub Pages

1. Go to your repository Settings → Pages
   - Or visit: `https://github.com/ipython/[this-repo]/settings/pages`
2. Under "Source", select **"GitHub Actions"** (not "Deploy from a branch")
3. Save the settings

### 2. Deploy

The workflow will automatically run on every push to the `main` branch. You can also manually trigger it:

1. Go to Actions tab
2. Select "Deploy to GitHub Pages" workflow
3. Click "Run workflow" → "Run workflow"

## How It Works

The deployment workflow:

1. **Builds the site** from the `main` branch
2. **Uploads** the built files as an artifact
3. **Deploys** to GitHub Pages (which serves from the `gh-pages` branch automatically)
4. Makes the site available at `https://ipython.github.io/[repo-name]` or `https://ipython.github.com/[repo-name]`

## Configuration

The build uses these environment variables:

- `BASE_PATH`: empty for the root domain, `/repo-name` for a project page.
  Set automatically in the workflow.
- `SITE_URL`: canonical site URL, defaults to `https://ipython.org`.
- `GITHUB_TOKEN`: optional. Raises the GitHub API rate limit so the build can
  fetch contributor names. If it is missing or invalid the build falls back
  to anonymous requests and then to `src/data/fallback/build-data.json`; it
  never fails because of the API.

## Build-time data

`src/lib/buildData.ts` fetches the latest release from PyPI and repository
stats from GitHub once per build. To refresh the committed fallback after a
successful build, copy the values printed in the build log into
`src/data/fallback/build-data.json`.

## Screenshots

```
pip install playwright && playwright install chromium
npm run build
python scripts/screenshot.py shots- "" install learn cheatsheet
DARK=1 python scripts/screenshot.py shots-dark- ""
MOBILE=1 python scripts/screenshot.py shots-mobile- ""
```

## Troubleshooting

### "Permission denied" errors

- Ensure GitHub Pages is enabled in repository settings
- Check that the workflow has the correct permissions (should be automatic)

### Build succeeds but site doesn't update

- Check the Actions logs for the deploy step
- Wait a few minutes for GitHub Pages to rebuild
- Verify the Pages source is set to "GitHub Actions" not a branch

### Site not accessible

- Check repository visibility (public repos work automatically)
- Verify the repository name matches the expected GitHub Pages URL pattern
- For organization repos, ensure Pages is enabled at the organization level if needed
