import "../App.css"
import { BASE_PATH, CNPJ, INSTAGRAM_HANDLE, INSTAGRAM_URL, PHONE_DISPLAY, PHONE_TEL } from "../data/site"

export function PrivacyPolicy() {
  return <main className="legal-page">
    <article>
      <a className="legal-brand" href={BASE_PATH}>NETIV <span>Transportes</span></a>
      <p className="legal-kicker">Documento público</p>
      <h1>Política de Privacidade</h1>
      <p className="legal-updated">Última atualização: 2 de setembro de 2026</p>

      <h2>1. Sobre esta política</h2>
      <p>Esta política explica como a Netiv Transportes trata informações recebidas quando você acessa este site ou entra em contato para solicitar atendimento.</p>

      <h2>2. Informações tratadas</h2>
      <p>O site não possui formulário, cadastro ou área de usuário. Ao escolher falar conosco por WhatsApp, telefone ou Instagram, você poderá fornecer voluntariamente nome, telefone, localização, informações do veículo, origem e destino necessários para avaliar e realizar o serviço.</p>

      <h2>3. Finalidades</h2>
      <p>As informações são usadas para responder solicitações, elaborar orçamento, confirmar disponibilidade, prestar o serviço, cumprir obrigações legais e manter a segurança do atendimento.</p>

      <h2>4. Serviços externos</h2>
      <p>O site oferece links para WhatsApp e Instagram, incorpora um mapa do Google e utiliza a tag do Google Ads para medir visitas e interações com nossos anúncios. Esses serviços podem usar cookies ou identificadores semelhantes conforme as políticas do Google e das respectivas empresas. Não vendemos dados pessoais.</p>

      <h2>5. Compartilhamento e retenção</h2>
      <p>Informações poderão ser compartilhadas somente quando necessárias à execução do serviço, ao cumprimento de obrigação legal ou ao exercício regular de direitos. Os dados são mantidos pelo período necessário para essas finalidades.</p>

      <h2>6. Seus direitos</h2>
      <p>Nos termos da Lei Geral de Proteção de Dados, você pode solicitar confirmação de tratamento, acesso, correção ou eliminação de dados quando aplicável.</p>

      <h2>7. Contato</h2>
      <p>Para dúvidas ou solicitações relacionadas à privacidade, entre em contato pelo telefone <a href={PHONE_TEL}>{PHONE_DISPLAY}</a> ou pelo Instagram <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">{INSTAGRAM_HANDLE}</a>.</p>

      <p className="legal-company">Netiv Transportes • CNPJ {CNPJ}</p>
      <a className="button button-dark" href={BASE_PATH}>Voltar ao site</a>
    </article>
  </main>
}
