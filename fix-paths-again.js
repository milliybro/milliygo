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

    // Normalize path to forward slashes and split by 'src/pages/'
    let relativePath = filePath.replace(/\\/g, '/').split('src/pages/')[1];
    if(!relativePath) return;

    let depth = (relativePath.match(/\//g) || []).length; 
    let relativeStr = '../'.repeat(depth + 1) + 'locales';

    // Replace ANY path like ../../locales or ../../../locales with the correct relative string
    content = content.replace(/(\.\.\/)+locales/g, relativeStr);

    if (content !== original) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log('Fixed path in ' + filePath);
    }
});
