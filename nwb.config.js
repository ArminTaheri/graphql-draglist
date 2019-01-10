const path = require("path");

module.exports = {
  type: "react-component",
  npm: {
    esModules: true,
    umd: {
      global: "CBrainUI",
      externals: {
        react: "React"
      }
    }
  },
  babel: {
    plugins: [
      "flow-react-proptypes",
      ["module-resolver", { alias: { src: path.resolve("src") } }]
    ]
  },
  webpack: {
    rules: {
      "sass-css": {
        modules: true,
        localIdentName: "[path][name]-[local]-[hash:base64:5]"
      }
    }
  }
};
