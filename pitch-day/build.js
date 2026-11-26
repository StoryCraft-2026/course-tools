// Builds pitch-day/writers.js and pitch-day/agents.js from src/.
// Run from the repo root: node pitch-day/build.js   (needs: npm i -g terser)
const fs = require('fs'), path = require('path'), { execFileSync } = require('child_process');
const dir = __dirname;
for (const [name, mount] of [['writers', 'spd-mount'], ['agents', 'apd-mount']]) {
  const html = fs.readFileSync(path.join(dir, 'src', name + '.html'), 'utf8');
  const js = execFileSync('terser', [path.join(dir, 'src', name + '.js'), '-c', '-m'], { encoding: 'utf8' });
  const out = '/* StoryCraft Pitch Day ' + name + ' page. Built from pitch-day/src by build.js. Edit src, not this file. */\n' +
    '!function(){var m=document.getElementById(' + JSON.stringify(mount) + ');m&&(m.outerHTML=' + JSON.stringify(html) + ')}();\n' + js;
  fs.writeFileSync(path.join(dir, name + '.js'), out);
  new Function(out); // syntax check
  console.log(name + '.js', out.length, 'bytes');
}
