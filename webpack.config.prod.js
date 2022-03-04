const path = require("path");

var main = {
  mode: "production",
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
        test: /.tsx?$/,
        include: [
          path.resolve(__dirname, "src"),
        ],
        exclude: [
          path.resolve(__dirname, "node_modules"),
        ],
        loader: "ts-loader",
      }
    ]
  },
  resolve: {
    extensions: [".js", ".ts"]
  },
};

var renderer = {
  mode: "production",
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
        test: /\.tsx?$/,
        use: "ts-loader",
        include: [
          path.resolve(__dirname, "src"),
          path.resolve(__dirname, "node_modules"),
        ]
      },
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
    ]
  },
};

module.exports = [
  main, renderer
];