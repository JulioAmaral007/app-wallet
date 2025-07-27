# App Wallet

Um aplicativo de controle financeiro pessoal desenvolvido com React Native e Expo.

## Funcionalidades

- ✅ Criar transações (receitas e despesas)
- ✅ Visualizar saldo, receitas e despesas
- ✅ Categorizar transações
- ✅ Excluir transações
- ✅ Dados fictícios para demonstração

## Dados Fictícios

O aplicativo inclui dados fictícios para demonstração. Os dados são inseridos automaticamente quando o banco de dados está vazio.

### Dados Incluídos:

**Receitas (R$ 5.950,00):**
- Salário: R$ 3.500,00
- Freelance Design: R$ 800,00
- Bônus Trimestral: R$ 1.200,00
- Venda de Produtos: R$ 450,00

**Despesas (R$ 2.629,20):**
- Aluguel: R$ 1.200,00
- Supermercado: R$ 350,00
- Uber: R$ 45,00
- Netflix: R$ 39,90
- Academia: R$ 89,90
- Restaurante: R$ 120,00
- Combustível: R$ 180,00
- Shopping - Roupas: R$ 250,00
- Conta de Luz: R$ 150,00
- Cinema: R$ 60,00
- Farmácia: R$ 85,50
- Delivery Pizza: R$ 75,00
- Estacionamento: R$ 25,00
- Conta de Água: R$ 80,00
- Livros: R$ 120,00
- Spotify: R$ 19,90

**Saldo Final: R$ 3.320,80**

### Como Inserir Dados Fictícios Manualmente:

1. Abra o aplicativo
2. Clique no botão verde com ícone de banco de dados (📊) no header
3. Os dados serão inseridos e a tela será atualizada automaticamente

## Tecnologias Utilizadas

- React Native
- Expo Router
- SQLite (expo-sqlite)
- TypeScript
- Lucide React Native (ícones)

## Estrutura do Projeto

```
app-wallet/
├── app/                    # Telas do aplicativo
│   ├── index.tsx          # Tela principal
│   └── (modals)/          # Modais
│       └── createModal.tsx # Modal de criação
├── components/             # Componentes reutilizáveis
├── database/              # Configuração do banco
│   ├── databaseInit.ts    # Inicialização
│   └── seedData.ts        # Dados fictícios
├── hooks/                 # Hooks customizados
└── constants/             # Constantes
```

## Como Executar

1. Instale as dependências:
```bash
pnpm install
```

2. Execute o projeto:
```bash
pnpm start
```

3. Use o Expo Go no seu dispositivo ou emulador para testar o aplicativo.

## Funcionalidades Principais

### useFocusEffect
- Recarrega dados automaticamente quando a tela recebe foco
- Útil para atualizar informações após criar/editar transações

### useCallback
- Memoriza funções para melhor performance
- Evita re-renderizações desnecessárias

### Banco de Dados SQLite
- Armazena transações localmente
- Suporte a categorização
- Cálculo automático de saldo 