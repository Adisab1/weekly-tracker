# Deployment Guide

## 🌐 Deploy to GitHub Pages

### Step 1: Create Repository

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/yourusername/life-weeks-tracker.git
git push -u origin main
```

### Step 2: Build and Deploy

```bash
npm run build
git add dist/
git commit -m "Build production"
git push
```

### Step 3: Enable GitHub Pages

1. Go to Settings → Pages
2. Select "Deploy from a branch"
3. Choose "main" and "/dist" folder
4. Click Save

Your app will be available at: `https://yourusername.github.io/life-weeks-tracker`

---

## 🚀 Deploy to Netlify

### Option 1: Via Netlify UI

1. Go to [netlify.com](https://netlify.com) and sign up
2. Click "New site from Git"
3. Select your GitHub repository
4. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
5. Click Deploy

### Option 2: Via Netlify CLI

```bash
npm i -g netlify-cli
netlify login
netlify deploy --prod --dir dist
```

---

## ⚡ Deploy to Vercel

### Step 1: Install Vercel CLI

```bash
npm i -g vercel
```

### Step 2: Deploy

```bash
vercel
```

Follow the prompts to complete deployment.

---

## 🐳 Deploy with Docker

Create `Dockerfile`:

```dockerfile
FROM node:18-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:18-alpine
WORKDIR /app
RUN npm install -g serve
COPY --from=build /app/dist ./dist
EXPOSE 3000
CMD ["serve", "-s", "dist", "-l", "3000"]
```

Build and run:

```bash
docker build -t life-weeks-tracker .
docker run -p 3000:3000 life-weeks-tracker
```

---

## 📊 Performance Optimization

### Before Publishing

1. **Audit Performance**:
   ```bash
   npm run build
   npm run preview
   # Open DevTools → Lighthouse
   ```

2. **Check Bundle Size**:
   ```bash
   npm install -D rollup-plugin-visualizer
   ```

3. **Test Mobile**: Use Chrome DevTools device emulation

### Recommended CDN Configuration

- Enable gzip compression
- Set cache headers for static assets
- Use minified CSS/JS
- Optimize images (if added)

---

## 🔒 Security Checklist

- [ ] No sensitive data in code
- [ ] No API keys exposed
- [ ] CSP headers configured
- [ ] HTTPS enabled on domain
- [ ] Remove console logs in production
- [ ] Regular security updates

---

## 📈 Monitoring

### Google Analytics Integration

Add to `public/index.html`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_ID');
</script>
```

---

## 🌍 Domain Setup

### Nameserver Configuration

For Netlify:
```
Use Netlify's nameservers from your site settings
```

For GitHub Pages + Custom Domain:
1. Add CNAME file to `public/` with your domain
2. Update GitHub Pages settings
3. Configure DNS A records to GitHub IPs

---

## 🔄 Continuous Deployment

### GitHub Actions

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run build
      - uses: actions/upload-artifact@v3
        with:
          name: dist
          path: dist
```

---

## 💡 Post-Deployment

1. **Test Thoroughly**
   - Test all features on deployed site
   - Test on multiple devices/browsers
   - Verify data persistence

2. **Gather Feedback**
   - Share with friends/family
   - Collect suggestions
   - Iterate and improve

3. **Regular Maintenance**
   - Update dependencies monthly
   - Monitor for errors
   - Keep security updated

---

**Happy deploying! 🚀**
