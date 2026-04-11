const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
    if (!fs.existsSync(dir)) return;
    fs.readdirSync(dir).forEach(f => {
        let dirPath = path.join(dir, f);
        let isDirectory = fs.statSync(dirPath).isDirectory();
        isDirectory ? walkDir(dirPath, callback) : callback(dirPath);
    });
}

walkDir('src/pages', function(filePath) {
    if (!filePath.endsWith('.tsx')) return;
    
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;

    // Replace the raw string injection with relatively calculated paths
    // Depth from src/pages is useful mapping:
    // If we're at src/pages/cart/index.tsx (depth 1), locale is at src/locales. Wait, locales is at src/locales or root/locales?
    // Let's check where locales is located. The user's original code in auth/login/index.tsx used `../../../locales/...`. So auth(1)/login(2) -> ../../../ from pages/auth/login. That means locales is inside src/locales or root/locales.
    // If src/pages/auth/login/index.tsx (src/pages/x/y/index.tsx) uses ../../../locales, that goes from index.tsx -> y -> x -> pages -> src/locales? No, __dirname at runtime is different, but for import() Webpack resolves it statically relative to the file.
    // `../../../locales` from `src/pages/auth/login/index.tsx` = `src/pages/auth/login/../../../locales` -> `src/locales`.
    
    let depth = (filePath.match(/\\/g) || []).length - 1; // e.g. src\pages\cart\index.tsx -> 3 slashes, minus 1 = 2 (cart/index.tsx).
                                                           // src\pages\index.tsx -> 2 slashes, minus 1 = 1.
                                                           // src\pages\auth\login\index.tsx -> 4 slashes, minus 1 = 3.
                                                           
    let relativeStr = '../'.repeat(depth) + 'locales';

    // Regex to fix the broken strings
    content = content.replace(/\.\.\/\.\.\/\.\.\/locales/g, relativeStr);

    if (content !== original) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log('Fixed path in ' + filePath);
    }
});
