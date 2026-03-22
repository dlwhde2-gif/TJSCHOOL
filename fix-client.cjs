const fs = require('fs');
const path = require('path');

function fixUseClientInDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      fixUseClientInDir(fullPath);
    } else if (fullPath.endsWith('.jsx') || fullPath.endsWith('.js')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      if (content.includes("'use client'") || content.includes('"use client"')) {
        // Remove all variations of use client
        content = content.replace(/['"]use client['"];?\s*/g, '');
        // Prepend correctly
        content = "'use client';\n" + content;
        fs.writeFileSync(fullPath, content);
      }
    }
  }
}

fixUseClientInDir(path.join('src', 'pages'));
fixUseClientInDir(path.join('src', 'components'));
fixUseClientInDir(path.join('src', 'app'));

console.log('Fixed use client positions!');
