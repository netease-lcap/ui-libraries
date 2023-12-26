const path = require("path");

module.exports = [
  {
    entry: "./scripts/genUsage.pc.js",
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "pc.js",
      // module: true,
    },
    mode: "development",
    target: "node",
  },
  {
    entry: "./scripts/genUsage.h5.js",
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "h5.js",
      // module: true,
    },
    mode: "development",
    target: "node",
    devtool: false,
  },
];