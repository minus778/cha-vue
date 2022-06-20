#nginx服务器
FROM nginx
FROM node
LABEL name="cha-vue"
LABEL version="1.0.0"
#将项目所有文件放到/app文件夹下
COPY . /app
WORKDIR /app
#安装项目依赖
RUN npm install
#打包项目
RUN npm run build
#将打包后的文件夹放在nginx静态资源文件夹目录下
COPY  ./dist/ /usr/share/nginx/html/cha
#将前端nginx配置文件放在nginx子配置文件夹目录下
COPY ./nginx/cha-vue.conf /etc/nginx/conf.d/
#前端项目端口号设置为80
EXPOSE 80
