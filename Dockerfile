FROM nginx:1.23.3-alpine

COPY /build /usr/share/nginx/html

RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d

WORKDIR /usr/share/nginx/html

ADD ./config.js config.js

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]