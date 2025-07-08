# Passo a passo para instalar e executar o projeto

1. Clone o repositório
```bash
git clone https://github.com/Guilhermevalenca/entrevista-tascom.git
```

2. Instruções para executar a api

- Instale as dependências
```bash
  cd entrevista-tascom/api
  npm install
```

- Copie o arquivo .env.example para .env e Preencha as variáveis de ambiente
```bash
  cp .env.example .env
```

- Inicie a api, porta default 3000
```bash
  npm run build
  npm run start:prod
```

- Caso não tenha um sgbd instalado, utilize o docker compose para criar o servidor do sgbd postgres
```bash
    docker compose up -d
```
 - Para a execução da api, utilizando docker
 - Copie o arquivo .env.example para .env e Preencha as variáveis de ambiente
 - Agora crie a imagem e rode o container
```bash
    docker build -t entrevista-tascom-api .
    docker run -p 3000:3000 -d entrevista-tascom-api
```

3. Instruções para executar o app

- Instale as dependências
```bash
  cd entrevista-tascom/app
  npm install
```

- Copie o arquivo .env.example para .env e Preencha as variáveis de ambiente
```bash
  cp .env.example .env
```

- Inicie o app, porta default 4173
```bash
  npm run build
  npm run preview
```

- Para a execução do app, utilizando docker
 - Copie o arquivo .env.example para .env e Preencha as variáveis de ambiente
 - Agora crie a imagem e rode o container
```bash
    docker build -t entrevista-tascom-app .
    docker run -p 4173:4173 -d entrevista-tascom-app
```