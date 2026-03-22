const fs = require('fs');
const path = require('path');

function autoAddUseClient(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      autoAddUseClient(fullPath);
    } else if (fullPath.endsWith('.jsx') || fullPath.endsWith('.js')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      
      const needsClient = content.includes('useState') || 
                          content.includes('useEffect') || 
                          content.includes('useRef') || 
                          content.includes('useRouter') || 
                          content.includes('usePathname') ||
                          content.includes('framer-motion') ||
                          content.includes('onClick=');
                          
      if (needsClient && !content.startsWith("'use client'")) {
        // Remove any existing one to avoid duplicates
        content = content.replace(/['"]use client['"];?\s*/g, '');
        content = "'use client';\n" + content;
        fs.writeFileSync(fullPath, content);
      }
    }
  }
}

autoAddUseClient(path.join('src', 'components'));
autoAddUseClient(path.join('src', 'pages'));
autoAddUseClient(path.join('src', 'app'));

console.log('use client universally applied!');
