const path = require("path");

const main = {
  mode: "development",
  target: "electron-main",
  entry: path.join(__dirname, "./src/main/index.ts"),
  output: {
    filename: "index.js",
    path: path.resolve(__dirname, "dist")
  },
  node: {
    __dirname: false,
    __filename: false
  },
  module: {
    rules: [
      {
        test: /.ts$/,
        loader: "ts-loader",
      }
    ]
  },
  resolve: {
    extensions: [".js", ".ts"]
  },
  devtool: "inline-source-map"
};

const renderer = {
  mode: "development",
  target: "electron-renderer",
  entry: path.join(__dirname, "./src/renderer/index.ts"),
  output: {
    filename: "index.js",
    path: path.resolve(__dirname, "dist", "scripts")
  },
  resolve: {
    extensions: [".json", ".js", ".jsx", ".css", ".scss", ".ts", ".tsx"]
  },
  module: {
    rules: [
      {
        test: /\.css/,
        use: [
            "style-loader",
            {
                loader: "css-loader",
                options: {
                    url:false,
                    sourceMap:true
                }
            }
        ]
      },
      {
          test: /\.scss/,
          use: [
              "style-loader",
              {
                  loader: "css-loader",
                  options: {
                      url:false,
                      sourceMap: true,
                      importLoaders: 2
                  }
              }, 
              {
                  loader: "sass-loader",
                  options: {
                      sourceMap: true
                  }
              }
          ]
      },
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        include: [
          path.resolve(__dirname, "src"),
          path.resolve(__dirname, "node_modules"),
        ]
      }
    ]
  },
  devtool: "inline-source-map"
};

module.exports = [
  main, renderer
];