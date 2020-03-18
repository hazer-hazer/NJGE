"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("module-alias/register");
const Block2D_1 = require("@blocks/Block2D/Block2D");
const V2_1 = require("@utils/math/V2");
const b = new Block2D_1.default();
b.on('PositionChanged', function (d) {
    console.log(d);
});
b.on('Moved', function (p) {
    console.log(p);
});
b.setPosition(new V2_1.default(1, 5));
b.move(12, 16);
