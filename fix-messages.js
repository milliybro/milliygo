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

    // We want to replace `return { props: {} }` inside getStaticProps
    // with something returning messages if next-intl is used
    if (content.includes('getStaticProps') && content.includes('props: {}')) {
        let replacement = `let messages = {};
  if (context && context.locale) {
      messages = (await import(\`../../../locales/\${context.locale}.json\`)).default;
  } else {
      messages = (await import(\`../../../locales/uz.json\`)).default;
  }
  return { props: { messages } }`;
        
        // Find getStaticProps signature to add context if missing
        content = content.replace(/export async function getStaticProps\(\)/g, "export async function getStaticProps(context: any)");
        content = content.replace(/return\s*\{\s*props:\s*\{\}\s*\}/g, replacement);
    }
    
    if (content !== original) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log('Updated ' + filePath);
    }
});
