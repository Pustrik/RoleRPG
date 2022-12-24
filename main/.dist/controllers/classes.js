"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.classes = void 0;
function classes(req, res) {
    res.status(200).json({
        classes: {
            thief: true,
            warrior: true,
            mage: true
        }
    });
}
exports.classes = classes;
//# sourceMappingURL=classes.js.map