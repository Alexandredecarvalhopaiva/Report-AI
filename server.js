#!/usr/bin/env node
// Servidor local para Report AI
// Uso: node server.js
// Opcional: GROQ_API_KEY=gsk_... node server.js

const http = require('http');
const fs = require('fs');
const path = require('path');

// Carrega .env se existir
const envPath = path.join(__dirname, '.env');
if (fs.existsSync(envPath)) {
  fs.readFileSync(envPath, 'utf8').split('\n').forEach(line => {
    const [key, ...val] = line.split('=');
    if (key && val.length) process.env[key.trim()] = val.join('=').trim();
  });
}

const PORT = process.env.PORT || 3000;

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css':  'text/css',
  '.js':   'application/javascript',
  '.json': 'application/json',
  '.png':  'image/png',
  '.jpg':  'image/jpeg',
  '.svg':  'image/svg+xml',
  '.ico':  'image/x-icon',
  '.woff2':'font/woff2',
  '.woff': 'font/woff',
};

// Carrega a função de API
const apiHandler = require('./api/generate-report');

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://localhost:${PORT}`);

  // Rota da API
  if (url.pathname === '/api/generate-report') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', async () => {
      try {
        req.body = body ? JSON.parse(body) : {};
      } catch {
        req.body = {};
      }
      await apiHandler(req, res);
    });
    return;
  }

  // Arquivos estáticos
  let filePath = path.join(__dirname, url.pathname === '/' ? 'index.html' : url.pathname);

  // Sem extensão → tenta .html
  if (!path.extname(filePath)) filePath += '.html';

  fs.readFile(filePath, (err, data) => {
    if (err) {
      // Fallback para index.html
      fs.readFile(path.join(__dirname, 'index.html'), (e2, d2) => {
        if (e2) { res.writeHead(404); res.end('Not found'); return; }
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(d2);
      });
      return;
    }
    const ext = path.extname(filePath);
    res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' });
    res.end(data);
  });
});

server.listen(PORT, () => {
  console.log(`\n✅ Report AI rodando em http://localhost:${PORT}`);
  console.log(`📄 Site:      http://localhost:${PORT}`);
  console.log(`🤖 Gerador:   http://localhost:${PORT}/report-generator.html`);
  if (!process.env.GROQ_API_KEY) {
    console.log(`\n⚠️  GROQ_API_KEY não encontrada.`);
    console.log(`   Crie um arquivo .env com: GROQ_API_KEY=gsk_...`);
    console.log(`   Ou rode: GROQ_API_KEY=gsk_... node server.js\n`);
  } else {
    console.log(`\n✅ GROQ_API_KEY configurada — IA pronta!\n`);
  }
});
