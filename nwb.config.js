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
  }
};
