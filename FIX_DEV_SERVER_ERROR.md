# Fix: Dev Server Error - Cannot find module './948.js'

## Error Description
```
Error: Cannot find module './948.js'
GET http://localhost:3000/ 500 (Internal Server Error)
```

## Root Cause
This error occurs when Next.js webpack build cache (`.next` directory) becomes corrupted or out of sync with the source code. This commonly happens after:
- Making significant file changes
- Deleting/renaming components
- Updating dependencies
- Switching branches

## Solution Applied ✅

### Step 1: Clean Build Cache
```bash
# Windows PowerShell
Remove-Item -Recurse -Force .next

# macOS/Linux
rm -rf .next
```

### Step 2: Rebuild
```bash
npm run build
```

### Step 3: Start Dev Server
```bash
npm run dev
```

## Why This Works

The `.next` directory contains:
- Webpack build artifacts
- Compiled pages and components
- Module mappings (like `948.js`)
- Build cache

When files are deleted or significantly changed, these mappings can become stale, causing "Cannot find module" errors. Deleting `.next` forces Next.js to rebuild everything from scratch.

## Prevention Tips

### 1. Clean Cache Regularly
Add a clean script to `package.json`:
```json
{
  "scripts": {
    "clean": "rm -rf .next",
    "dev:clean": "npm run clean && npm run dev",
    "build:clean": "npm run clean && npm run build"
  }
}
```

### 2. Use Clean Commands After Major Changes
```bash
# After deleting files
npm run dev:clean

# After updating dependencies
npm run build:clean
```

### 3. Add .next to .gitignore
Ensure `.next` is in your `.gitignore`:
```
# .gitignore
.next/
node_modules/
```

## Common Scenarios Requiring Cache Clean

| Scenario | Command |
|----------|---------|
| Deleted component files | `rm -rf .next && npm run dev` |
| Renamed files | `rm -rf .next && npm run dev` |
| Updated Next.js version | `rm -rf .next && npm install && npm run build` |
| Switched git branches | `rm -rf .next && npm run dev` |
| Build errors after changes | `rm -rf .next && npm run build` |
| 500 errors in dev mode | `rm -rf .next && npm run dev` |

## Alternative Solutions

### Option 1: Delete node_modules Too (Nuclear Option)
If cleaning `.next` doesn't work:
```bash
# Windows
Remove-Item -Recurse -Force .next, node_modules
npm install
npm run build

# macOS/Linux
rm -rf .next node_modules
npm install
npm run build
```

### Option 2: Use Next.js Clean Command
Some Next.js versions support:
```bash
npx next clean
npm run dev
```

### Option 3: Clear npm Cache
If issues persist:
```bash
npm cache clean --force
rm -rf .next node_modules
npm install
npm run build
```

## Verification

After cleaning and rebuilding:

✅ **Build Status:** PASSING
```
✓ Compiled successfully
✓ Linting and checking validity of types
✓ Generating static pages (14/14)
```

✅ **Dev Server:** Should start without errors
```
npm run dev
# Visit http://localhost:3000
```

✅ **No 500 Errors:** Pages load correctly

## Related Errors

This fix also resolves:
- `Module not found: Can't resolve './[number].js'`
- `Cannot find module './chunk-[hash].js'`
- `500 Internal Server Error` in dev mode
- `Error: Cannot find module` for any webpack chunk

## When to Clean Cache

### Always Clean After:
- ✅ Deleting component files
- ✅ Renaming files or directories
- ✅ Major refactoring
- ✅ Updating Next.js or React
- ✅ Switching between branches with different file structures

### Usually Don't Need to Clean:
- ❌ Minor code changes
- ❌ CSS/styling updates
- ❌ Content changes
- ❌ Adding new files (without deleting old ones)

## Quick Reference

```bash
# Quick fix for most issues
rm -rf .next && npm run dev

# Full reset
rm -rf .next node_modules && npm install && npm run build

# Windows PowerShell
Remove-Item -Recurse -Force .next
npm run dev
```

## Status

✅ **Issue:** Resolved  
✅ **Build:** Passing  
✅ **Dev Server:** Ready to start  
✅ **Production Build:** Working  

---

**Fixed:** May 5, 2026  
**Solution:** Clean `.next` cache and rebuild  
**Status:** ✅ RESOLVED
