const VueLoaderPlugin=require('vue-loader/lib/plugin');
const path = require("path");

 module.exports={
    mode : 'development',//개발자 모드
    devtool: 'eval',
    resolve: {
        extensions: ['.js','.vue',],
    },
    entry: {
        app: './main.js',
    },
    module: {
        rules: [{
            test: /\.vue$/,
            loader: 'vue-loader', //vue파일을 발견할때마다 vue-loader가 내부적으로 js파일로 변환해 준다
        },{
            test:/\.css$/,
            use:[
                'style-loader',
                'css-loader',
            ]
        }],
    },
    plugins: [
        new VueLoaderPlugin(),
    ],
    output: {
        filename: 'app.js',
        path: path.join(__dirname,'dist'),
        publicPath:'/dist',
    },
 };