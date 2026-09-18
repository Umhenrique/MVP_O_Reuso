# Especificação de Requisitos - OmniShop E-Commerce

Documento oficial de especificação de requisitos de software para o projeto OmniShop E-Commerce.

## Requisitos de Desempenho e Notificação

### REQ-PERF-005 - Desempenho de Leitura em Alta Carga (Cache Distribuído)
- **Tipo**: Não-Funcional
- **Categoria**: Desempenho & Disponibilidade
- **Descrição**: O sistema deve responder a 95% das requisições de consulta de catálogo ou saldo com tempo total de resposta inferior a 150ms, utilizando camada de cache distribuído em memória (Redis) com política de invalidação inteligente.
- **Critérios de Aceitação**:
  1. Taxa de acerto de cache (Cache Hit Ratio) superior a 85% em ambiente de pico.
  2. Fallback automático para o banco de dados relacional caso a camada de cache fique indisponível.

---

### REQ-NOT-007 - Notificações Multicanal Assíncronas (Push/E-mail/SMS)
- **Tipo**: Funcional
- **Categoria**: Comunicação
- **Descrição**: O sistema deve disponibilizar um serviço desacoplado para envio de mensagens e notificações aos usuários via E-mail, SMS e Push Notifications móvel, consumindo eventos em fila distribuída (Kafka / RabbitMQ).
- **Critérios de Aceitação**:
  1. Garantia de entrega at-least-once com política de retry e Dead Letter Queue (DLQ).
  2. Suporte a templates parametrizáveis em HTML para e-mails institucionais.
