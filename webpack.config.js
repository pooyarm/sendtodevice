const path = require('path');

const HtmlWebPackPlugin = require("html-webpack-plugin");

const htmlPlugin = new HtmlWebPackPlugin({
    template: "./src/index.html",
    filename: "index.html"
});

module.exports = (env, args) => {
    process.env.NODE_ENV = args.mode;
    
    return {
        entry: "./src/index.js",
        output: {
            path: path.resolve('./public'),
            filename: 'bundled.js'
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