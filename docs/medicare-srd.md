# Especificação de Requisitos - MediCare Portal

Documento oficial de especificação de requisitos de software para o projeto MediCare Portal.

## Requisitos de Auditoria e Privacidade (LGPD)

### REQ-AUD-002 - Registro de Trilha de Auditoria Imutável (Audit Trail)
- **Tipo**: Funcional
- **Categoria**: Conformidade & Auditoria
- **Descrição**: O sistema deve capturar e registrar em log imutável todas as operações de criação, alteração, exclusão e visualização de dados pessoais sensíveis ou transações financeiras, incluindo timestamp UTC, ID do usuário, IP de origem e snapshot das alterações.
- **Critérios de Aceitação**:
  1. Armazenamento dos registros em repositório de apêndice exclusivo (append-only).
  2. Impossibilidade de alteração ou exclusão do histórico mesmo por usuários administradores.
  3. Interface de consulta para auditoria com filtros por período, usuário e tipo de ação.

---

### REQ-PRIV-004 - Gestão de Consentimento e Direito ao Esquecimento (LGPD)
- **Tipo**: Funcional
- **Categoria**: Privacidade & Dados
- **Descrição**: O sistema deve fornecer módulo para que titulares de dados possam visualizar seus consentimentos concedidos, revogá-los a qualquer momento e solicitar a anonimização ou exclusão definitiva de seus dados pessoais (Direito ao Esquecimento).
- **Critérios de Aceitação**:
  1. Exportação de dados do usuário em formato aberto (JSON/CSV).
  2. Execução de rotina de anonimização no banco de dados mantendo integridade referencial.
  3. Envio de e-mail de confirmação da exclusão em até 15 dias úteis conforme exigido pela ANPD.
