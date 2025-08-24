// Arquivo de exemplo de configuração
// Copie este arquivo para config.js e preencha com suas credenciais

const CONFIG_EXAMPLE = {
  eventName: "II Seminário Acadêmico de LIBRAS",
  eventDate: "05 de Setembro de 2025 às 13h00",
  eventLocation: "IFBA - Campus Simões Filho",
  eventRoom: "Sala Audio 02 do pavilhão acadêmico",
  maxCapacity: 200,

  // Configuração do Supabase (OBRIGATÓRIO)
  supabase: {
    url: "https://rgwykudhnkvxkbwuggot.supabase.co",
    key: "SUA_ANON_KEY_AQUI", // Substitua pela sua chave anônima do Supabase
  },

  // Configuração do EmailJS (OPCIONAL)
  emailService: {
    serviceId: "YOUR_SERVICE_ID",
    templateId: "YOUR_TEMPLATE_ID",
    userId: "YOUR_USER_ID",
  },
};

// Novos campos implementados:
// - Campo de curso (aparece quando área = "educacao")
// - Campo de sexo (com todas as opções inclusivas)
// - Acessibilidade detalhada (radio + textarea)
// - Autorizações (imagem e newsletter)

// Para usar:
// 1. Copie este arquivo para config.js
// 2. Preencha suas credenciais do Supabase
// 3. Importe no script.js: import { CONFIG } from './config.js';
