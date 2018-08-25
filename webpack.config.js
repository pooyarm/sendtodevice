const path = require('path');

const HtmlWebPackPlugin = require("html-webpack-plugin");

module.exports = (env, args) => {
    process.env.NODE_ENV = args.mode;

    var htmlPoint = 'index.html';
    if (process.env.NODE_ENV == 'production') htmlPoint = path.resolve('./public/',htmlPoint);
    const htmlPlugin = new HtmlWebPackPlugin({
        template: "./src/index.html",
        filename: htmlPoint
    });
    
    return {
        entry: "./src/index.js",
        output: {
            path: path.resolve('./public/builds'),
            filename: 'bundled.[chunkhash].js'
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: "babel-loader"
                    }
                },
                {
                    test: /\.css$/,
                    use: ["style-loader", "css-loader"]
                }
            ]
        },
        plugins: [
            htmlPlugin
        ],
        devServer: {
            contentBase: path.join(__dirname, 'public'),
            compress: true,
            //host: '192.168.1.6',
            port: 80
        }
    }
}