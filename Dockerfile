#nginx服务器
FROM nginx
# FROM node:16
LABEL name="cha-vue"
LABEL version="1.0.0"
# RUN npm install -g cnpm --registry=https://registry.npm.taobao.org
# RUN cnpm install
# RUN npm run build
#将打包后的文件夹放在nginx静态资源文件夹目录下
COPY  ./dist/ /usr/share/nginx/html/cha
#将前端nginx配置文件放在nginx子配置文件夹目录下
COPY ./nginx/cha-vue.conf /etc/nginx/conf.d/
COPY ./nginx/gzip.conf /etc/nginx/conf.d/
# #重启nginx
# RUN nginx -s reload
# 前端项目端口号设置为80
EXPOSE 80
