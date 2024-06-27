#FROM node:alpine3.18 as build

#WORKDIR /app

# Kopiere package.json und package-lock.json
#COPY package.json package-lock.json ./
#RUN npm install

# Kopiere den Rest der Dateien und baue die Anwendung
#COPY . .

# Setze die Umgebungsvariablen zur Build-Zeit
#ARG REACT_APP_LOCAL_BASE_URL
#ENV REACT_APP_LOCAL_BASE_URL=$REACT_APP_LOCAL_BASE_URL

#RUN npm run build

# Zweite Stufe: Nginx verwenden, um die Anwendung zu servieren
#FROM nginx:1.23-alpine
#COPY --from=build /app/build /usr/share/nginx/html
#EXPOSE 80
#ENTRYPOINT ["nginx", "-g", "daemon off;"]

FROM node:alpine3.18

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .
# Setze die Umgebungsvariablen zur Build-Zeit
#ARG REACT_APP_LOCAL_BASE_URL
#ENV REACT_APP_LOCAL_BASE_URL=http://localhost:4000

RUN npm run build

EXPOSE 80

# Starten der Anwendung mit Serve und Lauschen auf Port 80
CMD ["npx", "serve", "-s", "build", "-l", "80"]