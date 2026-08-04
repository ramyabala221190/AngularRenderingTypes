
FROM node:alpine as builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm cache clean --force
RUN npm i
COPY . .

RUN npm run build


FROM node:alpine as runner

WORKDIR /app

COPY --from=builder /app/dist/ /app/dist/

EXPOSE 4000
ENV PORT=4000
ENV NODE_ENV=production

CMD ["node", "dist/angular-rendering-types/server/server.mjs"] 
