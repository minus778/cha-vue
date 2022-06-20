const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const CompressionPlugin = require('compression-webpack-plugin')

module.exports = {
    //配置跨域代理（如果需要跨域发请求就配置）
    devServer: {
        proxy: {
            //会把请求路径中的/api换为后面的代理服务器
            '/api': {
                //提供数据的服务器地址
                target: 'http://localhost:3000',
                changeOrigin: true,
                pathRewrite: {
                    '^/api': '/api'
                }
            }
        },
    },
    //配置打包文件的根路径
    publicPath: process.env.VUE_APP_PUBLIC_PATH,
    configureWebpack: {
        plugins: [
            new BundleAnalyzerPlugin()
        ],
    },

    chainWebpack: (config) => {
        if (process.env.NODE_ENV === 'production') {
            // 图片压缩处理
            const imgRule = config.module.rule('images')
            imgRule
                .test(/\.(png|jpe?g|gif|webp)(\?.*)?$/)
                .use('image-webpack-loader')
                .loader('image-webpack-loader')
                .options({ bypassOnDebug: true })
                .end()
        }
        // gzip压缩处理
        if (process.env.NODE_ENV === 'production') {
            config.plugin('compression-webpack-plugin')
                .use(new CompressionPlugin({
                    test: /\.js$|\.html$|\.css$/, // 匹配文件名
                    threshold: 10240, // 对超过10k的数据压缩
                    deleteOriginalAssets: false // 不删除源文件
                }))
        }
    },
}