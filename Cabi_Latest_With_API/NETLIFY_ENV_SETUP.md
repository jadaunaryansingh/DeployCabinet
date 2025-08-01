# Netlify Environment Variables Setup

To fix the Firebase configuration issues, you need to add these environment variables to your Netlify deployment:

## Required Environment Variables

Go to your Netlify dashboard → Site settings → Environment variables and add:

### Firebase Configuration
```
VITE_FIREBASE_API_KEY=AIzaSyA1YPpvErdlMlWoYMat1L0rxmvsqqVIdtY
VITE_FIREBASE_AUTH_DOMAIN=luxury-pixie-1db267.netlify.app
VITE_FIREBASE_PROJECT_ID=cab-i-net-87713
VITE_FIREBASE_STORAGE_BUCKET=cab-i-net-87713.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=169349902043
VITE_FIREBASE_APP_ID=1:169349902043:web:8fc2fd21afdd8f16c1e6fe
VITE_FIREBASE_MEASUREMENT_ID=G-V2JDVWRYXS
```

### Google Maps Configuration
```
VITE_GOOGLE_MAPS_API_KEY=AIzaSyB5Kt5DEwqzOX5d6fMMVN_tcAz5IYcp34c
```

## Steps to Add Environment Variables:

1. Go to [Netlify Dashboard](https://app.netlify.com/)
2. Select your site: `luxury-pixie-1db267`
3. Go to **Site settings** → **Environment variables**
4. Click **Add a variable** for each variable above
5. Set **Scope** to **All scopes**
6. Click **Save**

## After Adding Variables:

1. Go to **Deploys** tab
2. Click **Trigger deploy** → **Deploy site**
3. This will trigger a new deployment with the correct environment variables

## Verification:

After deployment, check the browser console for:
- ✅ "Firebase initialized successfully"
- ✅ "Google Maps loaded successfully!"
- ✅ No more "API key not valid" errors 