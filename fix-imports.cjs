const fs = require('fs');
const path = require('path');

const appMainDir = path.join('src', 'app', '(main)');

function fixPages(dir, depth = 0) {
  const items = fs.readdirSync(dir);
  for (const item of items) {
    const full = path.join(dir, item);
    if (fs.statSync(full).isDirectory()) {
      fixPages(full, depth + 1);
    } else if (item === 'page.jsx') {
      let content = fs.readFileSync(full, 'utf8');
      // Count how many ../ are needed to reach src from this page
      // depth from (main): 1=top, 2=sub, etc.
      const currentDepth = full.split(path.sep).filter(p => p !== '').length - 
                           appMainDir.split(path.sep).filter(p => p !== '').length;
      
      // Replace any incorrect relative path to pages with correct one
      // The page files are at src/pages/, app route pages are at src/app/(main)/[...]/page.jsx
      // From src/app/(main)/x/page.jsx -> ../../../pages/X = 3 levels up
      // From src/app/(main)/x/y/page.jsx -> ../../../../pages/X = 4 levels up
      const upLevels = currentDepth + 2; // +2 for app/(main)/
      const correctPath = Array(upLevels).fill('..').join('/') + '/pages';
      
      // Fix any relative pages path
      const fixed = content.replace(/['"][.\/]*pages\//g, `'${correctPath}/`);
      if (fixed !== content) {
        fs.writeFileSync(full, fixed);
        console.log('Fixed:', full, '-> depth:', currentDepth, 'path:', correctPath);
      }
    }
  }
}

fixPages(appMainDir);
console.log('All page imports fixed!');
