FROM debian

RUN apt-get upgrade && apt-get update -y
RUN apt-get install nodejs npm -y
RUN addgroup nodegroup 
RUN adduser nodeuser --ingroup nodegroup
WORKDIR /app

COPY . .
RUN npm install
EXPOSE 3000
USER nodeuser
CMD [ "npm", "start" ]
