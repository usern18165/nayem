const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const { SourceMapDevToolPlugin } = require("webpack");
module.exports = {
  mode: "development",
  devServer: {
    port: 3012,
  },
  module: {
    exprContextCritical: false,
    rules: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          presets: ["@babel/preset-env", "@babel/preset-react"],
        },
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "style-loader",
          },
          {
            loader: "css-loader",
            options: {
              sourceMap: true,
              importLoaders: 2,
            },
          },
          {
            loader: "resolve-url-loader",
          },
          {
            loader: "postcss-loader",
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.(png|jpe?g|gif|ogg|mp3)$/i,
        use: [
          {
            loader: "file-loader",
          },
        ],
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "style-loader",
          },
          {
            loader: "css-loader",
            options: {
              sourceMap: true,
              importLoaders: 3,
            },
          },
          {
            loader: "resolve-url-loader",
          },
          {
            loader: "postcss-loader",
            options: {
              sourceMap: true,
            },
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.(sass|less|css)$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
    ],
  },
  plugins: [
    new SourceMapDevToolPlugin({
      filename: "[file].map",
    }),
    new ModuleFederationPlugin({
      name: "Profile",
      filename: "remoteEntry.js",

      //   Connect to other project to main project
      remotes: {
        login: `login@http://localhost:3010/remoteEntry.js`,
      },

      // //   Other Project to main project
      //   exposes: {
      //     "./Button": "./src/Button",
      //   },
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
};
