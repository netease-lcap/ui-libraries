"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs-extra");
var path = require("path");
var ts2usage_1 = require("./common/ts2usage");
var root = path.join(__dirname, "../../vant");
var data = (0, ts2usage_1.default)(root);
fs.writeFileSync(path.join(__dirname, "../h5.nasl.ui.json"), JSON.stringify(data, null, 2));
