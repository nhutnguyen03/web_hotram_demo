const fs = require('node:fs');
const path = require('node:path');
const esbuild = require('esbuild');

const root = __dirname;
const output = path.join(root, 'dist');

fs.rmSync(output, { recursive: true, force: true });
fs.mkdirSync(output, { recursive: true });

fs.copyFileSync(path.join(root, 'index.html'), path.join(output, 'index.html'));
fs.copyFileSync(path.join(root, 'logo-favicon.png'), path.join(output, 'logo-favicon.png'));
fs.copyFileSync(path.join(root, 'robots.txt'), path.join(output, 'robots.txt'));
fs.copyFileSync(path.join(root, 'sitemap.xml'), path.join(output, 'sitemap.xml'));
for (const file of ['admin.html', 'admin.css', 'admin.js']) {
  fs.copyFileSync(path.join(root, file), path.join(output, file));
}

const indexPath = path.join(output, 'index.html');
const index = fs.readFileSync(indexPath, 'utf8')
  .replace(/\s*<link rel="stylesheet" href="style\.css">\s*/i, '\n  <link rel="stylesheet" href="assets/site.min.css">\n')
  .replace(/\s*<link rel="stylesheet" href="floria\.css\?v=2">\s*/i, '')
  .replace(/\s*<script src="theme\.js"><\/script>\s*\n?\s*<script src="script\.js"><\/script>\s*\n?\s*<script src="floria\.js\?v=1"><\/script>/i, '\n  <script src="assets/site.min.js" defer></script>');
fs.writeFileSync(indexPath, index);

const assets = path.join(output, 'assets');
fs.mkdirSync(assets, { recursive: true });

const javascript = ['theme.js', 'script.js', 'floria.js']
  .map((file) => fs.readFileSync(path.join(root, file), 'utf8'))
  .join('\n');
const minifiedJavascript = esbuild.transformSync(javascript, {
  loader: 'js',
  minify: true,
  sourcemap: false
});
fs.writeFileSync(path.join(assets, 'site.min.js'), minifiedJavascript.code);

const css = ['style.css', 'floria.css']
  .map((file) => fs.readFileSync(path.join(root, file), 'utf8'))
  .join('\n');
const minifiedCss = esbuild.transformSync(css, {
  loader: 'css',
  minify: true,
  sourcemap: false
});
fs.writeFileSync(path.join(assets, 'site.min.css'), minifiedCss.code);

console.log('Production site built in dist/');