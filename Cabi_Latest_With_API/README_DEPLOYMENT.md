# 🚀 CAB-I-NET Netlify Deployment

## Quick Start

### 1. Prerequisites
- Node.js 18+ installed
- Firebase project configured
- Netlify account

### 2. Environment Setup
```bash
# Copy environment template
cp env.template .env.local

# Edit .env.local with your Firebase config
```

### 3. Deploy to Netlify

#### Option A: Git Integration (Recommended)
1. Push code to GitHub/GitLab
2. Connect repository to Netlify
3. Set environment variables in Netlify dashboard
4. Deploy automatically

#### Option B: Manual Deploy
```bash
# Install dependencies
npm install

# Build for production
npm run build:netlify

# Deploy (requires Netlify CLI)
npm install -g netlify-cli
netlify login
netlify deploy --prod --dir=dist/spa
```

## 🔧 Required Environment Variables

Set these in Netlify dashboard:

```bash
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

## 📁 Build Configuration

- **Build Command**: `npm run build:netlify`
- **Publish Directory**: `dist/spa`
- **Functions Directory**: `netlify/functions`

## 🔗 Important Links

- [Full Deployment Guide](./NETLIFY_DEPLOYMENT.md)
- [Firebase Setup Guide](./FIREBASE_SETUP.md)
- [Netlify Documentation](https://docs.netlify.com/)

## 🚨 Common Issues

1. **Build fails**: Check Node.js version (18+)
2. **Firebase errors**: Verify environment variables
3. **Routing issues**: Check netlify.toml redirects
4. **API not working**: Check function logs

## 📞 Support

- Check [NETLIFY_DEPLOYMENT.md](./NETLIFY_DEPLOYMENT.md) for detailed guide
- Review build logs in Netlify dashboard
- Test locally with `npm run dev`

---

**Ready to deploy? Follow the [Full Deployment Guide](./NETLIFY_DEPLOYMENT.md)! 🚀** 