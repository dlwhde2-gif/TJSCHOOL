const fs = require('fs');
const path = require('path');

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            results = results.concat(walk(file));
        } else {
            results.push(file);
        }
    });
    return results;
}

const appDir = path.join(process.cwd(), 'src', 'app');
const pagesDir = path.join(process.cwd(), 'src', 'pages');
const componentsDir = path.join(process.cwd(), 'src', 'components');
const files = walk(appDir).concat(walk(pagesDir)).concat(walk(componentsDir));

files.forEach(file => {
    if (file.endsWith('.jsx') || file.endsWith('.js')) {
        let content = fs.readFileSync(file, 'utf8');
        let newContent = content;

        // Replace pages relative imports
        newContent = newContent.replace(/from '\.\.\/pages\//g, "from '@/pages/");
        newContent = newContent.replace(/from '\.\.\/\.\.\/pages\//g, "from '@/pages/"); // handle different depths
        newContent = newContent.replace(/from '\.\.\/\.\.\/\.\.\/pages\//g, "from '@/pages/");

        // Replace components relative imports
        newContent = newContent.replace(/from '\.\.\/components\//g, "from '@/components/");
        newContent = newContent.replace(/from '\.\.\/\.\.\/components\//g, "from '@/components/");
        newContent = newContent.replace(/from '\.\.\/\.\.\/\.\.\/components\//g, "from '@/components/");

        // Replace lib relative imports
        newContent = newContent.replace(/from '\.\.\/lib\//g, "from '@/lib/");
        newContent = newContent.replace(/from '\.\.\/\.\.\/lib\//g, "from '@/lib/");

        if (content !== newContent) {
            console.log(`Updating ${file}`);
            fs.writeFileSync(file, newContent, 'utf8');
        }
    }
});
