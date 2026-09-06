# Netiv Transportes — Guincho 24h

Site oficial da **Netiv Transportes**, serviço de guincho plataforma 24 horas para carros, motos, utilitários e veículos leves em São Bernardo do Campo, ABC Paulista e rotas para o litoral sob consulta.

**Site:** [netivtransportes.com.br](https://netivtransportes.com.br/)  
**WhatsApp e telefone:** [(11) 94378-6869](https://wa.me/5511943786869)  
**Instagram:** [@netiv.transportes](https://www.instagram.com/netiv.transportes/)  
**CNPJ:** 64.751.310/0001-20

## Sobre o projeto

A página foi construída para carregar rapidamente em dispositivos móveis, facilitar o contato imediato por WhatsApp ou telefone e melhorar a presença da empresa nas buscas locais.

Principais recursos:

- atendimento e contato disponíveis durante toda a navegação;
- páginas locais pré-renderizadas e indexáveis;
- metadados, sitemap, canonical e dados estruturados para SEO;
- imagens reais otimizadas em WebP e com placas desfocadas;
- integração com Google Ads por meio da tag `AW-18419198979`;
- política de privacidade e boas práticas de segurança;
- publicação automática no GitHub Pages com domínio próprio e HTTPS.

## Tecnologias

- React 19
- TypeScript 6
- Vite 8
- CSS responsivo e mobile-first
- renderização no servidor para pré-geração de HTML
- GitHub Actions e GitHub Pages

## Estrutura de arquivos

| Caminho | Finalidade |
| --- | --- |
| `.github/workflows/` | Automação de validação, build e publicação no GitHub Pages. |
| `public/` | Arquivos públicos, como favicon, `robots.txt` e sitemap. |
| `scripts/prerender.mjs` | Gera o HTML estático das páginas e os arquivos técnicos de SEO. |
| `src/assets/` | Fotografias reais e otimizadas usadas no site. |
| `src/components/` | Componentes reutilizáveis, incluindo cabeçalho, depoimentos e privacidade. |
| `src/data/regions.json` | Conteúdo e URLs das páginas regionais. |
| `src/data/site.ts` | Dados centrais do negócio, contatos, navegação e domínio canônico. |
| `src/App.tsx` | Estrutura e conteúdo principal do site. |
| `src/App.css` | Layout, identidade visual e ajustes responsivos. |
| `src/entry-server.tsx` | Entrada usada na pré-renderização das páginas. |
| `src/main.tsx` | Inicialização do aplicativo no navegador. |
| `index.html` | Documento-base, metadados globais e Google tag. |
| `vite.config.ts` | Configuração de desenvolvimento e build do Vite. |

## Executar localmente

É necessário ter uma versão do Node.js compatível com o Vite 8.

```bash
npm install
npm run dev
```

O ambiente de desenvolvimento ficará disponível em `http://localhost:5173`.

## Validação e build

```bash
npm run lint
npm run build
npm run preview
```

O build gera a pasta `dist/` com a página inicial, a política de privacidade e as páginas regionais já pré-renderizadas. A estrutura das rotas deve ser preservada na hospedagem.

## Publicação

Todo envio para a branch `main` inicia o fluxo de publicação configurado em `.github/workflows/deploy-pages.yml`. O domínio oficial é `https://netivtransportes.com.br/`.

## Manutenção do conteúdo

- Atualize contatos e informações gerais em `src/data/site.ts`.
- Atualize cidades, URLs e textos locais em `src/data/regions.json`.
- Não altere URLs já publicadas sem criar um redirecionamento permanente.
- Publique depoimentos somente quando forem reais e autorizados.
- Não exponha endereço residencial, documentos, chaves ou credenciais no repositório.

## Licença e uso

Código e conteúdo desenvolvidos para uso da Netiv Transportes. Fotografias, identidade visual e textos comerciais não estão liberados para reutilização por terceiros.
