/* ==========================================================================
   GERAR IMAGENS (opcional)
   Converte fotos novas para AVIF/WebP em 2 tamanhos (480 e 900 px) e
   refaz os ícones e a imagem de compartilhamento (OG) a partir do logo.

   Como usar (precisa do Node.js):
       cd ferramentas
       npm install sharp
       node gerar-imagens.js "C:\caminho\das\fotos"

   As fotos da pasta devem ter o nome final, ex.: petzen-08-poodle-laco.jpg
   A foto que começa com "petzen-01" vira a imagem de compartilhamento.
   Não suba a pasta ferramentas/node_modules no Cloudflare.
   ========================================================================== */
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const raiz = path.join(__dirname, '..');
const img = path.join(raiz, 'assets', 'img');
const origem = process.argv[2];
if (!origem) { console.error('Informe a pasta das fotos.'); process.exit(1); }

(async () => {
  const fotos = fs.readdirSync(origem).filter(f => /\.(jpe?g|png|webp)$/i.test(f));
  for (const f of fotos) {
    const nome = f.replace(/\.[^.]+$/, '');
    for (const w of [480, 900]) {
      const base = sharp(path.join(origem, f)).resize({ width: w, withoutEnlargement: true });
      await base.clone().webp({ quality: 78 }).toFile(path.join(img, `${nome}-${w}.webp`));
      await base.clone().avif({ quality: 55 }).toFile(path.join(img, `${nome}-${w}.avif`));
    }
    console.log('foto:', nome);
  }

  // shortcut: logo vem do print do Instagram (137px); trocar logo-petzen.png pelo original para ícones nítidos
  const logo = path.join(img, 'logo-petzen.png');
  const png32 = await sharp(logo).resize(32, 32).png().toBuffer();
  fs.writeFileSync(path.join(raiz, 'favicon-32.png'), png32);
  fs.writeFileSync(path.join(raiz, 'favicon.ico'), ico(png32, 32));
  await sharp(logo).resize(180, 180).flatten({ background: '#fff' }).png().toFile(path.join(raiz, 'apple-touch-icon.png'));
  await sharp(logo).resize(192, 192).png().toFile(path.join(img, 'icone-192.png'));
  await sharp(logo).resize(96, 96).webp({ quality: 90 }).toFile(path.join(img, 'logo-petzen-96.webp'));

  const capa = fotos.find(f => f.startsWith('petzen-01'));
  if (capa) {
    const logoOg = await sharp(logo).resize(150, 150).png().toBuffer();
    await sharp(path.join(origem, capa)).resize(1200, 630, { fit: 'cover' })
      .composite([{ input: logoOg, left: 1020, top: 30 }])
      .jpeg({ quality: 80 }).toFile(path.join(img, 'petzen-og.jpg'));
  }
  console.log('ícones e OG prontos');
})().catch(e => { console.error(e); process.exit(1); });

// .ico com um único PNG dentro (aceito por todos os navegadores atuais)
function ico(png, size) {
  const h = Buffer.alloc(22);
  h.writeUInt16LE(1, 2); h.writeUInt16LE(1, 4);
  h[6] = size; h[7] = size; h.writeUInt16LE(1, 10); h.writeUInt16LE(32, 12);
  h.writeUInt32LE(png.length, 14); h.writeUInt32LE(22, 18);
  return Buffer.concat([h, png]);
}
