-- Script para configurar a tabela de inscrições no Supabase
-- Execute este script no SQL Editor do seu projeto Supabase

 -- Criar tabela de inscrições
 CREATE TABLE IF NOT EXISTS inscriptions (
     id TEXT PRIMARY KEY,
     nome TEXT NOT NULL,
     email TEXT NOT NULL UNIQUE,
     telefone TEXT,
     instituicao TEXT,
     area TEXT,
     experiencia TEXT,
     curso TEXT,
     sexo TEXT,
     acessibilidade_tipo TEXT DEFAULT 'nenhuma',
     acessibilidade_especifica TEXT,
     autoriza_imagem BOOLEAN DEFAULT FALSE,
     newsletter BOOLEAN DEFAULT FALSE,
     codigo TEXT NOT NULL UNIQUE,
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
     updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
 );

-- Criar índices para melhor performance
CREATE INDEX IF NOT EXISTS idx_inscriptions_email ON inscriptions(email);
CREATE INDEX IF NOT EXISTS idx_inscriptions_codigo ON inscriptions(codigo);
CREATE INDEX IF NOT EXISTS idx_inscriptions_created_at ON inscriptions(created_at);

-- Habilitar Row Level Security (RLS)
ALTER TABLE inscriptions ENABLE ROW LEVEL SECURITY;

-- Política para permitir inserções públicas (para inscrições)
CREATE POLICY "Permitir inserções públicas" ON inscriptions
    FOR INSERT WITH CHECK (true);

-- Política para permitir leitura pública (para contagem de inscrições)
CREATE POLICY "Permitir leitura pública" ON inscriptions
    FOR SELECT USING (true);

-- Função para atualizar o campo updated_at automaticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger para atualizar updated_at automaticamente
CREATE TRIGGER update_inscriptions_updated_at 
    BEFORE UPDATE ON inscriptions 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

 -- Comentários na tabela
 COMMENT ON TABLE inscriptions IS 'Tabela para armazenar inscrições do II Seminário Acadêmico de LIBRAS';
 COMMENT ON COLUMN inscriptions.id IS 'ID único da inscrição';
 COMMENT ON COLUMN inscriptions.nome IS 'Nome completo do participante';
 COMMENT ON COLUMN inscriptions.email IS 'E-mail do participante (único)';
 COMMENT ON COLUMN inscriptions.telefone IS 'Telefone do participante';
 COMMENT ON COLUMN inscriptions.instituicao IS 'Instituição/Organização do participante';
 COMMENT ON COLUMN inscriptions.area IS 'Área de atuação do participante';
 COMMENT ON COLUMN inscriptions.experiencia IS 'Experiência com LIBRAS';
 COMMENT ON COLUMN inscriptions.curso IS 'Curso do estudante (se aplicável)';
 COMMENT ON COLUMN inscriptions.sexo IS 'Sexo do participante';
 COMMENT ON COLUMN inscriptions.acessibilidade_tipo IS 'Tipo de acessibilidade necessária';
 COMMENT ON COLUMN inscriptions.acessibilidade_especifica IS 'Detalhes específicos de acessibilidade';
 COMMENT ON COLUMN inscriptions.autoriza_imagem IS 'Autoriza uso de imagem';
 COMMENT ON COLUMN inscriptions.newsletter IS 'Se deseja receber newsletter';
 COMMENT ON COLUMN inscriptions.codigo IS 'Código único do ingresso';
 COMMENT ON COLUMN inscriptions.created_at IS 'Data de criação da inscrição';
 COMMENT ON COLUMN inscriptions.updated_at IS 'Data da última atualização';

-- Inserir dados de exemplo (opcional)
-- INSERT INTO inscriptions (id, nome, email, telefone, instituicao, area, experiencia, acessibilidade, newsletter, codigo) 
-- VALUES 
--     ('exemplo1', 'João Silva', 'joao@exemplo.com', '(71) 99999-9999', 'IFBA', 'Educação', 'Básica', false, true, 'ABC12345'),
--     ('exemplo2', 'Maria Santos', 'maria@exemplo.com', '(71) 88888-8888', 'UFBA', 'Saúde', 'Intermediária', true, false, 'DEF67890');
