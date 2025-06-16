# Service Account Credentials

This directory contains service account credentials for Google Drive API.

IMPORTANT: 
- Never commit these credentials to version control
- Add this directory to your .gitignore file
\`\`\`

Now, let's update the `.gitignore` file to exclude the credentials:

```txt file=".gitignore"
# dependencies
/node_modules
/.pnp
.pnp.js

# testing
/coverage

# next.js
/.next/
/out/

# production
/build

# misc
.DS_Store
*.pem

# debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# local env files
.env*.local
.env

# vercel
.vercel

# typescript
*.tsbuildinfo
next-env.d.ts

# Google service account credentials
/config/service-account.json
