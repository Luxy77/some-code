"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyJwt = exports.signJwt = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("config"));
const private_key = config_1.default.get("private_key");
function signJwt(object, options) {
    const signingKey = Buffer.from(config_1.default.get("private_key"), "base64").toString("ascii");
    return jsonwebtoken_1.default.sign(object, signingKey, Object.assign(Object.assign({}, (options && options)), { algorithm: "RS256" }));
}
exports.signJwt = signJwt;
function verifyJwt(token) {
    const public_key = Buffer.from(config_1.default.get("publik_key"), "base64").toString("ascii");
    try {
        const decoded = jsonwebtoken_1.default.verify(token, public_key);
        return {
            valid: true,
            expired: false,
            decoded,
        };
    }
    catch (e) {
        console.error(e);
        return {
            valid: false,
            expired: e.message === "jwt expired",
            decoded: null,
        };
    }
}
exports.verifyJwt = verifyJwt;
