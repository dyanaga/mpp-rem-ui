FROM nginx:alpine

RUN rm -rf /etc/nginx/conf.d
COPY conf /etc/nginx

WORKDIR /usr/share/nginx/html
COPY build /usr/share/nginx/html
