# n8n-nodes-greenn

Node customizado do n8n para integração com a API da Greenn.

## Funcionalidades

- **Criar Produtos**: Cria novos produtos na plataforma Greenn através da API.

## Credenciais

O node requer uma credencial do tipo `greennApi` com os seguintes campos:

- **Token**: Token de autenticação do usuário (Bearer token)

A credencial é validada automaticamente ao ser configurada através do endpoint `/api/identity-validation/status`.

## Instalação

1. Copie este diretório para a pasta `custom` do seu n8n
2. Execute `npm install` na raiz do projeto
3. Execute `npm run build` para compilar o TypeScript
4. Reinicie o n8n

## Uso

### Criar Produto

1. Adicione o node "Greenn" ao seu workflow
2. Configure as credenciais da API Greenn
3. Selecione a operação "Create Product"
4. Preencha os campos obrigatórios:
   - **Product Name**: Nome do produto
5. Opcionalmente, preencha:
   - **Product Description**: Descrição do produto
   - **Price**: Preço do produto
   - **SKU**: Código SKU do produto
   - **Category**: Categoria do produto
   - **Stock**: Quantidade em estoque

## Desenvolvimento

```bash
# Instalar dependências
npm install

# Compilar TypeScript
npm run build

# Modo desenvolvimento (watch)
npm run dev

# Lint
npm run lint
```

## Estrutura do Projeto

```
.
├── nodes/
│   └── Greenn/
│       ├── Greenn.node.ts      # Definição do node
│       └── GenericFunctions.ts  # Funções auxiliares para requisições HTTP
├── credentials/
│   └── GreennApi.credentials.ts # Definição das credenciais
├── package.json
├── tsconfig.json
└── README.md
```

