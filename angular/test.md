# 🧪 Guia Prático de Testes em Angular

> **Objetivo:** Garantir aplicações confiáveis, com alta cobertura (≥ 90 %), feedback rápido e sem testes redundantes.

---

<div align="center">

![Cobertura Alta](https://img.shields.io/badge/Cobertura-90%25%2B-4ade80?style=for-the-badge&logo=jest&logoColor=white)
![Feedback Rápido](https://img.shields.io/badge/Feedback-Rápido-38bdf8?style=for-the-badge&logo=thunder&logoColor=white)
![Sem Redundância](https://img.shields.io/badge/Testes-Sem%20Redundância-fbbf24?style=for-the-badge&logo=checkmarx&logoColor=white)

</div>

---

## 📑 Índice

1. [Filosofia de Testes](#filosofia-de-testes)
2. [Ferramentas & Configuração](#ferramentas--configuração)
3. [Padrão de `data-testid`](#padrão-de-data-testid)
4. [Estrutura dos Arquivos](#estrutura-dos-arquivos)
5. [Mocks & Spies](#mocks--spies)
6. [Cobertura Alta](#cobertura-alta)
7. [Evitando Redundância](#evitando-redundância)
8. [Exemplos Práticos](#exemplos-práticos)
9. [Dicas de Performance](#dicas-de-performance)
10. [Referências](#referências)

---

## 🧭 Filosofia de Testes

| Princípio                          | Descrição                                                                                  |
| ---------------------------------- | ------------------------------------------------------------------------------------------ |
| **Pirâmide > Troféu**              | Foque em testes unitários/componentes; E2E só para fluxos críticos.                        |
| **Teste o *porquê*, não o *como*** | Valide comportamento observável, não detalhes internos.                                    |
| **Isolamento por padrão**          | Cada teste deve rodar em qualquer ordem, sem dependências.                                 |
| **Red → Green → Refactor**         | Escreva o teste falhando, depois faça passar e só então refatore.                         |
| **Componentes primeiro**           | Teste componentes globais isolados; páginas testam só integração e fluxo.                  |

> 💡 **Regra de Ouro:** Um teste = 1 cenário claro = 1 expectativa principal.

---

## 🛠️ Ferramentas & Configuração

| Categoria             | Ferramenta                     | Por quê?                          |
| --------------------- | ------------------------------ | --------------------------------- |
| Runner + Assert       | **Jest**                       | Rápido, snapshots, ESM.           |
| Render de Componentes | **@testing-library/angular**   | Testes focados no usuário.        |
| Mock HTTP             | **HttpTestingController**      | Controle total das requests.      |
| Spies                 | **jest.spyOn()**               | Sem dependência do Angular zone.  |
| Coverage              | `--coverage` + **c8/istanbul** | Relatórios detalhados.            |

```bash
# Instalação (exemplo Nx)
pnpm add -D jest @testing-library/angular jest-preset-angular jest-environment-jsdom
```

```typescript
// jest.config.ts
export default {
  preset: 'jest-preset-angular',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
  collectCoverage: true,
  coverageThreshold: {
    global: { branches: 80, functions: 80, lines: 80, statements: 80 }
  }
};
// setup-jest.ts
import '@testing-library/jest-dom';
```

---

## 🏷️ Padrão de `data-testid`

Selecione elementos sem acoplar ao DOM:

```html
<button data-testid="btn-login-submit">Enviar</button>
```

- Use **kebab-case** e prefixo (`btn-`, `input-`, `link-`).
- Só adicione onde o teste realmente precisa.

```typescript
screen.getByTestId('btn-login-submit');
```

---

## 🗂️ Estrutura dos Arquivos

```
/feature/orders/
├─ orders.page.ts               # Componente
├─ orders.page.spec.ts          # Teste unidade/componente
└─ orders.mock.ts               # Fixtures & helpers
```

- Testes (`*.spec.ts`) ao lado do código.
- Utilitários compartilhados em `/shared/testing/`.
- Nome dos testes em **PascalCase** (`describe('OrdersPage', ...)`).

**Camadas:**
- Componentes globais: testam props, emitters e estados visuais.
- Páginas: testam fluxos de usuário, navegação e integração — **não** revalidam lógica interna dos componentes.

---

## 🕹️ Mocks & Spies

**Serviços:**
```typescript
class AuthApiMock {
  login = jest.fn().mockResolvedValue({ token: 'fake' });
}
beforeEach(() => {
  TestBed.overrideProvider(AuthApi, { useValue: new AuthApiMock() });
});
```

**HTTP Client:**
```typescript
const httpMock = TestBed.inject(HttpTestingController);
component.save();
const req = httpMock.expectOne('/api/orders');
req.flush({ id: 1 });
```

**Router:**
```typescript
provideRouterTestHarness();
const router = TestBed.inject(Router);
jest.spyOn(router, 'navigateByUrl');
```

---

## 📈 Cobertura Alta

1. Teste todos os fluxos condicionais (if/else) — use tabelas de casos.
2. Simule erros de API:  
   `req.flush({}, { status: 500, statusText: 'Error' })`
3. Cubra *pipes* e *directives* reutilizadas.
4. Priorize lógica pura em serviços.

> 🎯 **Meta realista:** 90 % statements / 80 % branches.

---

## 🚫 Evitando Redundância

| Anti‑pattern                                  | Por que evitar   | Alternativa                                                                               |
| --------------------------------------------- | ---------------- | ----------------------------------------------------------------------------------------- |
| Testar getters/setters triviais               | Valor mínimo     | Combine com cenários maiores.                                                             |
| Duplicar teste só mudando mensagem            | Não agrega valor | Use `describe.each()` para tabela de casos.                                               |
| Mockar Angular internals (ChangeDetector)     | Alto acoplamento | Foque na renderização final (Testing Library).                                            |
| Retestar componentes globais nas páginas      | Duplicação       | Confie nos testes do componente; nas páginas, só teste integração e resultado final.      |

**Checklist anti-redundância:**
- Removeu duplicatas?  
- Cada teste falha se **1** comportamento quebrar?  
- Cobertura subiu mas linhas úteis não? Revise.

---

## 🧩 Exemplos Práticos

### Teste de Componente – Formulário de Login

```typescript
import { render, screen } from '@testing-library/angular';
import { LoginFormComponent } from './login-form.component';

it('envia credenciais válidas', async () => {
  const mockAuth = { login: jest.fn().mockResolvedValue(null) };

  await render(LoginFormComponent, {
    componentProperties: { authApi: mockAuth as any }
  });

  userEvent.type(screen.getByLabelText(/email/i), 'dev@example.com');
  userEvent.type(screen.getByLabelText(/senha/i), '123456');
  userEvent.click(screen.getByTestId('btn-login-submit'));

  expect(mockAuth.login).toHaveBeenCalledWith({
    email: 'dev@example.com',
    password: '123456'
  });
});
```

### Teste de Serviço – Cálculo de Carrinho

```typescript
import { CartService } from './cart.service';

it.each([
  { items: [], total: 0 },
  { items: [{ price: 10, qty: 2 }], total: 20 }
])('calcula total %#', ({ items, total }) => {
  const service = new CartService();
  service.items = items as any;
  expect(service.total()).toBe(total);
});
```

---

## ⚡ Dicas de Performance

- Use `jest --runInBand` só em CI limitado; local, aproveite o paralelismo.
- Prefira mocks manuais a `jest.mock('axios')` global.
- Use `--silent` em watch para enxergar falhas rapidamente.
- Snapshot test? Só onde HTML é grande e estável.

---

## 📚 Referências

- [Angular Docs – Testing](https://angular.io/guide/testing)
- [Jest – Best Practices](https://jestjs.io/docs/getting-started)
- [Testing Library – Queries & Guiding Principles](https://testing-library.com/docs/queries/about)
- ["High‑Coverage, Low‑Pain" – Kent C. Dodds](https://kentcdodds.com/blog/high-coverage-low-pain)

---

<div align="center">

Feito com 💙 para devs que buscam qualidade e agilidade em seus testes.

</div>
