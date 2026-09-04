# Netiv Transportes

Site existente em React + TypeScript + Vite, com HTML pré-renderizado para publicação estática.

## Desenvolvimento

Use Node.js compatível com Vite 8 e pnpm 11.

    pnpm install --frozen-lockfile
    pnpm dev
    pnpm build
    pnpm lint

O build gera `dist/`: publique o conteúdo dessa pasta na raiz do domínio. Cada rota possui seu próprio diretório e index.html; preserve essa estrutura na hospedagem. Caminhos inexistentes devem retornar HTTP 404, sem redirecionar indiscriminadamente para a home.

## Conteúdo e configuração

- `src/data/regions.json`: URLs, textos e perguntas locais. Não renomeie slugs publicados sem redirecionamento permanente.
- `src/data/site.ts`: contatos, endereço, navegação e domínio canônico. `VITE_SITE_URL` permite substituir o domínio no build.
- `src/App.tsx`: home, páginas locais, WhatsApp e seletor de cidade.
- `scripts/prerender.mjs`: HTML de cada página, metadados, sitemap e robots.
- `src/App.css`: estilos originais e ajustes de contraste, leitura e mobile.

A escolha de cidade é opcional, não persiste dados nem acessa GPS ou serviços de IP. Personaliza home e “guincho perto de mim”; páginas fixas mantêm seus títulos. Endereço exato e disponibilidade são confirmados no WhatsApp.

As fotos, CNPJ, endereço e condições comerciais foram preservados do projeto recebido. Avaliações só aparecem se cadastradas como reais e autorizadas.

## Publicação e descoberta

Domínio padrão: https://netivtransportes.com.br. A versão entregue ainda não foi publicada. Após publicar, envie /sitemap.xml ao Google Search Console. HTML indexável não garante inclusão nem posição no Google.

A implementação usa pré-renderização, links HTML e canonical por página, conforme https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics . Revisão de contraste baseada em https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html .
