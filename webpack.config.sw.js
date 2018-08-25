'use strict';

const path = require('path');

module.exports = (env, args) => {
    process.env.NODE_ENV = args.mode;
    
    return {
        mode: 'development',
        entry: './src/sw/notification.js',
        output: {
            path: path.resolve(__dirname, "./public"),
            filename: 'firebase-messaging-sw.js',
        },
        resolve: {
            modules: [
                "node_modules",
                path.resolve(__dirname)
            ],
            extensions: [".js", ".json"],
        },
        context: __dirname,
        watch: true
    };
}