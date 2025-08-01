# 🚀 CAB-I-NET Deployment Checklist

## ✅ Pre-Deployment Checks

### 1. Route Configuration
- [ ] All routes defined in `client/routes.ts`
- [ ] App.tsx uses centralized route constants
- [ ] Catch-all route (`*`) properly configured
- [ ] NotFound component implemented and styled

### 2. Netlify Configuration
- [ ] `netlify.toml` has proper SPA redirects
- [ ] Force flag set on main redirect rule
- [ ] Additional redirects for common patterns
- [ ] Trailing slash handling configured

### 3. Build Configuration
- [ ] `package.json` has correct build scripts
- [ ] `vite.config.ts` optimized for production
- [ ] Output directory set to `dist/spa`
- [ ] Source maps disabled in production

### 4. Environment Variables
- [ ] Firebase configuration variables set
- [ ] Environment template file created
- [ ] No sensitive data in code
- [ ] Fallback values for development

## 🔧 Deployment Steps

### Step 1: Local Testing
```bash
# Test build locally
npm run build:netlify

# Check build output
ls -la dist/spa/

# Test with local server
npx serve dist/spa/
```

### Step 2: Netlify Deployment
1. **Connect Repository**
   - Link GitHub/GitLab repository
   - Set build command: `npm run build:netlify`
   - Set publish directory: `dist/spa`
   - Set functions directory: `netlify/functions`

2. **Environment Variables**
   ```bash
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   ```

3. **Deploy**
   - Trigger initial deployment
   - Check build logs for errors
   - Verify all routes work

## 🧪 Post-Deployment Testing

### 1. Route Testing
- [ ] Home page loads (`/`)
- [ ] Login page accessible (`/login`)
- [ ] Dashboard redirects properly (`/dashboard`)
- [ ] Developer routes work (`/developer-dashboard`)
- [ ] Invalid routes show 404 page

### 2. Authentication Testing
- [ ] Demo login buttons work
- [ ] Firebase authentication works
- [ ] Protected routes redirect to login
- [ ] Developer routes require developer auth

### 3. Navigation Testing
- [ ] Browser back/forward buttons work
- [ ] Direct URL access works
- [ ] Refresh on any page works
- [ ] No 404 errors in console

### 4. Performance Testing
- [ ] Page load times acceptable
- [ ] Images and assets load properly
- [ ] No broken links
- [ ] Mobile responsiveness

## 🚨 Common Issues & Solutions

### Issue: 404 Errors on Refresh
**Solution**: Check Netlify redirects in `netlify.toml`
```toml
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
  force = true
```

### Issue: Routes Not Working
**Solution**: Verify route definitions in `client/routes.ts`

### Issue: Build Fails
**Solution**: Check Node.js version (18+ required)

### Issue: Firebase Not Working
**Solution**: Verify environment variables in Netlify dashboard

### Issue: Functions Not Working
**Solution**: Check `netlify/functions/api.ts` configuration

## 📊 Monitoring

### 1. Netlify Analytics
- Enable in Site Settings > Analytics
- Monitor page views and performance
- Check for 404 errors

### 2. Function Logs
- Check function execution logs
- Monitor API response times
- Set up error alerts

### 3. User Feedback
- Monitor user reports
- Check browser console errors
- Track navigation patterns

## 🔄 Continuous Deployment

### 1. Automatic Deploys
- [ ] Push to main triggers deploy
- [ ] Preview deploys for PRs
- [ ] Branch deploys work

### 2. Environment Management
- [ ] Production variables set
- [ ] Preview variables configured
- [ ] Development variables local

## ✅ Final Checklist

### Before Going Live
- [ ] All routes tested and working
- [ ] No 404 errors in testing
- [ ] Authentication flows work
- [ ] Performance acceptable
- [ ] Mobile responsive
- [ ] Error pages styled
- [ ] Analytics configured
- [ ] Monitoring set up

### Post-Launch
- [ ] Monitor for 404 errors
- [ ] Check user feedback
- [ ] Monitor performance
- [ ] Update documentation
- [ ] Plan maintenance schedule

---

## 🆘 Emergency Procedures

### If 404 Errors Occur
1. Check Netlify build logs
2. Verify redirect rules
3. Test routes locally
4. Check environment variables
5. Contact support if needed

### Rollback Plan
1. Revert to previous deployment
2. Check git history for changes
3. Test locally before redeploying
4. Update documentation

---

**Remember**: Prevention is better than cure! Test thoroughly before deployment. 🚀 