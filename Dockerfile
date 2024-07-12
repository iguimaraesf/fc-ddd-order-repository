FROM node:22
WORKDIR /app

# Inicialização
RUN npm install typescript --save-dev


#CMD ["tail", "-f", "/dev/null"]