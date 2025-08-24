# II Seminário Acadêmico de LIBRAS - Landing Page

Uma landing page moderna e acessível para o II Seminário Acadêmico de LIBRAS do IFBA Campus Simões Filho.

## 🎯 Sobre o Projeto

Esta landing page foi desenvolvida para promover e gerenciar inscrições do II Seminário Acadêmico de LIBRAS, com foco em:

- **Acessibilidade**: Design inclusivo seguindo as melhores práticas de WCAG
- **Responsividade**: Funciona perfeitamente em dispositivos móveis e desktop
- **Funcionalidades Completas**: Sistema de inscrição, QR Code, envio de e-mails
- **Design Moderno**: Interface limpa e profissional usando as cores do cartaz oficial

## ✨ Funcionalidades

### 🎨 Interface

- **Design Responsivo**: Adaptável a todos os tamanhos de tela
- **Animações Suaves**: Transições e efeitos visuais elegantes
- **Navegação Intuitiva**: Menu fixo com scroll suave
- **Acessibilidade**: Suporte completo a leitores de tela e navegação por teclado

### 📝 Sistema de Inscrição

- **Formulário Completo**: Campos para todos os dados necessários
- **Campo Condicional**: Curso aparece apenas para estudantes
- **Sexo Inclusivo**: Todas as opções de identidade de gênero
- **Acessibilidade Detalhada**: Radio buttons + campo de especificação
- **Autorizações**: Uso de imagem e newsletter
- **Validação em Tempo Real**: Feedback imediato sobre erros
- **Máscara de Telefone**: Formatação automática do número
- **Verificação de Duplicatas**: Evita inscrições duplicadas
- **Controle de Capacidade**: Limite de 200 inscrições

### 🎫 Ingresso Virtual

- **QR Code Gerado**: Código único para cada participante
- **Download do Ingresso**: Arquivo de texto para impressão
- **Modal de Confirmação**: Exibição imediata após inscrição
- **Código Único**: Identificação individual de cada participante

### 📧 Sistema de E-mail

- **Confirmação Automática**: E-mail enviado após inscrição
- **Template Personalizado**: Design profissional para os e-mails
- **Integração Fácil**: Configuração simples com EmailJS

### 🗺️ Localização

- **Mapa Interativo**: Localização do evento
- **Direções**: Integração com Google Maps
- **Informações Detalhadas**: Endereço, sala e infraestrutura

## 🚀 Como Usar

### 1. Configuração Inicial

1. **Clone o repositório**:

```bash
git clone https://github.com/seu-usuario/seminario-libras-2025.git
cd seminario-libras-2025
```

2. **Abra o arquivo `index.html`** em seu navegador ou configure um servidor local.

### 2. Configuração do Supabase (Obrigatório)

Para conectar com o banco de dados Supabase:

1. **Acesse seu projeto no [Supabase](https://supabase.com/dashboard/project/rgwykudhnkvxkbwuggot)**

2. **Execute o script SQL** no SQL Editor:

   - Abra o arquivo `supabase-setup.sql`
   - Copie todo o conteúdo
   - Cole no SQL Editor do Supabase e execute

3. **Obtenha suas credenciais**:

   - Vá em **Settings > API**
   - Copie a **URL** e a **anon public key**

4. **Atualize as configurações** no arquivo `script.js`:

```javascript
supabase: {
    url: "https://rgwykudhnkvxkbwuggot.supabase.co",
    key: "SUA_ANON_KEY_AQUI"
}
```

### 3. Configuração do E-mail (Opcional)

Para habilitar o envio automático de e-mails de confirmação:

1. **Crie uma conta no [EmailJS](https://www.emailjs.com/)**
2. **Configure um template de e-mail** com as variáveis:

   - `{{to_name}}` - Nome do participante
   - `{{to_email}}` - E-mail do participante
   - `{{event_name}}` - Nome do evento
   - `{{event_date}}` - Data do evento
   - `{{event_location}}` - Local do evento
   - `{{inscription_code}}` - Código da inscrição

3. **Atualize as configurações** no arquivo `script.js`:

```javascript
emailService: {
    serviceId: 'SEU_SERVICE_ID',
    templateId: 'SEU_TEMPLATE_ID',
    userId: 'SEU_USER_ID'
}
```

### 4. Personalização

#### Cores e Estilo

As cores principais estão definidas no arquivo `styles.css`:

```css
:root {
  --primary-green: #1a4d2e; /* Verde principal */
  --secondary-green: #2d5a3d; /* Verde secundário */
  --accent-red: #dc2626; /* Vermelho de destaque */
  --light-red: #ef4444; /* Vermelho claro */
}
```

#### Informações do Evento

Edite o arquivo `script.js` para atualizar as informações:

```javascript
const CONFIG = {
  eventName: "II Seminário Acadêmico de LIBRAS",
  eventDate: "05 de Setembro de 2025 às 13h00",
  eventLocation: "IFBA - Campus Simões Filho",
  eventRoom: "Sala Audio 02 do pavilhão acadêmico",
  maxCapacity: 200,
};
```

#### Programação

Atualize a seção de programação no arquivo `index.html` conforme necessário.

## 📱 Responsividade

A página é totalmente responsiva e funciona em:

- **Desktop**: 1200px+
- **Tablet**: 768px - 1199px
- **Mobile**: 320px - 767px

## ♿ Acessibilidade

### Recursos Implementados

- **Navegação por Teclado**: Todos os elementos são acessíveis via teclado
- **Leitores de Tela**: Estrutura semântica e atributos ARIA
- **Contraste**: Cores com contraste adequado (WCAG AA)
- **Focus Visible**: Indicadores visuais de foco
- **Redução de Movimento**: Respeita preferências do usuário
- **Alt Text**: Imagens com descrições alternativas

### Testes de Acessibilidade

- ✅ Navegação por teclado
- ✅ Leitor de tela (NVDA, JAWS, VoiceOver)
- ✅ Contraste de cores
- ✅ Estrutura semântica
- ✅ Atributos ARIA

## 🛠️ Tecnologias Utilizadas

- **HTML5**: Estrutura semântica
- **CSS3**: Estilos modernos com CSS Grid e Flexbox
- **JavaScript ES6+**: Funcionalidades interativas
- **Supabase**: Banco de dados PostgreSQL
- **Font Awesome**: Ícones
- **Google Fonts**: Tipografia (Inter)
- **QRCode.js**: Geração de QR Codes
- **EmailJS**: Envio de e-mails (opcional)

## 📊 Estrutura de Arquivos

```
seminario-libras-2025/
├── index.html          # Página principal
├── styles.css          # Estilos CSS
├── script.js           # Funcionalidades JavaScript
├── README.md           # Documentação
└── LICENSE             # Licença
```

## 🔧 Funcionalidades Técnicas

### Banco de Dados Supabase

- Inscrições salvas no banco de dados PostgreSQL
- Sincronização automática com localStorage como backup
- Controle de capacidade em tempo real
- Validação de e-mails únicos no banco
- Timestamps automáticos de criação e atualização

### Validação de Formulário

- Validação em tempo real
- Feedback visual de erros
- Prevenção de envios inválidos

### Geração de QR Code

- Código único para cada participante
- Dados criptografados no QR Code
- Compatível com scanners padrão

## 📈 Métricas e Analytics

Para adicionar analytics, você pode incluir:

```html
<!-- Google Analytics -->
<script
  async
  src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"
></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag() {
    dataLayer.push(arguments);
  }
  gtag("js", new Date());
  gtag("config", "GA_MEASUREMENT_ID");
</script>
```

## 🚀 Deploy

### Opções de Hospedagem

1. **GitHub Pages** (Gratuito):

   ```bash
   git push origin main
   # Ative GitHub Pages nas configurações do repositório
   ```

2. **Netlify** (Gratuito):

   - Conecte seu repositório GitHub
   - Deploy automático

3. **Vercel** (Gratuito):

   - Importe o projeto
   - Deploy instantâneo

4. **Servidor Tradicional**:
   - Faça upload dos arquivos via FTP
   - Configure o servidor web

## 🔒 Segurança

### Boas Práticas Implementadas

- Validação client-side e server-side
- Sanitização de dados de entrada
- Prevenção de XSS
- Controle de acesso aos dados

### Recomendações Adicionais

- Implemente HTTPS em produção
- Configure CSP (Content Security Policy)
- Use um backend para validação server-side
- Implemente rate limiting para inscrições

## 📞 Suporte

Para dúvidas ou suporte:

- **E-mail**: seminario.libras@ifba.edu.br
- **Telefone**: (71) 3396-0000
- **Campus**: IFBA - Campus Simões Filho

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 🤝 Contribuição

Contribuições são bem-vindas! Para contribuir:

1. Faça um fork do projeto
2. Crie uma branch para sua feature
3. Commit suas mudanças
4. Push para a branch
5. Abra um Pull Request

## 📝 Changelog

### v1.0.0 (2025-01-XX)

- ✅ Landing page inicial
- ✅ Sistema de inscrição completo
- ✅ Geração de QR Code
- ✅ Sistema de e-mail
- ✅ Design responsivo
- ✅ Acessibilidade completa

---

**Desenvolvido com ❤️ para o II Seminário Acadêmico de LIBRAS**
