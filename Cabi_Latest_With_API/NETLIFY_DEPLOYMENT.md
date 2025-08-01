# Netlify Deployment Guide for CAB-I-NET

## 🚀 Quick Deploy

### Option 1: Deploy from Git (Recommended)

1. **Connect to Git Repository**
   - Go to [Netlify](https://netlify.com)
   - Click "New site from Git"
   - Connect your GitHub/GitLab/Bitbucket account
   - Select your repository: `Final-Cabinet/Cabi_Latest_With_API`

2. **Configure Build Settings**
   - **Build command**: `npm run build:netlify`
   - **Publish directory**: `dist/spa`
   - **Functions directory**: `netlify/functions`

3. **Set Environment Variables**
   - Go to Site Settings > Environment Variables
   - Add the following variables:

### Required Environment Variables

```bash
# Firebase Configuration
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id

# Optional: Analytics
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id

# Environment
NODE_ENV=production
```

### Option 2: Manual Deploy

1. **Build Locally**
   ```bash
   npm install
   npm run build:netlify
   ```

2. **Deploy to Netlify**
   ```bash
   # Install Netlify CLI
   npm install -g netlify-cli
   
   # Login to Netlify
   netlify login
   
   # Deploy
   netlify deploy --prod --dir=dist/spa
   ```

## 🔧 Configuration Files

### netlify.toml
- Build settings and redirects
- Security headers
- Caching rules
- Function configuration

### netlify/functions/api.ts
- Serverless function for API routes
- CORS handling
- Error handling

## 📁 Project Structure

```
Cabi_Latest_With_API/
├── client/                 # React frontend
├── server/                 # Express backend
├── netlify/
│   └── functions/
│       └── api.ts         # Netlify serverless function
├── netlify.toml           # Netlify configuration
├── package.json           # Dependencies and scripts
└── vite.config.ts         # Vite build configuration
```

## 🔒 Security & Performance

### Security Headers
- X-Frame-Options: DENY
- X-XSS-Protection: 1; mode=block
- Content-Security-Policy: Configured for Firebase
- Referrer-Policy: strict-origin-when-cross-origin

### Caching
- Static assets: 1 year cache
- Images: 1 year cache
- API responses: No cache (dynamic)

### Performance Optimizations
- Code splitting with manual chunks
- Vendor bundle separation
- Firebase bundle optimization
- Source maps only in development

## 🚨 Troubleshooting

### Common Issues

1. **Build Fails**
   - Check Node.js version (18+ required)
   - Verify all environment variables are set
   - Check build logs in Netlify dashboard

2. **Firebase Not Working**
   - Verify Firebase config environment variables
   - Check Firebase project settings
   - Ensure Firebase Auth domain is correct

3. **API Routes Not Working**
   - Check netlify/functions/api.ts
   - Verify redirects in netlify.toml
   - Check function logs in Netlify dashboard

4. **Routing Issues**
   - Verify SPA redirect rule in netlify.toml
   - Check React Router configuration
   - Ensure all routes redirect to index.html

### Debug Commands

```bash
# Test build locally
npm run build:netlify

# Test functions locally
netlify dev

# Check function logs
netlify functions:list
netlify functions:invoke api
```

## 📊 Monitoring

### Netlify Analytics
- Enable in Site Settings > Analytics
- Track page views and performance

### Function Monitoring
- Check function logs in Netlify dashboard
- Monitor function execution times
- Set up alerts for errors

## 🔄 Continuous Deployment

### Automatic Deploys
- Push to main branch triggers deploy
- Preview deploys for pull requests
- Branch deploys for feature branches

### Environment-Specific Variables
- Production: Set in Netlify dashboard
- Development: Use .env.local file
- Preview: Use branch-specific variables

## 🎯 Best Practices

1. **Environment Variables**
   - Never commit sensitive data
   - Use Netlify's environment variable management
   - Test with different environments

2. **Performance**
   - Optimize images and assets
   - Use code splitting
   - Monitor bundle sizes

3. **Security**
   - Keep dependencies updated
   - Use security headers
   - Validate all inputs

4. **Monitoring**
   - Set up error tracking
   - Monitor performance metrics
   - Use Netlify's built-in analytics

## 📞 Support

For deployment issues:
1. Check Netlify documentation
2. Review build logs
3. Test locally first
4. Contact support if needed

---

**Happy Deploying! 🚀** 