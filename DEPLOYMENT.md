# 🚀 Deployment Instructions

## GitHub Setup (Manual Upload)

### Option 1: Manual File Upload (Recommended for beginners)

1. **Create a new repository on GitHub:**
   - Go to https://github.com/new
   - Repository name: `split-expenses`
   - Description: "💸 Split Expenses v2.0 - Bilingual expense splitting app with persistent data"
   - Make it **public** (for free Vercel hosting)
   - ✅ Check "Add a README file"
   - ✅ Check "Add .gitignore" and select "Node"
   - Click "Create repository"

2. **Prepare files for upload:**
   - Open your file manager (Finder on Mac, File Explorer on Windows)
   - Navigate to your project folder
   - Select ALL files and folders EXCEPT:
     - `node_modules/` folder (never upload this)
     - `.next/` folder (build output)
     - `*.log` files
     - `.DS_Store` files

3. **Upload files to GitHub:**
   - In your new GitHub repository, click "uploading an existing file"
   - Drag and drop all the prepared files/folders
   - Or click "choose your files" and select them
   - Add commit message: "Initial commit: Split Expenses v2.0 with bilingual support and persistent data"
   - Click "Commit changes"

### Option 2: Command Line Upload (Alternative)

If you prefer command line later:
```bash
git remote add origin https://github.com/YOUR_USERNAME/split-expenses.git
git push -u origin develop
```

## Vercel Deployment

1. **Connect to Vercel:**
   - Go to https://vercel.com
   - Sign up/login with your GitHub account
   - Click "New Project"
   - Import your `split-expenses` repository

2. **Configure the deployment:**
   - Framework Preset: **Next.js** (auto-detected)
   - Root Directory: `./` (default)
   - Build Command: `npm run build` (default)
   - Output Directory: `.next` (default)
   - Install Command: `npm install --registry=https://registry.npmjs.org/` (use this instead of npm ci)

3. **Environment Variables (Optional):**
   - No environment variables needed for this project
   - All data is stored in browser localStorage

4. **Deploy:**
   - Click "Deploy"
   - Wait for deployment to complete
   - Your app will be available at: `https://split-expenses-YOUR_USERNAME.vercel.app`

**📝 Important Note:** 
- **Change the Install Command** in Vercel to: `npm install --registry=https://registry.npmjs.org/`
- This avoids the npm ci authentication issues
- Don't use `npm ci --only=production` as it causes authentication errors

### 🔧 **If you get npm authentication errors:**

The project now includes:
- ✅ `.npmrc` file forcing public registry
- ✅ `.vercel.npmrc` for Vercel-specific config
- ✅ Updated `vercel.json` with explicit npm commands
- ✅ Clean `package-lock.json` without authentication issues

These files ensure deployment works without any login requirements.

## Environment Variables (if needed)

Currently, the app doesn't require any environment variables as it uses localStorage for persistence.

## Custom Domain (Optional)

1. In Vercel dashboard, go to your project
2. Go to Settings > Domains
3. Add your custom domain
4. Follow Vercel's DNS configuration instructions

## Automatic Deployments

Once connected to GitHub:
- Every push to `develop` branch will trigger a new deployment
- Preview deployments for pull requests
- Production deployments from main/master branch

## Build Verification

✅ **Build Status:** Successful
✅ **Bundle Size:** Optimized (99.9 kB first load)
✅ **Static Generation:** All pages pre-rendered
✅ **TypeScript:** No type errors
✅ **Linting:** Clean (minor ESLint config warning, doesn't affect build)

## Post-Deployment Checklist

- [ ] Test the live URL
- [ ] Verify all features work in production
- [ ] Test language switching
- [ ] Test data persistence
- [ ] Check mobile responsiveness
- [ ] Test expense creation and calculation flows

## Troubleshooting

If you encounter issues:

1. **Build fails:** Check the build logs in Vercel dashboard
2. **404 errors:** Ensure vercel.json redirect is working
3. **Features not working:** Check browser console for errors
4. **Data not persisting:** Verify localStorage is enabled in browser

Your application is now ready for production deployment! 🎉
