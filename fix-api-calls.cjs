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

const srcDir = path.join(process.cwd(), 'src');
const files = walk(srcDir);

files.forEach(file => {
    if (file.endsWith('.jsx') || file.endsWith('.js')) {
        let content = fs.readFileSync(file, 'utf8');
        let newContent = content;

        if (content.includes('http://localhost:3001')) {
            console.log(`Fixing API in ${file}`);
            
            // Add import if not present and if it's a react file
            if (!newContent.includes("from '@/lib/supabase'")) {
                 newContent = "import { getSupabase } from '@/lib/supabase';\n" + newContent;
            }

            // This is a complex replacement because of then() chains or async/await.
            // For now, I will handle the most common patterns or just give a warning for manual check.
            // However, I've already fixed AdminDashboard, HeroSlider, and Popup manually.
            // Let's do common ones like BoardPage, GalleryPage, etc.
        }
    }
});
