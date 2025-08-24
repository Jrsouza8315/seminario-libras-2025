# II Seminário Acadêmico de LIBRAS - IFBA Campus Simões Filho

Uma landing page moderna e responsiva para o II Seminário Acadêmico de LIBRAS, desenvolvida com design inspirado no seminarioreboot.com.br e funcionalidades avançadas de inscrição e gerenciamento de participantes.

## 🎯 Sobre o Projeto

Este projeto é uma landing page completa para o II Seminário Acadêmico de LIBRAS, oferecendo:

- **Design Moderno**: Layout inspirado no seminarioreboot.com.br com cores institucionais do IFBA
- **Formulário Avançado**: Sistema de inscrição com campos condicionais e validação em tempo real
- **Integração com Banco de Dados**: Armazenamento seguro no Supabase
- **Geração de QR Code**: Ingressos virtuais com QR codes únicos
- **Responsividade**: Design adaptável para desktop, tablet e mobile
- **Acessibilidade**: Conformidade com padrões WCAG AA

## ✨ Funcionalidades

### 🎨 Interface Moderna

- **Hero Section**: Apresentação impactante com gradientes e animações
- **Navegação Fixa**: Menu responsivo com scroll suave
- **Seções Organizadas**: Sobre, Programação, Local e Inscrição
- **Cards Informativos**: Apresentação visual de benefícios e estatísticas
- **Timeline Interativa**: Programação com abas para manhã e tarde

### 📝 Sistema de Inscrição Avançado

- **Campos Condicionais**:
  - Campo "Curso" aparece apenas para estudantes
  - Especificação de acessibilidade quando necessário
- **Sexo Inclusivo**: Opções completas incluindo não-binário, transgênero, etc.
- **Acessibilidade Detalhada**: Radio buttons e campo de especificação
- **Autorizações Opcionais**: Uso de imagem e newsletter
- **Validação em Tempo Real**: Feedback imediato para o usuário
- **Máscara de Telefone**: Formatação automática (XX) XXXXX-XXXX

### 🔐 Integração com Supabase

- **Armazenamento Seguro**: Dados salvos em PostgreSQL
- **Row Level Security**: Políticas de segurança configuradas
- **Backup Local**: Fallback para localStorage
- **Sincronização**: Dados sincronizados automaticamente

### 🎫 Sistema de Ingressos

- **QR Code Único**: Gerado automaticamente para cada inscrição
- **Modal de Confirmação**: Apresentação elegante do ingresso
- **Download**: Opção para baixar ingresso em texto
- **Dados Completos**: Nome, código, data e informações do evento

### 📧 Sistema de E-mail

- **Template HTML**: E-mail profissional com branding do IFBA
- **Dados Dinâmicos**: Informações personalizadas do participante
- **Integração EmailJS**: Preparado para envio automático

## 🚀 Como Usar

### 1. Configuração Inicial

```bash
# Clone o repositório
git clone [URL_DO_REPOSITORIO]
cd seminario-libras-2025

# Abra o arquivo index.html em um navegador
# Ou use um servidor local
python -m http.server 8000
```

### 2. Configuração do Supabase (Obrigatório)

1. **Acesse o Projeto Supabase**:

   - URL: https://supabase.com/dashboard/project/rgwykudhnkvxkbwuggot
   - Faça login na sua conta Supabase

2. **Execute o Script SQL**:

   - Vá para "SQL Editor" no painel do Supabase
   - Copie e execute o conteúdo do arquivo `supabase-setup.sql`
   - Isso criará a tabela `inscriptions` com todas as colunas necessárias

3. **Obtenha as Credenciais da API**:

   - Vá para "Settings" > "API"
   - Copie a "Project URL" e "anon public" key
   - Abra o arquivo `script.js`
   - Substitua as credenciais na seção `CONFIG.supabase`

4. **Configure o Projeto**:
   ```javascript
   supabase: {
     url: "https://rgwykudhnkvxkbwuggot.supabase.co",
     key: "SUA_CHAVE_ANONIMA_AQUI"
   }
   ```

### 3. Configuração do E-mail (Opcional)

1. **Crie uma conta no EmailJS**:

   - Acesse https://www.emailjs.com/
   - Crie uma conta gratuita

2. **Configure o Serviço de E-mail**:

   - Adicione seu provedor de e-mail (Gmail, Outlook, etc.)
   - Crie um template de e-mail usando o arquivo `email-template.html`

3. **Atualize as Configurações**:
   ```javascript
   emailjs: {
     serviceId: "SEU_SERVICE_ID",
     templateId: "SEU_TEMPLATE_ID",
     userId: "SEU_USER_ID"
   }
   ```

### 4. Personalização

#### Cores e Branding

- Edite as variáveis CSS em `styles.css`:
  ```css
  :root {
    --primary-color: #00674d; /* Verde IFBA */
    --secondary-color: #dc143c; /* Vermelho */
    --accent-color: #ffd700; /* Dourado */
  }
  ```

#### Conteúdo do Evento

- Atualize as informações em `script.js`:
  ```javascript
  event: {
    name: "II Seminário Acadêmico de LIBRAS",
    date: "15 de Março de 2025",
    location: "IFBA Campus Simões Filho",
    time: "08:00 às 18:00"
  }
  ```

#### Imagens

- Substitua os placeholders em `assets/`:
  - `logo-ifba.png`: Logo oficial do IFBA
  - `libras-event.jpg`: Imagem relacionada ao evento

## 📱 Responsividade

O design é totalmente responsivo e otimizado para:

- **Desktop**: Layout completo com grid de 2 colunas
- **Tablet**: Layout adaptado com elementos empilhados
- **Mobile**: Menu hambúrguer e layout otimizado para toque

### Breakpoints

- `1024px`: Layout desktop para tablet
- `768px`: Layout tablet para mobile
- `480px`: Layout mobile otimizado

## ♿ Acessibilidade

O projeto segue as diretrizes WCAG AA:

- **Navegação por Teclado**: Todos os elementos são acessíveis via teclado
- **Contraste de Cores**: Relação de contraste adequada
- **Semântica HTML**: Estrutura semântica correta
- **ARIA Labels**: Atributos de acessibilidade quando necessário
- **Redução de Movimento**: Respeita preferências do usuário

## 🛠️ Tecnologias Utilizadas

### Frontend

- **HTML5**: Estrutura semântica
- **CSS3**: Grid, Flexbox, Variáveis CSS, Animações
- **JavaScript ES6+**: Classes, Async/Await, Fetch API

### Backend e Serviços

- **Supabase**: Banco de dados PostgreSQL
- **EmailJS**: Serviço de envio de e-mails
- **QRCode.js**: Geração de QR codes

### Bibliotecas e Recursos

- **Font Awesome**: Ícones
- **Google Fonts**: Tipografia Inter
- **Local Storage**: Backup local de dados

## 📁 Estrutura de Arquivos

```
seminario-libras-2025/
├── index.html              # Página principal
├── styles.css              # Estilos CSS
├── script.js               # JavaScript principal
├── assets/                 # Recursos visuais
│   ├── logo-ifba.png       # Logo do IFBA
│   └── libras-event.jpg    # Imagem do evento
├── supabase-setup.sql      # Script de configuração do banco
├── email-template.html     # Template de e-mail
├── config-example.js       # Exemplo de configuração
├── SUPABASE-SETUP.md       # Guia de configuração
└── README.md              # Documentação
```

## 🔧 Funcionalidades Técnicas

### Banco de Dados Supabase

- **Tabela `inscriptions`**: Armazena todos os dados de inscrição
- **Row Level Security**: Políticas de segurança configuradas
- **Índices Otimizados**: Performance para consultas
- **Triggers**: Atualização automática de timestamps

### Sistema de Formulário

- **Validação em Tempo Real**: Feedback imediato
- **Campos Condicionais**: Exibição dinâmica baseada em seleções
- **Máscaras de Input**: Formatação automática de dados
- **Prevenção de Duplicatas**: Controle por e-mail

### Geração de QR Code

- **Código Único**: Combinação de timestamp e random
- **Dados Criptografados**: Informações do participante
- **Alta Qualidade**: Correção de erros H
- **Download**: Opção de salvar ingresso

## 🚀 Deploy

### Opções de Hospedagem

- **GitHub Pages**: Gratuito e fácil
- **Netlify**: Deploy automático
- **Vercel**: Performance otimizada
- **Servidor Próprio**: Controle total

### Configuração para Produção

1. Configure as credenciais do Supabase
2. Configure o EmailJS
3. Substitua as imagens placeholder
4. Teste todas as funcionalidades
5. Configure domínio personalizado (opcional)

## 🔒 Segurança

- **HTTPS**: Recomendado para produção
- **Row Level Security**: Políticas no Supabase
- **Validação de Dados**: Frontend e backend
- **Sanitização**: Prevenção de XSS
- **Rate Limiting**: Proteção contra spam

## 📊 Monitoramento

### Métricas Recomendadas

- **Inscrições por dia**: Acompanhe o crescimento
- **Taxa de conversão**: Formulário vs. visitantes
- **Dispositivos**: Desktop vs. mobile
- **Performance**: Tempo de carregamento

### Ferramentas

- **Google Analytics**: Métricas de tráfego
- **Supabase Dashboard**: Monitoramento do banco
- **EmailJS Analytics**: Métricas de e-mail

## 🆘 Suporte

### Problemas Comuns

**Formulário não envia**

- Verifique as credenciais do Supabase
- Confirme a conexão com internet
- Verifique o console do navegador

**QR Code não gera**

- Confirme se o QRCode.js está carregado
- Verifique se há erros no console
- Teste em navegador diferente

**E-mail não chega**

- Verifique as configurações do EmailJS
- Confirme o template de e-mail
- Verifique a caixa de spam

### Contato

- **Desenvolvedor**: [Seu Nome]
- **E-mail**: [seu-email@exemplo.com]
- **GitHub**: [seu-usuario]

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 📝 Changelog

### v2.0.0 - Redesign Completo

- ✨ Novo design inspirado no seminarioreboot.com.br
- 🎨 Cores institucionais do IFBA
- 📱 Layout totalmente responsivo
- 🔄 Animações e transições suaves
- 📊 Cards informativos e estatísticas
- 🗓️ Timeline interativo com abas

### v1.0.0 - Versão Inicial

- 📝 Formulário de inscrição básico
- 🔐 Integração com Supabase
- 🎫 Geração de QR code
- 📧 Sistema de e-mail
- ♿ Acessibilidade básica

---

**Desenvolvido com ❤️ para o IFBA Campus Simões Filho**
