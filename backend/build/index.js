"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const auth = __importStar(require("./helpers/authenticationHelper"));
const app = express_1.default();
const PORT = 8000 || process.env.PORT;
const limiter = express_rate_limit_1.default({
    windowMs: 1 * 60 * 1000,
    max: 10,
    message: "Too many requests from this IP.  Please wait a moment and try again later."
});
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(limiter);
app.post('/login', (req, res) => {
    var db = auth.dbConnect();
    db.connection.on('error', console.error.bind(console, 'connection error:'));
    db.connection.once('open', () => __awaiter(void 0, void 0, void 0, function* () {
        var userRes = yield auth.userLogin(req.body.email, req.body.password);
        db.connection.close();
        res.json(userRes);
    }));
});
app.listen(PORT, () => {
    console.log(`⚡️[server]: Server is running on PORT: ${PORT}`);
});
