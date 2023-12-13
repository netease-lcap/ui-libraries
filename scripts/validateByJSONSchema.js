const fs = require('fs-extra');

const Ajv = require("ajv")
const ajv = new Ajv();

const validate = ajv.compile(fs.readJSONSync('./node_modules/@nasl/types/nasl.ui.ast.schema.json'));
const valid = validate(fs.readJSONSync(process.argv[2]))
if (!valid) console.log(validate.errors);
