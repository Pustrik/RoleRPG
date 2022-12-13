"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.classes_router = void 0;
const classes_callbacks_1 = require("../router_callbacks/classes_callbacks");
const express = require('express');
const classes_router = express.Router();
exports.classes_router = classes_router;
classes_router.get('/classes', classes_callbacks_1.classes);
//# sourceMappingURL=classes.js.map