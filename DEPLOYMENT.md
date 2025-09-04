# 🚀 Deployment Guide - YESSplora Frontend

This guide will help you deploy the YESSplora Frontend to GitHub Pages.

## 📋 Prerequisites

- GitHub account
- Node.js 16+ installed
- Git installed
- Repository cloned locally

## 🔧 Setup Steps

### 1. Update Homepage URL

Edit `package.json` and update the `homepage` field with your GitHub username:

```json
{
  "homepage": "https://YOUR_USERNAME.github.io/YESSplora-Frontend"
}
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Build the Project

```bash
npm run build
```

### 4. Deploy to GitHub Pages

```bash
npm run deploy
```

## 🤖 Automatic Deployment (Recommended)

### GitHub Actions Setup

1. **Push your code to GitHub**
   ```bash
   git add .
   git commit -m "Setup GitHub Pages deployment"
   git push origin main
   ```

2. **Enable GitHub Pages**
   - Go to your repository on GitHub
   - Click **Settings** → **Pages**
   - Under **Source**, select **GitHub Actions**
   - The workflow will automatically deploy on every push to main

3. **Check Deployment**
   - Go to **Actions** tab in your repository
   - Monitor the deployment workflow
   - Your site will be available at: `https://YOUR_USERNAME.github.io/YESSplora-Frontend`

## 🛠️ Manual Deployment

### Option 1: Using npm scripts

```bash
# Build and deploy in one command
npm run deploy
```

### Option 2: Using the deployment script

```bash
# Make script executable (first time only)
chmod +x deploy.sh

# Run deployment
./deploy.sh
```

### Option 3: Step by step

```bash
# 1. Build the project
npm run build

# 2. Deploy to GitHub Pages
npx gh-pages -d build
```

## 🔍 Troubleshooting

### Common Issues

1. **Build fails**
   - Check for syntax errors in your code
   - Ensure all dependencies are installed
   - Run `npm run build` locally to debug

2. **Deployment fails**
   - Check GitHub Actions logs
   - Ensure repository has proper permissions
   - Verify `homepage` URL in package.json

3. **Site shows README instead of app**
   - Ensure GitHub Pages is set to deploy from `gh-pages` branch
   - Check that build files are in the correct location
   - Verify the `homepage` field in package.json

4. **Assets not loading**
   - Check that all paths are relative
   - Ensure `homepage` field is correct
   - Verify build output structure

### Debugging Steps

1. **Check build output**
   ```bash
   ls -la build/
   ```

2. **Verify package.json**
   ```bash
   cat package.json | grep homepage
   ```

3. **Check GitHub Pages settings**
   - Repository → Settings → Pages
   - Ensure source is set correctly

4. **Monitor GitHub Actions**
   - Go to Actions tab
   - Check workflow runs for errors

## 📱 PWA Considerations

### HTTPS Required
- GitHub Pages provides HTTPS by default
- PWA features require secure context
- Service worker will only work over HTTPS

### Manifest Updates
- Update `public/manifest.json` with correct URLs
- Ensure icons are accessible
- Test PWA installation

## 🔄 Continuous Deployment

### Automatic Updates
- Every push to `main` branch triggers deployment
- GitHub Actions builds and deploys automatically
- No manual intervention required

### Rollback
- Previous deployments are preserved
- Can revert to earlier versions if needed
- Check Actions history for previous builds

## 📊 Monitoring

### Deployment Status
- Check GitHub Actions for build status
- Monitor deployment logs for errors
- Verify site accessibility after deployment

### Performance
- Use Lighthouse to audit PWA features
- Monitor Core Web Vitals
- Check mobile responsiveness

## 🆘 Support

If you encounter issues:

1. Check the troubleshooting section above
2. Review GitHub Actions logs
3. Verify all configuration files
4. Test locally before deploying

---

**Happy Deploying! 🎉**
