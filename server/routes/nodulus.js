var config = require("@nodulus/config").config;
var consts = require("@nodulus/config").consts;
var dal = require("@nodulus/data");
var users = require("@nodulus/users");
var express = require("@nodulus/core");
var router = express.Router();
var util = require('util');
var fs = require("fs-extra");
var path = require('path');
var appRoot = global.appRoot;
router.post("/setup", function (req, res) {
    var setupConfig = req.body;
    var configurationObject = config;
    configurationObject["database"] = setupConfig["database"];
    if (configurationObject["database"].diskdb)
        fs.ensureDirSync(configurationObject["database"].diskdb.host);
    config.persistConfiguration();
    var userObj = {
        Email: setupConfig.Email,
        Password: setupConfig.Password
    };
    users.register(userObj, function () {
        var setupConfigPath = path.join(global.clientAppRoot, "nodulus.json");
        fs.writeFileSync(setupConfigPath, JSON.stringify({ active: new Date() }), 'utf8');
        res.status(200).json(setupConfig);
    });
});
module.exports = router;
