// Ricompila src/entry.jsx (React) e rigenera index.html come pagina statica
// unica, autosufficiente (nessuna dipendenza da CDN esterni a parte i font).
const esbuild = require("esbuild");
const fs = require("fs");

esbuild.buildSync({
  entryPoints: ["src/entry.jsx"],
  bundle: true,
  minify: true,
  format: "iife",
  jsx: "automatic",
  outfile: "build/bundle.js",
});

const bundle = fs.readFileSync("build/bundle.js", "utf8");
const template = fs.readFileSync("src/template.html", "utf8");
const html = template.replace("/*__BUNDLE__*/", () => bundle);

fs.writeFileSync("index.html", html);
console.log(`index.html generato (${(html.length / 1024).toFixed(1)} KB)`);
