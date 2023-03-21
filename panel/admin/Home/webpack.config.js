const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const deps = require("./package.json").dependencies;
module.exports = {
  mode: "development",
  devServer: {
    port: 3100,
    historyApiFallback: true,
  },
  module: {
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
        test: /\.js$/,
        enforce: "pre",
        use: ["source-map-loader"],
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
        test: /\.(png|jpe?g|gif|ttf|ogg|mp3)$/i,
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
    new ModuleFederationPlugin({
      name: "Home",
      filename: "remoteEntry.js",

      //   Connect to other project to main project
      remotes: {
        Login: `Login@http://localhost:${3101}/remoteEntry.js`,
        Dashboard: `Dashboard@http://localhost:${3102}/remoteEntry.js`,
        Notice: `Notice@http://localhost:${3103}/remoteEntry.js`,
        Ads: `Ads@http://localhost:${3105}/remoteEntry.js`,
        Mail: `Mail@http://localhost:${3106}/remoteEntry.js`,
        Chat: `Chat@http://localhost:${3107}/remoteEntry.js`,
        Report: `Report@http://localhost:${3108}/remoteEntry.js`,
        Recycle: `Recycle@http://localhost:${3114}/remoteEntry.js`,
        Management: `Management@http://localhost:${3109}/remoteEntry.js`,
        Notes: `Notes@http://localhost:${3110}/remoteEntry.js`,
        Restrictions: `Restrictions@http://localhost:${3111}/remoteEntry.js`,
        AddRate: `AddRate@http://localhost:${3112}/remoteEntry.js`,
        Campaigns: `Campaigns@http://localhost:${3113}/remoteEntry.js`,
      },

      //   Other Project to main project
      exposes: {
        "./Home": "./src/pages/Home/index.js",
      },

      shared: {
        ...deps,
        react: {
          singleton: true,
          requiredVersion: deps.react,
        },
        "react-dom": {
          singleton: true,
          requiredVersion: deps["react-dom"],
        },
      },
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
};
