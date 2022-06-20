#nginx服务器
FROM nginx
LABEL name="cha-vue"
LABEL version="1.0.0"
#将打包后的文件夹放在nginx静态资源文件夹目录下
COPY  ./dist/ /usr/share/nginx/html/cha
#将前端nginx配置文件放在nginx子配置文件夹目录下
COPY ./nginx/cha-vue.conf /etc/nginx/conf.d/
#前端项目端口号设置为80
EXPOSE 80