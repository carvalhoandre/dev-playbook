import { Meta } from '@storybook/blocks'

<Meta title="Design System/Entrega de Valor" />

# Design System — Entrega de Valor

    > ** Pitch rápido(lúdico):** Pense no Design System como um ** kit LEGO corporativo **: peças padronizadas, bonitas e seguras que permitem aos times ** montar telas como quem monta modelos **, com velocidade de pit stop — sem abrir mão de qualidade.

---

export const parameters = { options: { showPanel: false } }

{/* 🧮 Parâmetros fáceis de ajustar (simulações) */ }

const CFG = {
    squads: 6,
    featuresPerMonth: 4,
    hoursBefore: 60,  // horas para entregar 1 feature sem DS (exemplo didático)
    hoursAfter: 23,   // horas com DS (reuso + padronização)
    rate: 180,        // R$ por hora (custo médio alocado)
    setupWeeks: 4,    // semanas de setup inicial do DS (piloto + fundações)
    setupPeople: 3,   // 2 devs + 1 designer dedicados
    hoursPerWeek: 40,
    adoption3m: 0.5,  // adoção esperada em 3 meses
    adoption6m: 0.85, // adoção esperada em 6 meses
}

const hoursSavedPerFeature = CFG.hoursBefore - CFG.hoursAfter;
const monthlyHoursSavedRaw = hoursSavedPerFeature * CFG.featuresPerMonth * CFG.squads;
const monthlySavingsRaw = monthlyHoursSavedRaw * CFG.rate;
const yearlySavingsRaw = monthlySavingsRaw * 12;

const setupCostRaw = CFG.setupWeeks * CFG.hoursPerWeek * CFG.setupPeople * CFG.rate;
const netMonthlyBenefitRaw = monthlySavingsRaw - (CFG.setupPeople * CFG.rate * CFG.hoursPerWeek); // custo mensal da equipe DS (aprox.)
const paybackMonths = setupCostRaw / Math.max(netMonthlyBenefitRaw, 1);

const fmt = (n) => n.toLocaleString?.('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }) ?? `R$ ${Math.round(n).toLocaleString('pt-BR')}`
const num = (n) => n.toLocaleString?.('pt-BR') ?? `${n}`

function ValueCard({ label, value, footnote }) {
    return (
        <div style= {{
        padding: 16,
            borderRadius: 16,
                boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
                    border: '1px solid rgba(0,0,0,0.06)',
                        display: 'flex',
                            flexDirection: 'column',
                                gap: 4,
                                    minWidth: 220,
    }
}>
    <div style={ { fontSize: 12, opacity: 0.7 } }> { label } </div>
        < div style = {{ fontSize: 28, fontWeight: 700 }}> { value } </div>
{ footnote && <div style={ { fontSize: 12, opacity: 0.6 } }> { footnote } </div> }
</div>
  )
}

function Pill({ children }) {
    return <span style={
        {
            padding: '4px 10px',
                borderRadius: 999,
                    border: '1px solid rgba(0,0,0,0.1)',
                        fontSize: 12,
                            background: 'linear-gradient(180deg, rgba(255,255,255,0.9), rgba(245,245,245,0.9))'
        }
    }> { children } </span>
}

---

## Resumo executivo

    - ** Problema **: telas feitas do zero variam em qualidade, consomem tempo e geram retrabalho.
- ** Solução **: um ** Design System ** com componentes reutilizáveis, tokens e guias claros.
- ** Valor **: ** menos horas por feature, menos bugs, mais consistência e acessibilidade **.

< div style = {{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
    <ValueCard label="Horas economizadas/feature" value = {`${num(hoursSavedPerFeature)} h`} footnote = {`${CFG.hoursBefore}h → ${CFG.hoursAfter}h`} />
        < ValueCard label = "Economia mensal (simulada)" value = { fmt(monthlySavingsRaw) } footnote = {`${num(monthlyHoursSavedRaw)} h poupadas/mês`} />
            < ValueCard label = "Economia anual (simulada)" value = { fmt(yearlySavingsRaw) } footnote = "com base no volume e taxa atuais" />
                <ValueCard label="Payback estimado" value = {`${paybackMonths.toFixed(1)} mês(es)`} footnote = {`Setup ≈ ${fmt(setupCostRaw)} • Benefício líquido/mês ≈ ${fmt(netMonthlyBenefitRaw)}`} />
                    </div>

                    > ** Mensagem ao negócio:** com reuso e governança, ** ganhamos velocidade sem perder qualidade **.O retorno financeiro aparece ** no primeiro trimestre ** e se amplia conforme a adoção cresce.

---

## O que é(em 1 minuto)

O Design System é um ** kit de peças padrão ** (componentes UI, tokens, padrões de interação) + ** modo de usar ** (documentação e exemplos).Ele ** evita reinventar a roda ** em cada squad e ** transforma design & front - end numa fábrica confiável **.

- <Pill>Velocidade </Pill> montar telas rapidamente.
    - <Pill>Qualidade </Pill> padrões testados e acessíveis.
    - <Pill>Previsibilidade </Pill> menos incidentes e variação.

---

## Antes × Depois(exemplo lúdico: “Fluxo de Cotação”)

    ** Sem DS ** vs ** Com DS ** para 1 feature típica:

| Atividade | Sem DS | Com DS |
| ---| ---:| ---:|
| Descoberta visual & UX | 12h | 6h |
| Montagem de UI | 24h | 8h |
| QA visual | 10h | 4h |
| Acessibilidade(A11y) | 6h | 2h |
| Correções pós - release | 8h | 3h |
| ** Total ** | ** 60h ** | ** 23h ** |

> ** Leitura rápida:** **−61 %** no esforço de UI para a mesma entrega.

---

## Métricas de sucesso(north star + operacionais)

    - ** Lead time de tela ** (ideia → prod): alvo **−30 %** em 3 meses.
- ** Taxa de reuso ** (# de componentes DS / # total): alvo **≥ 70 %** em 6 meses.
- ** Bugs de UI por release **: alvo **−40 %** em 3–6 meses.
- ** Lighthouse UI / A11y **: alvo **≥ 90 **.
- ** Satisfação dos squads ** (NPS interno): alvo **≥ +40 **.

> Painel no time de Produto acompanhará esses indicadores por squad e por produto.

---

## Projeções & crescimento(adoção)

    - ** 3 meses **: adoção ** { Math.round(CFG.adoption3m * 100) } %** → primeiros ganhos visíveis, padrões core prontos(botões, formulário, tabelas, toasts, grid).
- ** 6 meses **: adoção ** { Math.round(CFG.adoption6m * 100) } %** → bibliotecas setoriais(ex.: cotação, pagamento, autenticação) documentadas com exemplos.
- ** 12 meses **: maturidade de governança, ** biblioteca estável ** + guia de contribuição e de depreciação.

> * Curva S de adoção *: começamos mais lentos(setup e convencimento), depois aceleramos com ** efeito rede **.

---

## Roadmap de valor

1. ** Piloto(4–6 semanas) **: inventário de padrões, tokens, 10 componentes críticos, documentação no Storybook.
2. ** Fase 2(Mês 2–3) **: tabelas avançadas, formulários complexos, tema, A11y end - to - end.
3. ** Fase 3(Mês 4–6) **: guidelines de escrita(microcopy), exemplos de página, geração de código / boilerplates.
4. ** Fase 4(Mês 6–12) **: métricas automáticas, lint de UI, playbooks de migração.

---

## Governança leve(sem burocracia)

    - ** Owner claro ** (Design Ops + Frontend Platform).
- ** Critérios de entrada ** (acessibilidade, testes visuais, semântica, tokens).
- ** Versionamento sem dor ** (semver + changelog + códigos de depreciação).
- ** Ciclo de contribuição **: PRDs curtos, exemplos, pareamento com mantenedores.

---

## FAQ para gestores

    **“Isso não engessa ?”**  → Não.O DS cobre 80 % dos casos.O 20 % restante vira aprendizado para evoluir o kit. 

**“Quanto custa manter ?”** → Time enxuto(2 devs + 1 designer) e automações(testes visuais e a11y) mantêm o sistema saudável.

**“E se mudar a marca ?”** → ** Tokens temáticos ** trocam cores, tipografia e espaçamentos sem refatorar telas.

**“Como medimos ROI ?”** → Horas poupadas × taxa / hora − custo de manutenção.Acompanhado mensalmente por squad.

---

## Chamado à ação

1) ** Escolher produto piloto ** e metas(ex.: −30 % lead time de tela).  
2) ** Aprovar dedicação ** do time DS(2 devs + 1 designer).  
3) ** Agendar checkpoint ** em 6 semanas com métricas e next steps.

---

### Observações importantes
    - Números aqui são ** exemplos pedagógicos ** para tangibilizar valor.Ajuste o bloco ** CFG ** acima com seus dados reais.
- Este documento está em ** Storybook / Docs ** para que Produto veja ** exemplos executáveis **, não apenas teoria.

< br />

> 💡 ** Dica **: acrescente imagens / gifs curtos mostrando montagem de tela com componentes do DS(antes × depois).Isso reforça a narrativa de ** pit stop ** e o ganho de velocidade.

---

## Diagramas & visuais(HTML / CSS / SVG)
    > Todos renderizados com HTML, CSS inline e SVG — funcionam no Storybook sem libs extras e não exigem bibliotecas adicionais.

{/* ▼▼▼ Componentes visuais lúdicos ▼▼▼ */ }

function Arrow() {
    return (
        <svg width= "36" height = "24" viewBox = "0 0 36 24" style = {{ opacity: 0.6 }
}>
    <defs>
    <marker id="arrow" markerWidth = "10" markerHeight = "10" refX = "10" refY = "3" orient = "auto" markerUnits = "strokeWidth" >
        <path d="M0,0 L0,6 L9,3 z" />
            </marker>
            </defs>
            < line x1 = "0" y1 = "12" x2 = "34" y2 = "12" strokeWidth = "2" stroke = "currentColor" markerEnd = "url(#arrow)" />
                </svg>
  )
}

function Chip({ children }) {
    return (
        <div style= {{ padding: '8px 12px', border: '1px solid rgba(0,0,0,0.1)', borderRadius: 999, fontSize: 12, background: 'linear-gradient(180deg, #fff, #f6f6f6)' }
}> { children } </div>
  )
}

function MetricBar({ label, hours, max }) {
    const pct = Math.max(3, Math.round((hours / max) * 100));
    return (
        <div style= {{ marginBottom: 10 }
}>
    <div style={ { display: 'flex', justifyContent: 'space-between', fontSize: 12, opacity: 0.75 } }>
        <span>{ label } </span>
        < span > { hours }h </span>
            </div>
            < div style = {{ height: 12, background: '#eee', borderRadius: 999 }}>
                <div style={ { height: '100%', width: `${pct}%`, borderRadius: 999, boxShadow: 'inset 0 -6px 12px rgba(0,0,0,0.12)' } } />
                    </div>
                    </div>
  )
}

function BeforeAfterBars() {
    const max = Math.max(CFG.hoursBefore, CFG.hoursAfter);
    return (
        <div style= {{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, alignItems: 'end', margin: '24px 0' }
}>
    <div>
    <div style={ { fontWeight: 700, marginBottom: 8 } }> Antes(Sem DS) </div>
        < MetricBar label = "Esforço total" hours = { CFG.hoursBefore } max = { max } />
            </div>
            < div >
            <div style={ { fontWeight: 700, marginBottom: 8 } }> Depois(Com DS) </div>
                < MetricBar label = "Esforço total" hours = { CFG.hoursAfter } max = { max } />
                    </div>
                    </div>
  )
}

function Step({ title, subtitle }) {
    return (
        <div style= {{
        padding: 16,
            border: '1px solid rgba(0,0,0,0.1)',
                borderRadius: 16,
                    minWidth: 160,
                        background: 'linear-gradient(180deg,#fff,#f7f7f7)',
                            boxShadow: '0 10px 24px rgba(0,0,0,0.08)'
    }
}>
    <div style={ { fontSize: 14, opacity: 0.7 } }> { subtitle } </div>
        < div style = {{ fontSize: 18, fontWeight: 700 }}> { title } </div>
            </div>
  )
}

function AssemblyLineDiagram() {
    return (
        <div style= {{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', margin: '8px 0 24px' }
}>
    <Step title="Tokens" subtitle = "base" />
        <Arrow />
        < Step title = "Componentes" subtitle = "reuso" />
            <Arrow />
            < Step title = "Padrões" subtitle = "guia" />
                <Arrow />
                < Step title = "Telas" subtitle = "montagem" />
                    <Arrow />
                    < Step title = "Release" subtitle = "valor" />
                        </div>
  )
}

function AdoptionCurve() {
    const W = 640, H = 240, P = 36;
    const k = 1.2, x0 = 6; // inclinação e ponto médio (~6 meses)
    function logistic(x) { return 1 / (1 + Math.exp(-k * (x - x0))); }
    const points = Array.from({ length: 121 }, (_, i) => {
        const m = i / 10; // 0..12 meses
        const y = logistic(m);
        const xPx = P + (m / 12) * (W - 2 * P);
        const yPx = H - P - y * (H - 2 * P);
        return [xPx, yPx];
    });
    const d = points.map((p, i) => (i === 0 ? `M ${p[0]} ${p[1]}` : `L ${p[0]} ${p[1]}`)).join(' ');
    const m3x = P + (3 / 12) * (W - 2 * P);
    const m6x = P + (6 / 12) * (W - 2 * P);
    const y3 = H - P - (CFG.adoption3m) * (H - 2 * P);
    const y6 = H - P - (CFG.adoption6m) * (H - 2 * P);
    return (
        <div style= {{ margin: '8px 0 24px' }
}>
    <div style={ { display: 'flex', gap: 8, marginBottom: 8 } }>
        <Chip>Curva S de adoção </Chip>
            < Chip > 3m: { Math.round(CFG.adoption3m * 100) }% </Chip>
                < Chip > 6m: { Math.round(CFG.adoption6m * 100) }% </Chip>
                    </div>
                    < svg width = { W } height = { H } style = {{ maxWidth: '100%', height: 'auto', display: 'block', border: '1px solid #eee', borderRadius: 12 }}>
                        <rect x={ 0 } y = { 0} width = { W } height = { H } fill = "#fff" />
                            {/* Eixos */ }
                            < line x1 = { P } y1 = { H- P} x2 = { W- P} y2 = { H- P} stroke = "#888" strokeWidth = { 1} />
                                <line x1={ P } y1 = { H- P} x2 = { P } y2 = { P } stroke = "#888" strokeWidth = { 1} />
                                    {/* Grade leve */ }
{
    Array.from({ length: 4 }, (_, i) => {
        const y = P + i * ((H - 2 * P) / 3);
        return <line key={ i } x1 = { P } y1 = { y } x2 = { W- P
    } y2 = { y } stroke = "#eee" />
        })}
{/* Curva */ }
<path d={ d } fill = "none" stroke = "currentColor" strokeWidth = { 2} />
    {/* Marcadores 3m e 6m */ }
    < circle cx = { m3x } cy = { y3 } r = { 4} />
        <circle cx={ m6x } cy = { y6 } r = { 4} />
            <text x={ m3x + 6 } y = { y3- 6} fontSize = { 12} > 3m </text>
                < text x = { m6x+ 6} y = { y6- 6} fontSize = { 12} > 6m </text>
{/* Rótulos */ }
<text x={ W - P - 10 } y = { H- P - 6} fontSize = { 12} textAnchor = "end" > Meses </text>
    < text x = { P+ 4} y = { P+ 12} fontSize = { 12} > Adoção </text>
        </svg>
        </div>
  )
}

function RoadmapTimeline() {
    const months = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
    const row = (label, start, end) => {
        const total = 12;
        const startPct = ((start - 1) / total) * 100;
        const widthPct = ((end - start + 1) / total) * 100;
        return (
            <div style= {{ display: 'flex', alignItems: 'center', gap: 12, margin: '6px 0' }
    }>
        <div style={ { width: 140, fontSize: 12 } }> { label } </div>
            < div style = {{ flex: 1, height: 16, background: '#f1f1f1', borderRadius: 999, position: 'relative' }
}>
    <div style={ { position: 'absolute', left: `${startPct}%`, width: `${widthPct}%`, height: '100%', borderRadius: 999, boxShadow: 'inset 0 -6px 12px rgba(0,0,0,0.12)' } } />
        </div>
        </div>
    )
  }
return (
    <div style= {{ marginTop: 8 }}>
        <div style={ { display: 'flex', gap: 8, marginBottom: 6 } }>
            { months.map(m => <div key={ m } style = {{ width: (100 / 12) + '%', textAlign: 'center', fontSize: 11, opacity: 0.7 }} > { m } </div>)}
</div>
{ row('Piloto', 1, 2) }
{ row('Fase 2', 3, 4) }
{ row('Fase 3', 5, 7) }
{ row('Fase 4', 8, 12) }
</div>
  )
}

{/* ▼▼▼ Renderização dos visuais ▼▼▼ */ }

<BeforeAfterBars />
    < AssemblyLineDiagram />
    <AdoptionCurve />
    < RoadmapTimeline />

