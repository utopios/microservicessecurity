FROM debian

RUN apt-get upgrade -y && apt-get update -y 
RUN apt-get install nodejs npm -y

RUN addgroup nodegroup 
RUN adduser nodeuser --ingroup nodegroup


WORKDIR /app

COPY . . 

RUN npm install

EXPOSE 4001

EXPOSE 4002

USER nodeuser
CMD ["node", "index.js"]