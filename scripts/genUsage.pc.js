"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs-extra");
var path = require("path");
var ts2usage_1 = require("./common/ts2usage");
var root = path.join(__dirname, "../../cloud-ui");
var data = (0, ts2usage_1.default)(root);
fs.writeFileSync(path.join(__dirname, "../pc.nasl.ui.json"), JSON.stringify(data, null, 2));
