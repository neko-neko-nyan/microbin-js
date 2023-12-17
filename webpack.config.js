const path = require('path');
const version = require('./package.json').version;

module.exports = [
    {
        entry: "./src/index.ts",
        output: {
            path: path.resolve(__dirname, './dist'),
            filename: `microbin.${version}.js`,
            library: {
                name: "microbin",
                type: "umd"
            }
        },
        mode: "development",
        devtool: "source-map",
        resolve: {
            extensions: [".ts"],
        },
        module: {
            rules: [
                {
                    test: /\.ts$/,
                    loader: "ts-loader"
                }
            ]
        }
    },
    {
        entry: "./src/index.ts",
        output: {
            path: path.resolve(__dirname, './dist'),
            filename: `microbin.${version}.min.js`,
            library: {
                name: "microbin",
                type: "umd"
            }
        },
        mode: "production",
        devtool: "source-map",
        resolve: {
            extensions: [".ts"],
        },
        module: {
            rules: [
                {
                    test: /\.ts$/,
                    loader: "ts-loader"
                }
            ]
        }
    },
];
