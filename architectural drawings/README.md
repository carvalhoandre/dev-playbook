# 🏛️ Architectural Drawings

> **Objetivo:** Centralizar diagramas arquiteturais do projeto, facilitando a compreensão visual das camadas, fluxos, integrações e decisões técnicas.

---

## 📑 Índice

1. [Visão Geral](#visão-geral)
2. [Diagramas PlantUML](#diagramas-plantuml)
3. [Diagramas PNG](#diagramas-png)
4. [Como visualizar e editar](#como-visualizar-e-editar)
5. [Boas práticas](#boas-práticas)

---

## Visão Geral

Esta pasta reúne diagramas essenciais para documentação técnica, cobrindo desde visão macro da arquitetura até detalhes de fluxo, camadas, microfrontends e banco de dados.

---

## Diagramas PlantUML

| Arquivo                       | Descrição                                      |
|-------------------------------|------------------------------------------------|
| `01-architecture-overview.puml`   | Visão geral da arquitetura do sistema         |
| `02-layers.puml`                  | Camadas técnicas: PWA, BFF, Dados             |
| `03-microfrontends.puml`          | Estratégia de microfrontends (Angular/Nx)     |
| `04-booking-sequence.puml`        | Fluxo de agendamento: idempotência, lock      |
| `05-deployment.puml`              | Topologia de deployment: CDN, K8s, Redis      |
| `06-database-schema.puml`         | Modelo relacional simplificado (ER)           |

---

## Diagramas PNG

| Arquivo PNG                                                        | Descrição                                      |
|--------------------------------------------------------------------|------------------------------------------------|
| `Camadas Técnicas — PWA, BFF, Dados.png`                           | Camadas técnicas do sistema                    |
| `Deployment — PWA + CDN + K8s + Redis + Postgres.png`              | Infraestrutura e deployment                    |
| `Fluxo de Agendamento — Idempotência + Lock + Outbox.png`          | Sequência de agendamento e garantias           |
| `Microfrontends — Angular + Nx + Module Federation.png`            | Microfrontends com Angular e Module Federation |
| `Modelo Relacional Simplificado (ER).png`                          | Diagrama ER simplificado                       |

---

## Como visualizar e editar

- **PlantUML (`.puml`):**
  - Visualize direto no VS Code com a extensão [PlantUML](https://marketplace.visualstudio.com/items?itemName=jebbs.plantuml).
  - Gere PNG/SVG via terminal:
    ```sh
    plantuml 01-architecture-overview.puml
    ```
- **PNG:**
  - Visualize em qualquer visualizador de imagens.
  - Arquivos gerados a partir dos `.puml` ou desenhados manualmente.

---

## Boas práticas

- Sempre atualize os diagramas ao alterar arquitetura ou fluxos relevantes.
- Prefira `.puml` para versionamento e colaboração.
- Inclua legenda e data nos diagramas para facilitar entendimento.
- Mantenha nomes de arquivos descritivos e padronizados.

---

## Referências

- [PlantUML Documentation](https://plantuml.com/pt/)
- [C4 Model for Visualising Software Architecture](https://c4model.com/)