// Base de Dados Pré-carregada para o Sistema de Reúso de Requisitos Baseado em Ontologias (Codinome O)

const GITHUB_BASE = 'https://github.com/Umhenrique/MVP_O_Reuso/blob/main/docs';

export const ONTOLOGY_TAXONOMIES = [
  {
    id: 'dominio',
    name: 'Domínio de Negócio',
    description: 'Segmentos de mercado e áreas de atuação do software',
    concepts: [
      'Fintech / Serviços Financeiros',
      'E-Commerce & Varejo',
      'Saúde / HealthTech',
      'Gestão Empresarial / ERP',
      'Mobilidade & Logística',
      'Rede Social & Comunicação'
    ]
  },
  {
    id: 'arquitetura',
    name: 'Padrão Arquitetural',
    description: 'Estilos e padronizações de arquitetura de software',
    concepts: [
      'Microserviços',
      'Monolítico Modular',
      'Serverless / Cloud Native',
      'Arquitetura Orientada a Eventos (EDA)',
      'Mobile First + REST API'
    ]
  },
  {
    id: 'tecnologia',
    name: 'Tecnologias & Frameworks',
    description: 'Linguagens, bancos de dados e infraestrutura tecnológica',
    concepts: [
      'Node.js / Express',
      'Python / FastAPI',
      'Java / Spring Boot',
      'React / Next.js',
      'PostgreSQL',
      'Redis',
      'Apache Kafka',
      'Docker / Kubernetes'
    ]
  },
  {
    id: 'conformidade',
    name: 'Segurança & Conformidade',
    description: 'Normas regulatórias e requisitos de proteção de dados',
    concepts: [
      'LGPD / Regulamentação de Privacidade',
      'PCI-DSS (Segurança em Cartões)',
      'ISO 27001',
      'Autenticação MFA & OAuth2 / OIDC',
      'Audit Trail / Logs Imutáveis de Auditoria',
      'Criptografia End-to-End'
    ]
  },
  {
    id: 'funcionalidade',
    name: 'Funcionalidades Chave',
    description: 'Módulos operacionais e capacidade técnica de uso',
    concepts: [
      'Processamento de Pagamento & Gateway',
      'Gestão de Usuários e Permissões (RBAC)',
      'Relatórios e Dashboards Analytics',
      'Notificações Push / E-mail / SMS',
      'Checkout Completo & Carrinho',
      'Gestão de Arquivos & Upload Seguro'
    ]
  },
  {
    id: 'nao_funcional',
    name: 'Atributos de Qualidade (RNF)',
    description: 'Propriedades de desempenho, disponibilidade e estabilidade',
    concepts: [
      'Alta Disponibilidade (SLA 99.99%)',
      'Tempo de Resposta < 200ms',
      'Escalabilidade Horizontal Automática',
      'Rate Limiting & Proteção Anti-DDoS',
      'Tolerância a Falhas & Redundância'
    ]
  }
];

export const INITIAL_PROJECTS = [
  {
    id: 'PRJ-PAY-01',
    name: 'PayFlux Gateway',
    description: 'Plataforma de processamento de pagamentos recorrentes e checkout seguro com alta escalabilidade.',
    domain: 'Fintech / Serviços Financeiros',
    architecture: 'Microserviços',
    techStack: ['Node.js / Express', 'PostgreSQL', 'Redis', 'Docker / Kubernetes'],
    compliance: ['PCI-DSS (Segurança em Cartões)', 'LGPD / Regulamentação de Privacidade', 'Autenticação MFA & OAuth2 / OIDC', 'Audit Trail / Logs Imutáveis de Auditoria'],
    features: ['Processamento de Pagamento & Gateway', 'Gestão de Usuários e Permissões (RBAC)', 'Checkout Completo & Carrinho'],
    qualityAttr: ['Alta Disponibilidade (SLA 99.99%)', 'Tempo de Resposta < 200ms', 'Rate Limiting & Proteção Anti-DDoS'],
    originPath: `${GITHUB_BASE}/payflux-srd.md`,
    createdAt: '2025-11-10'
  },
  {
    id: 'PRJ-MED-02',
    name: 'MediCare Portal',
    description: 'Sistema web e móvel para agendamento médico, telemedicina e prontuário eletrônico do paciente.',
    domain: 'Saúde / HealthTech',
    architecture: 'Monolítico Modular',
    techStack: ['Python / FastAPI', 'React / Next.js', 'PostgreSQL'],
    compliance: ['LGPD / Regulamentação de Privacidade', 'Autenticação MFA & OAuth2 / OIDC', 'Audit Trail / Logs Imutáveis de Auditoria', 'Criptografia End-to-End'],
    features: ['Gestão de Usuários e Permissões (RBAC)', 'Relatórios e Dashboards Analytics', 'Notificações Push / E-mail / SMS', 'Gestão de Arquivos & Upload Seguro'],
    qualityAttr: ['Alta Disponibilidade (SLA 99.99%)'],
    originPath: `${GITHUB_BASE}/medicare-srd.md`,
    createdAt: '2026-01-15'
  },
  {
    id: 'PRJ-ECO-03',
    name: 'OmniShop E-Commerce',
    description: 'Plataforma omnichannel para varejo com motor de recomendações e estoque em tempo real.',
    domain: 'E-Commerce & Varejo',
    architecture: 'Arquitetura Orientada a Eventos (EDA)',
    techStack: ['Node.js / Express', 'React / Next.js', 'Apache Kafka', 'Redis', 'PostgreSQL'],
    compliance: ['LGPD / Regulamentação de Privacidade', 'PCI-DSS (Segurança em Cartões)'],
    features: ['Checkout Completo & Carrinho', 'Processamento de Pagamento & Gateway', 'Notificações Push / E-mail / SMS', 'Relatórios e Dashboards Analytics'],
    qualityAttr: ['Tempo de Resposta < 200ms', 'Escalabilidade Horizontal Automática'],
    originPath: `${GITHUB_BASE}/omnishop-srd.md`,
    createdAt: '2026-03-22'
  },
  {
    id: 'PRJ-LOG-04',
    name: 'LogiSpeed ERP',
    description: 'Sistema ERP corporativo para rastreamento de frota e controle de distribuição logística.',
    domain: 'Mobilidade & Logística',
    architecture: 'Serverless / Cloud Native',
    techStack: ['Java / Spring Boot', 'PostgreSQL', 'Docker / Kubernetes'],
    compliance: ['ISO 27001', 'Audit Trail / Logs Imutáveis de Auditoria'],
    features: ['Gestão de Usuários e Permissões (RBAC)', 'Relatórios e Dashboards Analytics'],
    qualityAttr: ['Escalabilidade Horizontal Automática', 'Tolerância a Falhas & Redundância'],
    originPath: `${GITHUB_BASE}/logispeed-srd.md`,
    createdAt: '2026-04-05'
  }
];

export const INITIAL_REQUIREMENTS = [
  {
    id: 'REQ-AUTH-001',
    title: 'Autenticação Multifator (MFA) via TOTP / OAuth2',
    type: 'Funcional',
    category: 'Segurança & Acesso',
    description: 'O sistema deve obrigatoriamente exigir autenticação multifator (MFA) baseada em protocolo TOTP (como Google Authenticator) ou OAuth2 com OpenID Connect para todas as contas com privilégios administrativos ou acesso a dados sensíveis.',
    acceptanceCriteria: [
      'Geração de QR Code para pareamento inicial de aplicativo autenticador.',
      'Validação de token numérico de 6 dígitos com janela de expiração de 30 segundos.',
      'Bloqueio temporário da conta após 5 tentativas incorretas consecutivas.'
    ],
    originProject: 'PayFlux Gateway',
    originPath: `${GITHUB_BASE}/payflux-srd.md#req-auth-001---autentica%C3%A7%C3%A3o-multifator-mfa-via-totp--oauth2`,
    ontologyTags: [
      'Autenticação MFA & OAuth2 / OIDC',
      'Fintech / Serviços Financeiros',
      'PCI-DSS (Segurança em Cartões)',
      'Gestão de Usuários e Permissões (RBAC)',
      'LGPD / Regulamentação de Privacidade'
    ],
    status: 'Cadastrado',
    createdAt: '2025-11-12'
  },
  {
    id: 'REQ-AUD-002',
    title: 'Registro de Trilha de Auditoria Imutável (Audit Trail)',
    type: 'Funcional',
    category: 'Conformidade & Auditoria',
    description: 'O sistema deve capturar e registrar em log imutável todas as operações de criação, alteração, exclusão e visualização de dados pessoais sensíveis ou transações financeiras, incluindo timestamp UTC, ID do usuário, IP de origem e snapshot das alterações.',
    acceptanceCriteria: [
      'Armazenamento dos registros em repositório de apêndice exclusivo (append-only).',
      'Impossibilidade de alteração ou exclusão do histórico mesmo por usuários administradores.',
      'Interface de consulta para auditoria com filtros por período, usuário e tipo de ação.'
    ],
    originProject: 'MediCare Portal',
    originPath: `${GITHUB_BASE}/medicare-srd.md#req-aud-002---registro-de-trilha-de-auditoria-imut%C3%A1vel-audit-trail`,
    ontologyTags: [
      'Audit Trail / Logs Imutáveis de Auditoria',
      'LGPD / Regulamentação de Privacidade',
      'ISO 27001',
      'Saúde / HealthTech',
      'Fintech / Serviços Financeiros'
    ],
    status: 'Cadastrado',
    createdAt: '2026-01-18'
  },
  {
    id: 'REQ-PAY-003',
    title: 'Integração de Processamento de Pagamento Transacional',
    type: 'Funcional',
    category: 'Pagamento & Finanças',
    description: 'O sistema deve integrar-se com adquirentes e gateways de pagamento para autorização, captura e estorno de pagamentos via Cartão de Crédito, Pix e Boleto Bancário, garantindo idempotência em cada transação através de chaves únicas.',
    acceptanceCriteria: [
      'Suporte ao envio de chave de idempotência HTTP X-Idempotency-Key.',
      'Processamento síncrono com retorno de status em menos de 2 segundos.',
      'Webhook assíncrono seguro para confirmação de pagamento Pix e Boleto.'
    ],
    originProject: 'PayFlux Gateway',
    originPath: `${GITHUB_BASE}/payflux-srd.md#req-pay-003---integra%C3%A7%C3%A3o-de-processamento-de-pagamento-transacional`,
    ontologyTags: [
      'Processamento de Pagamento & Gateway',
      'Fintech / Serviços Financeiros',
      'PCI-DSS (Segurança em Cartões)',
      'Node.js / Express',
      'PostgreSQL',
      'Checkout Completo & Carrinho'
    ],
    status: 'Cadastrado',
    createdAt: '2025-11-20'
  },
  {
    id: 'REQ-PRIV-004',
    title: 'Gestão de Consentimento e Direito ao Esquecimento (LGPD)',
    type: 'Funcional',
    category: 'Privacidade & Dados',
    description: 'O sistema deve fornecer módulo para que titulares de dados possam visualizar seus consentimentos concedidos, revogá-los a qualquer momento e solicitar a anonimização ou exclusão definitiva de seus dados pessoais (Direito ao Esquecimento).',
    acceptanceCriteria: [
      'Exportação de dados do usuário em formato aberto (JSON/CSV).',
      'Execução de rotina de anonimização no banco de dados mantendo integridade referencial.',
      'Envio de e-mail de confirmação da exclusão em até 15 dias úteis conforme exigido pela ANPD.'
    ],
    originProject: 'MediCare Portal',
    originPath: `${GITHUB_BASE}/medicare-srd.md#req-priv-004---gest%C3%A3o-de-consentimento-e-direito-ao-esquecimento-lgpd`,
    ontologyTags: [
      'LGPD / Regulamentação de Privacidade',
      'Saúde / HealthTech',
      'E-Commerce & Varejo',
      'Gestão de Usuários e Permissões (RBAC)'
    ],
    status: 'Cadastrado',
    createdAt: '2026-01-22'
  },
  {
    id: 'REQ-PERF-005',
    title: 'Desempenho de Leitura em Alta Carga (Cache Distribuído)',
    type: 'Não-Funcional',
    category: 'Desempenho & Disponibilidade',
    description: 'O sistema deve responder a 95% das requisições de consulta de catálogo ou saldo com tempo total de resposta inferior a 150ms, utilizando camada de cache distribuído em memória (Redis) com política de invalidação inteligente.',
    acceptanceCriteria: [
      'Taxa de acerto de cache (Cache Hit Ratio) superior a 85% em ambiente de pico.',
      'Fallback automático para o banco de dados relacional caso a camada de cache fique indisponível.'
    ],
    originProject: 'OmniShop E-Commerce',
    originPath: `${GITHUB_BASE}/omnishop-srd.md#req-perf-005---desempenho-de-leitura-em-alta-carga-cache-distribu%C3%ADdo`,
    ontologyTags: [
      'Tempo de Resposta < 200ms',
      'Redis',
      'E-Commerce & Varejo',
      'Alta Disponibilidade (SLA 99.99%)',
      'Node.js / Express'
    ],
    status: 'Cadastrado',
    createdAt: '2026-03-25'
  },
  {
    id: 'REQ-SEC-006',
    title: 'Proteção contra Rate Limiting e Ataques de Negação de Serviço (DDoS)',
    type: 'Não-Funcional',
    category: 'Segurança & Infraestrutura',
    description: 'O sistema deve aplicar limites de taxa de requisição por IP e Token de API (máximo 100 requisições por minuto por cliente em endpoints de escrita) para mitigar potenciais ataques de negação de serviço (DDoS) e abuso de API.',
    acceptanceCriteria: [
      'Retorno do código HTTP 429 Too Many Requests com cabeçalho Retry-After.',
      'Configuração de regras dinâmicas por rota através de WAF ou Gateway de API.'
    ],
    originProject: 'PayFlux Gateway',
    originPath: `${GITHUB_BASE}/payflux-srd.md#req-sec-006---prote%C3%A7%C3%A3o-contra-rate-limiting-e-ataques-de-nega%C3%A7%C3%A3o-de-servi%C3%A7o-ddos`,
    ontologyTags: [
      'Rate Limiting & Proteção Anti-DDoS',
      'Microserviços',
      'Docker / Kubernetes',
      'Alta Disponibilidade (SLA 99.99%)',
      'Fintech / Serviços Financeiros'
    ],
    status: 'Cadastrado',
    createdAt: '2025-12-01'
  },
  {
    id: 'REQ-NOT-007',
    title: 'Notificações Multicanal Assíncronas (Push/E-mail/SMS)',
    type: 'Funcional',
    category: 'Comunicação',
    description: 'O sistema deve disponibilizar um serviço desacoplado para envio de mensagens e notificações aos usuários via E-mail, SMS e Push Notifications móvel, consumindo eventos em fila distribuída (Kafka / RabbitMQ).',
    acceptanceCriteria: [
      'Garantia de entrega at-least-once com política de retry e Dead Letter Queue (DLQ).',
      'Suporte a templates parametrizáveis em HTML para e-mails institucionais.'
    ],
    originProject: 'OmniShop E-Commerce',
    originPath: `${GITHUB_BASE}/omnishop-srd.md#req-not-007---notifica%C3%A7%C3%B5es-multicanal-ass%C3%ADncronas-pushe-mailsms`,
    ontologyTags: [
      'Notificações Push / E-mail / SMS',
      'Apache Kafka',
      'Arquitetura Orientada a Eventos (EDA)',
      'E-Commerce & Varejo',
      'Saúde / HealthTech'
    ],
    status: 'Cadastrado',
    createdAt: '2026-03-28'
  },
  {
    id: 'REQ-SCAL-008',
    title: 'Auto-scaling Horizontal Orientado a Métricas de CPU e Fila',
    type: 'Não-Funcional',
    category: 'Infraestrutura & Qualidade',
    description: 'A infraestrutura do sistema deve escalar automaticamente o número de réplicas de pods (Kubernetes HPA) quando o uso médio de CPU ultrapassar 75% por 3 minutos consecutivos ou a profundidade da fila de eventos superar 5.000 mensagens.',
    acceptanceCriteria: [
      'Tempo de provisionamento de novas réplicas inferior a 45 segundos.',
      'Desprovisionamento gradual (scale-down cooldown) de 10 minutos para evitar oscilações.'
    ],
    originProject: 'LogiSpeed ERP',
    originPath: `${GITHUB_BASE}/logispeed-srd.md#req-scal-008---auto-scaling-horizontal-orientado-a-m%C3%A9tricas-de-cpu-e-fila`,
    ontologyTags: [
      'Escalabilidade Horizontal Automática',
      'Docker / Kubernetes',
      'Serverless / Cloud Native',
      'Mobilidade & Logística',
      'Tolerância a Falhas & Redundância'
    ],
    status: 'Cadastrado',
    createdAt: '2026-04-08'
  }
];
