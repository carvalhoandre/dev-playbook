# 📖 Storybook & Design System Publishing Flow

> **Objetivo**: documentar um pipeline enxuto para compilar, testar e publicar o Design System em formato **npm library** (AWS CodeArtifact) e **Storybook static site** (AWS CloudFront), mantendo os consumidores sempre atualizados.

---

## 📑 Índice

1. [O que é Storybook?](#o-que-é-storybook)
2. [Por que usar Storybook?](#por-que-usar-storybook)
3. [Como implementar o Storybook](#como-implementar-o-storybook)
4. [Visão Geral do Pipeline](#visão-geral-do-pipeline)
5. [Diagrama de Fluxo](#diagrama-de-fluxo)
6. [Etapas Detalhadas](#etapas-detalhadas)
7. [Setup do Repositório](#setup-do-repositório)
8. [Pipeline CI/CD](#pipeline-cicd)
9. [Consumindo a Lib](#consumindo-a-lib)
10. [Boas Práticas](#boas-práticas)
11. [Referências](#referências)

---

## O que é Storybook?

O **Storybook** é uma ferramenta open source para desenvolvimento isolado, documentação e testes visuais de componentes de interface. Ele permite criar um catálogo interativo dos componentes do seu Design System, facilitando a visualização, testes e colaboração entre times de design e desenvolvimento.

---

## Por que usar Storybook?

- 📚 **Documentação viva:** Cada componente tem exemplos interativos e atualizados automaticamente.
- 🧪 **Testes visuais:** Detecta regressões de UI rapidamente.
- 🤝 **Integração Design-Dev:** Designers e devs falam a mesma língua, usando os mesmos exemplos.
- 🚀 **Onboarding rápido:** Novos membros entendem rapidamente o Design System.
- 🔍 **Acessibilidade:** Plugins como A11y ajudam a garantir componentes acessíveis.

---

## Como implementar o Storybook

### Instalação

```sh
pnpm add -D @storybook/angular @storybook/addon-essentials
```

### Inicialização

```sh
pnpm dlx sb init --type angular
```

### Estrutura recomendada

```
libs/design-system/
├─ src/
│  ├─ button/
│  │   ├─ button.component.ts
│  │   └─ button.stories.ts
│  └─ input/
│      └─ input.stories.ts
├─ .storybook/
│   ├─ main.js
│   └─ preview.js
```

### Exemplo de story

```ts
// button.stories.ts
import { ButtonComponent } from './button.component';
import { moduleMetadata } from '@storybook/angular';

export default {
  title: 'Design System/Button',
  component: ButtonComponent,
  decorators: [
    moduleMetadata({
      imports: [],
    }),
  ],
};

export const Primary = {
  args: {
    label: 'Botão Primário',
    variant: 'primary',
  },
};
```

### Rodando localmente

```sh
pnpm storybook
```

### Gerando build estático

```sh
pnpm build:storybook
# Gera a pasta storybook-static/
```

---

## Visão Geral do Pipeline

Este fluxo automatiza **do commit ao consumo**:

1. **Commit** no Git → dispara CI.
2. CI roda **build + testes**.
3. **Publishing**:

   * ***Design System Library*** (package) → **AWS CodeArtifact**.
   * ***Storybook estático*** → **S3** (origin) + **CloudFront** (CDN).
4. Aplicações consumidoras instalam a versão fixa do pacote (`^x.y.z`) e navegam na documentação por CloudFront.

---

## Diagrama de Fluxo

```mermaid
flowchart TD
  subgraph Dev Cycle
    A[👩‍💻 Developer] -->|1| B[Git Repo]
    B -->|2| C[CI/CD 🚀]
    C -->|3a| D[<img src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/amazonaws.svg" width="20"/> <b>AWS CodeArtifact</b>]
    C -->|3b| E[<img src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/amazonaws.svg" width="20"/> <b>Storybook<br>S3</b>]
    E -->|Certificado| F[<img src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/amazoncloudfront.svg" width="20"/> <b>CloudFront<br>+ SSL</b>]
  end
  D -->|4| G[App 1]
  D -->|4| H[App 2]
  F --> G
  F --> H

  classDef aws fill:#f1f5f9,stroke:#f59e0b,stroke-width:2px;
  class D,E,F aws;
```

> **Legenda**
>
> - **Ícones AWS**: Representam serviços gerenciados (CodeArtifact, S3, CloudFront).
> - **Certificado CloudFront**: Indica HTTPS/SSL para a documentação.
> - **Setas**: Mostram fluxo de publicação e consumo.
> - **Apps**: Consumidores do pacote e da documentação.

---

## Etapas Detalhadas

| #      | Etapa       | Descrição                                                                                                      |
| ------ | ----------- | -------------------------------------------------------------------------------------------------------------- |
| **1**  | Commit      | Dev faz push na branch `main` ou abre PR para `develop`.                                                       |
| **2**  | Armazenar   | Repo gerencia código-fonte + Storybook stories.                                                                |
| **3a** | Publish Lib | CI executa `npm publish --registry $CODE_ARTIFACT_URL`.                                                        |
| **3b** | Deploy Docs | `nx run design-system:storybook:build` → `aws s3 sync` → Invalida CloudFront.                                  |
| **4**  | Consumo     | Apps instalam `@org/design-system@^x.y.z` e acessam docs via [https://ds.example.com](https://ds.example.com). |

---

## Setup do Repositório

```
libs/design-system/
├─ src/
│  ├─ button/
│  └─ input/
├─ .storybook/
└─ project.json (Nx) | angular.json (Angular CLI)
```

* Stories ficam lado a lado do componente (`button.stories.ts`).
* `package.json` possui `publishConfig.registry` apontando para CodeArtifact.
* Versão controlada por **Conventional Commits** + `standard-version`.

---

## Pipeline CI/CD

### Exemplo GitHub Actions (simplificado)

```yaml
name: Design System CI

on:
  push:
    branches: [main]
  pull_request:
    paths: ['libs/design-system/**']

jobs:
  build-test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v2
      - run: pnpm install --frozen-lockfile
      - run: pnpm build:design-system && pnpm test:design-system

  publish:
    needs: build-test
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: aws-actions/configure-aws-credentials@v2
        with:
          role-to-assume: ${{ secrets.AWS_CI_ROLE }}
          aws-region: us-east-1
      - run: pnpm run release # semantic-release -> npm publish CodeArtifact

  storybook-deploy:
    needs: publish
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: pnpm build:storybook
      - run: aws s3 sync ./storybook-static s3://ds-storybook-bucket --delete
      - run: aws cloudfront create-invalidation --distribution-id E123456 --paths '/*'
```

---

## Consumindo a Lib

```sh
# .npmrc do consumidor
@org:registry=https://aws_codeartifact_us-east-1.amazonaws.com/npm/myrepo/
//aws_codeartifact_us-east-1.amazonaws.com/npm/myrepo/:always-auth=true
//aws_codeartifact_us-east-1.amazonaws.com/npm/myrepo/:_authToken=${CODEARTIFACT_AUTH_TOKEN}

# instalação
pnpm add @org/design-system@^1.2.0
```

No `angular.json` ou `tsconfig.json`, nenhuma configuração extra — componentes são **stand‑alone** e usam SSR-friendly styles.

---

## Boas Práticas

1. **Versão semântica** — `major.minor.patch`; faça **release automático** no merge para `main`.
2. **Changelog** — gerado via `semantic-release` + plugins Conventional Commits.
3. **Storybook A11y addon** — garanta acessibilidade por componente.
4. **Playroom / Histoire** — opcionais para playground de props.
5. **Cache em CI** — use `pnpm-store` e `storybook-static` no GitHub Actions cache.

---

## Referências

* [Storybook Docs](https://storybook.js.org/docs/angular/get-started/introduction)
* AWS CodeArtifact Docs – Publishing npm packages
* AWS CloudFront + S3 – Static website best practices
* Storybook Docs – Continuous Deployment
* "Design System CI/CD" – talk by Brad Frost
