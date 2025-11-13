# 🚀 TravelBook Deployment Guide

## Pre-Deployment Checklist

### ✅ Backend Preparation
- [ ] Environment variables configured
- [ ] Database migrations run
- [ ] CORS updated for production domain
- [ ] API endpoints tested

### ✅ Frontend Preparation  
- [ ] API URLs updated for production
- [ ] Firebase config uses environment variables
- [ ] Build process tested locally
- [ ] Environment variables prepared

### ✅ Firebase Setup
- [ ] Authorized domains updated
- [ ] Authentication providers enabled
- [ ] Admin email configured (admin@gmail.com)

## Deployment Steps

### 1. Deploy Backend (Railway)
1. Go to https://railway.app
2. Connect GitHub repository
3. Select backend folder
4. Add environment variables:
   ```
   DATABASE_URL=postgresql://...
   PORT=4000
   FRONTEND_URL=https://your-app.vercel.app
   ```
5. Deploy and note the URL: `https://your-backend.railway.app`

### 2. Deploy Frontend (Vercel)
1. Go to https://vercel.com
2. Import GitHub repository
3. Configure:
   - Root Directory: `frontend`
   - Framework: Create React App
   - Build Command: `npm run build`
   - Output Directory: `build`
4. Add environment variables (see below)
5. Deploy

### 3. Environment Variables for Vercel
```
REACT_APP_API_URL=https://your-backend.railway.app/api
REACT_APP_FIREBASE_API_KEY=your-api-key
REACT_APP_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your-project-id
REACT_APP_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=123456789
REACT_APP_FIREBASE_APP_ID=your-app-id
```

### 4. Update Firebase Authorized Domains
Add your Vercel domain to Firebase Console → Authentication → Settings → Authorized Domains

### 5. Test Production Deployment
- [ ] Authentication works
- [ ] API calls successful
- [ ] Admin panel accessible
- [ ] Mobile responsive
- [ ] All features functional

## Troubleshooting

### Common Issues:
1. **CORS Error**: Update backend CORS with your Vercel URL
2. **API Not Found**: Check REACT_APP_API_URL environment variable
3. **Auth Error**: Verify Firebase authorized domains
4. **Build Fails**: Check for TypeScript/ESLint errors

### Debug Commands:
```bash
# Test API connection
curl https://your-backend.railway.app/api/trips

# Check environment variables
console.log(process.env.REACT_APP_API_URL)
```