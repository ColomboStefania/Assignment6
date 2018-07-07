"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const routing_controllers_1 = require("routing-controllers");
const db_1 = require("./db");
const controller_1 = require("./games/controller");
const port = process.env.PORT || 4001;
const app = routing_controllers_1.createKoaServer({
    cors: true,
    controllers: [
        controller_1.default,
    ],
});
db_1.default()
    .then(_ => app.listen(port, () => console.log('Listening on port 4001')))
    .catch(err => console.error(err));
//# sourceMappingURL=index.js.map