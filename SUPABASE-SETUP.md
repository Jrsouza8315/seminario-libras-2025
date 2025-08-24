# 🔧 Configuração do Supabase

Este guia explica como configurar o Supabase para armazenar as inscrições do evento.

## 📋 Pré-requisitos

- Acesso ao projeto Supabase: https://supabase.com/dashboard/project/rgwykudhnkvxkbwuggot
- Conhecimento básico de SQL (opcional, o script está pronto)

## 🚀 Passo a Passo

### 1. Acessar o Projeto Supabase

1. Vá para: https://supabase.com/dashboard/project/rgwykudhnkvxkbwuggot
2. Faça login na sua conta Supabase
3. Você será direcionado para o dashboard do projeto

### 2. Criar a Tabela de Inscrições

1. No menu lateral, clique em **"SQL Editor"**
2. Clique em **"New query"**
3. Copie todo o conteúdo do arquivo `supabase-setup.sql`
4. Cole no editor SQL
5. Clique em **"Run"** para executar o script

### 3. Verificar a Tabela Criada

1. No menu lateral, clique em **"Table Editor"**
2. Você deve ver a tabela `inscriptions` criada
3. Clique na tabela para ver sua estrutura

### 4. Obter as Credenciais da API

1. No menu lateral, clique em **"Settings"**
2. Clique em **"API"**
3. Copie as seguintes informações:
   - **Project URL**: `https://rgwykudhnkvxkbwuggot.supabase.co`
   - **anon public key**: (chave longa que começa com `eyJ...`)

### 5. Configurar o Projeto

1. Abra o arquivo `script.js`
2. Localize a seção de configuração do Supabase:
   ```javascript
   supabase: {
     url: "https://rgwykudhnkvxkbwuggot.supabase.co",
     key: "YOUR_SUPABASE_ANON_KEY"
   }
   ```
3. Substitua `YOUR_SUPABASE_ANON_KEY` pela chave anônima copiada

### 6. Testar a Conexão

1. Abra o arquivo `index.html` no navegador
2. Abra o Console do navegador (F12)
3. Você deve ver a mensagem: "Supabase inicializado com sucesso"
4. Teste fazendo uma inscrição

## 🔍 Estrutura da Tabela

A tabela `inscriptions` contém os seguintes campos:

| Campo            | Tipo      | Descrição                             |
| ---------------- | --------- | ------------------------------------- |
| `id`             | TEXT      | ID único da inscrição                 |
| `nome`           | TEXT      | Nome completo do participante         |
| `email`          | TEXT      | E-mail (único)                        |
| `telefone`       | TEXT      | Telefone (opcional)                   |
| `instituicao`    | TEXT      | Instituição/Organização               |
| `area`           | TEXT      | Área de atuação                       |
| `experiencia`    | TEXT      | Experiência com LIBRAS                |
| `acessibilidade` | BOOLEAN   | Precisa de recursos de acessibilidade |
| `newsletter`     | BOOLEAN   | Deseja receber newsletter             |
| `codigo`         | TEXT      | Código único do ingresso              |
| `created_at`     | TIMESTAMP | Data de criação                       |
| `updated_at`     | TIMESTAMP | Data da última atualização            |

## 🔒 Segurança

- **Row Level Security (RLS)** está habilitado
- **Políticas de acesso** permitem inserção e leitura públicas
- **E-mails únicos** são validados automaticamente
- **Códigos únicos** para cada ingresso

## 🚨 Solução de Problemas

### Erro: "Supabase não inicializado"

- Verifique se a URL e chave estão corretas
- Confirme se o script do Supabase está carregando

### Erro: "Erro ao salvar no Supabase"

- Verifique se a tabela foi criada corretamente
- Confirme se as políticas RLS estão ativas
- Verifique o console do navegador para detalhes

### Erro: "E-mail já existe"

- O sistema impede inscrições duplicadas
- Use um e-mail diferente para teste

## 📊 Monitoramento

Para acompanhar as inscrições:

1. No Supabase Dashboard, vá em **"Table Editor"**
2. Clique na tabela `inscriptions`
3. Você verá todas as inscrições em tempo real

## 🔄 Backup

O sistema mantém um backup no localStorage do navegador:

- Se o Supabase estiver indisponível, usa localStorage
- Quando o Supabase volta, sincroniza automaticamente
- Dados nunca são perdidos

## 📞 Suporte

Se encontrar problemas:

1. Verifique o console do navegador (F12)
2. Confirme se todas as credenciais estão corretas
3. Teste a conexão com o Supabase
4. Verifique se a tabela foi criada corretamente

---

**✅ Configuração concluída!** As inscrições agora serão salvas no banco de dados Supabase.
