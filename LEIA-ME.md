# Site Pet Zen Jundiaí

Landing page estática (HTML + CSS + JS puro) que leva o visitante a agendar pelo WhatsApp (`bit.ly/petzenjundiai`).
Endereço final: https://petzen.pages.dev/

## Arquivos

| Arquivo | O que é |
|---|---|
| `index.html` | Página (estrutura, textos, dados para o Google e ícones SVG) |
| `style.css` | Estilos (cores no topo, em `:root`) |
| `script.js` | Menu do celular, animação ao rolar e bolhas do topo |
| `assets/img` | Fotos em AVIF/WebP (480 e 900 px), logo, ícones e imagem de compartilhamento (OG) |
| `assets/fonts` | Fontes Nunito e Dancing Script (WOFF2, auto-hospedadas) |
| `ferramentas/gerar-imagens.js` | Opcional: converte fotos novas e refaz ícones/OG |
| `_headers` | Regras de cache para o Cloudflare Pages |
| `robots.txt`, `sitemap.xml`, `favicon.ico`, `favicon-32.png`, `apple-touch-icon.png`, `site.webmanifest` | SEO e ícones |

## Como editar

- **Textos, horários, serviços**: direto no `index.html`.
- **Horário**: altere na seção Contato **e** em `openingHoursSpecification` (no topo do `index.html`).
- **Trocar ou adicionar fotos**: gere os arquivos com `ferramentas/gerar-imagens.js` e troque o nome nos `<picture>` do `index.html`.
- **Logo**: hoje é um recorte do print do Instagram (baixa resolução). Com o arquivo original, substitua `assets/img/logo-petzen.png` e rode a ferramenta para refazer os ícones.

## Publicar grátis no Cloudflare Pages

Cloudflare → Workers & Pages → Create → Pages → **Upload assets** → arraste os arquivos do site → Deploy, com o nome do projeto `petzen`.
Não envie as pastas `.claude`, `ferramentas/node_modules` nem outras pastas que não sejam do site.
