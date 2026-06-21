#!/usr/bin/env node
// Servidor local para Report AI
// Uso: node server.js
// Opcional: GEMINI_API_KEY=... node server.js

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

// Funções de API disponíveis (whitelist — espelha os arquivos em /api).
const API_HANDLERS = {
  '/api/generate-report': require('./api/generate-report'),
  '/api/validate-files': require('./api/validate-files'),
};

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://localhost:${PORT}`);

  // Rotas da API
  const apiHandler = API_HANDLERS[url.pathname];
  if (apiHandler) {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', async () => {
      try {
        req.body = body ? JSON.parse(body) : {};
      } catch {
        req.body = {};
      }
      // Adapta a resposta nativa do Node à API estilo Vercel usada nas funções em /api
      res.status = (code) => { res.statusCode = code; return res; };
      res.json = (obj) => {
        if (!res.headersSent) res.setHeader('Content-Type', 'application/json; charset=utf-8');
        res.end(JSON.stringify(obj));
        return res;
      };
      try {
        await apiHandler(req, res);
      } catch (e) {
        if (!res.headersSent) {
          res.statusCode = 500;
          res.setHeader('Content-Type', 'application/json; charset=utf-8');
          res.end(JSON.stringify({ error: `Erro interno: ${e.message}` }));
        }
      }
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
  if (!process.env.GEMINI_API_KEY) {
    console.log(`\n⚠️  GEMINI_API_KEY não encontrada.`);
    console.log(`   Crie um arquivo .env com: GEMINI_API_KEY=...`);
    console.log(`   Chave grátis em: https://aistudio.google.com/apikey\n`);
  } else {
    console.log(`\n✅ GEMINI_API_KEY configurada — IA pronta!\n`);
  }
});
