# 🤝 Guia de Contribuição

Obrigado por considerar contribuir para o **Achados e Perdidos UFC**! Este documento fornece diretrizes e instruções para contribuir com o projeto.

## 📋 Código de Conduta

Todos os contribuidores devem seguir nosso código de conduta:
- Ser respeitoso com outros contribuidores
- Fornecer feedback construtivo
- Focar no que é melhor para a comunidade
- Reportar comportamento inaceitável para os mantenedores

## 🐛 Reportar Bugs

Antes de criar um relatório de bug, pesquise as [issues existentes](https://github.com/matheuspeixoto-code/Achados-Perdidos/issues) para evitar duplicatas.

### Como reportar um bug

1. **Use um título claro e descritivo**
   - Exemplo: "Login falhando com erro 401" (não: "Erro de autenticação")

2. **Descreva os passos exatos para reproduzir o problema**
   - Forneça exemplos específicos
   - Inclua screenshots ou logs se aplicável

3. **Descreva o comportamento observado**
   - O que aconteceu?
   - Qual é exatamente o problema?

4. **Descreva o comportamento esperado**
   - O que deveria acontecer?

5. **Inclua seu ambiente**
   - SO
   - Navegador e versão
   - Node.js versão
   - PostgreSQL versão

## 💡 Sugerir Melhorias

Antes de criar uma sugestão de melhoria, pesquise as [issues existentes](https://github.com/matheuspeixoto-code/Achados-Perdidos/issues).

### Como sugerir uma melhoria

1. **Use um título claro e descritivo**
   - Exemplo: "Adicionar filtro por categoria na página inicial"

2. **Forneça uma descrição detalhada**
   - Descreva o comportamento atual
   - Explique o comportamento esperado
   - Explique por que essa melhoria seria útil

3. **Inclua exemplos**
   - Screenshots, mockups ou código de exemplo

## 🔧 Desenvolvendo

### Setup do Ambiente

1. Faça um fork e clone o repositório
```bash
git clone https://github.com/seu-usuario/Achados-Perdidos.git
cd Achados-Perdidos
```

2. Crie uma branch para sua feature
```bash
git checkout -b feature/sua-feature-aqui
```

3. Instale as dependências
```bash
cd back
npm install
cd ../front
# Frontend não requer instalação
```

4. Configure o `.env`
```bash
cp back/.env.example back/.env
# Edite com suas configurações
```

5. Inicie o desenvolvimento
```bash
# Terminal 1 - Backend
cd back
npm run dev

# Terminal 2 - Frontend (abra front/index.html no navegador)
```

### Padrões de Código

#### TypeScript (Backend)
- Use tipos explícitos
- Evite `any` quando possível
- Use interfaces para estruturas de dados
- Nomeie classes com PascalCase
- Nomeie variáveis com camelCase
- Adicione comentários para lógica complexa

**Exemplo:**
```typescript
interface IUsuario {
  id: string;
  email: string;
  nome: string;
}

class UsuarioRepository {
  async findByEmail(email: string): Promise<IUsuario | null> {
    // implementação
  }
}
```

#### JavaScript (Frontend)
- Use camelCase para variáveis e funções
- Use UPPER_CASE para constantes
- Prefira `const` sobre `let`
- Use funções assíncronas para promises
- Adicione comentários para lógica não óbvia

**Exemplo:**
```javascript
const API_URL = "https://api.example.com";

async function carregarDados() {
  try {
    const response = await fetch(`${API_URL}/dados`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erro ao carregar dados:", error);
  }
}
```

#### CSS
- Use nomes de classes descritivos
- Use variáveis CSS para cores e tamanhos
- Organize em seções comentadas
- Mobile-first design

**Exemplo:**
```css
:root {
  --primary-color: #1E273D;
  --secondary-color: #C00;
}

/* === HEADER === */
.header {
  background-color: var(--primary-color);
  /* ... */
}
```

### Commits

Use mensagens de commit descritivas e em inglês:

```bash
git commit -m "feat: Adicionar filtro por categoria"
git commit -m "fix: Corrigir erro de autenticação"
git commit -m "docs: Atualizar README"
git commit -m "style: Formatar código"
git commit -m "refactor: Reorganizar estrutura de pastas"
git commit -m "test: Adicionar testes de autenticação"
```

### Tipos de Commits

- **feat**: Nova funcionalidade
- **fix**: Correção de bug
- **docs**: Mudanças na documentação
- **style**: Formatação de código (sem mudar lógica)
- **refactor**: Refatoração de código
- **test**: Adição/atualização de testes
- **chore**: Mudanças em dependências ou configuração

## 📤 Pull Request

1. **Fork o repositório**
2. **Crie uma branch com sua feature**
   ```bash
   git checkout -b feature/minha-feature
   ```

3. **Faça commits com mensagens claras**
   ```bash
   git commit -m "feat: Descrever sua feature"
   ```

4. **Push para sua fork**
   ```bash
   git push origin feature/minha-feature
   ```

5. **Abra um Pull Request**
   - Descreva claramente o que foi alterado
   - Referencie qualquer issue relacionada (#123)
   - Inclua screenshots se for mudança visual

### Checklist para PR

- [ ] Meu código segue o estilo de código do projeto
- [ ] Atualizei a documentação
- [ ] Adicionei testes para novas features
- [ ] Todos os testes passam
- [ ] Não há console.log ou código de debug
- [ ] Minhas mudanças não quebram features existentes

## 🧪 Testando

### Backend

```bash
cd back
npm test
```

### Frontend

Testes manuais usando o navegador:
1. Abra a ferramenta de desenvolvedor (F12)
2. Verifique o console para erros
3. Teste todos os fluxos de usuário

## 📚 Estrutura de Pastas - Adicionando Novos Módulos

Se adicionar um novo módulo, siga esta estrutura:

```
back/src/modules/novo-modulo/
├── dtos/
│   ├── ICreateNovoModuloDTO.ts
│   └── IUpdateNovoModuloDTO.ts
├── enum/
│   └── NovoModuloStatus.ts
├── implementations/
│   └── INovoModuloRepository.ts
├── infra/
│   └── typeorm/
│       ├── entities/
│       │   └── NovoModulo.ts
│       ├── repository/
│       │   └── NovoModuloRepository.ts
│       └── migrations/
│           └── 1234567890000-CreateNovoModulo.ts
└── useCases/
    ├── create/
    │   ├── CreateNovoModuloController.ts
    │   └── CreateNovoModuloUseCase.ts
    └── list/
        ├── ListNovoModuloController.ts
        └── ListNovoModuloUseCase.ts
```

## 🎨 Adicionando Novas Páginas Frontend

1. **Crie o arquivo HTML**
   ```bash
   front/nova-pagina.html
   ```

2. **Crie o arquivo JavaScript correspondente**
   ```bash
   front/nova-pagina.js
   ```

3. **Adicione link no menu (main.html)**
4. **Inclua CSS em `front/css/` se necessário**
5. **Siga o padrão de autenticação**

## 🐛 Debugging

### Backend
```bash
# Ativar logs detalhados
NODE_DEBUG=* npm run dev

# Usar debugger do Node
node --inspect-brk dist/shared/infra/http/server.js
```

### Frontend
- Abra DevTools (F12)
- Verifique Console para erros
- Use `console.log()` para debug
- Inspeccione LocalStorage para dados persistidos

## 📖 Documentação

Ao adicionar novas features:

1. **Atualize o README.md**
2. **Documente novos endpoints em Swagger (se aplicável)**
3. **Adicione comentários em código complexo**
4. **Atualize CONTRIBUTING.md se necessário**

## 🎓 Recursos Úteis

- [Express.js Guide](https://expressjs.com/en/guide/routing.html)
- [TypeORM Docs](https://typeorm.io/)
- [PostgreSQL Tutorial](https://www.postgresqltutorial.com/)
- [JWT Best Practices](https://tools.ietf.org/html/rfc8949)
- [REST API Best Practices](https://restfulapi.net/)

## ❓ Dúvidas?

Abra uma [discussão](https://github.com/matheuspeixoto-code/Achados-Perdidos/discussions) no GitHub ou entre em contato com os mantenedores.

---

**Obrigado por contribuir! 💜**
