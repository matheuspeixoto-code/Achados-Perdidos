FROM node:18

WORKDIR /usr/app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

EXPOSE 3333

# Garantir que o dotenv carregue as variáveis de ambiente
ENV NODE_ENV=production

CMD ["npm","start"]