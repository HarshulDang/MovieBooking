const path = require("path");

const DIST_DIR = path.resolve(__dirname, "dist");
const SRC_DIR = path.resolve(__dirname, "src");

const config = {
    entry: SRC_DIR + "/app/App.jsx",
    output: {
        path: DIST_DIR + "/app",
        filename: "bundle.js",
        publicPath: "app/"
    },
    module: {
        loaders: [
            {
                test: /\.js?/,
                include: SRC_DIR,
                loader: "babel-loader",
                query: {
                    presets: ["react", "es2015", "stage-2"]
                }
            }
        ]
    },
    devServer: {
        // proxy URLs to backend development server
        proxy: {
            "/api": "http://localhost:3000"
        }
    }
};

module.exports = config;
