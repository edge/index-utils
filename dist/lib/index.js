"use strict";
// Copyright (C) 2021 Edge Network Technologies Limited
// Use of this source code is governed by a GNU GPL-style license
// that can be found in the LICENSE.md file. All rights reserved.
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
exports.__esModule = true;
exports.wallet = exports.tx = exports.token = exports.stake = exports.session = exports.gasRate = exports.exchangeRate = exports.burn = exports.block = void 0;
exports.block = __importStar(require("./block"));
exports.burn = __importStar(require("./burn"));
exports.exchangeRate = __importStar(require("./exchangeRate"));
exports.gasRate = __importStar(require("./gasRate"));
exports.session = __importStar(require("./session"));
exports.stake = __importStar(require("./stake"));
exports.token = __importStar(require("./token"));
exports.tx = __importStar(require("./tx"));
exports.wallet = __importStar(require("./wallet"));
