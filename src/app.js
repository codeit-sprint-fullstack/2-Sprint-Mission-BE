"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const appConfig_1 = require("./appConfig");
const app = (0, appConfig_1.appConfig)();
app.listen(3000, () => {
    console.log("Server Started");
});
