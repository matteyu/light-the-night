"use strict";
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
exports.userLogin = exports.dbConnect = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const User_1 = __importDefault(require("../models/User"));
exports.dbConnect = () => {
    var connStr = 'mongodb+srv://chipino:only4you@ia-ltn-challenge.wq4gf.mongodb.net/ia-ltn-challenge';
    mongoose_1.default.connect(connStr, { useNewUrlParser: true, useUnifiedTopology: true });
    return mongoose_1.default;
};
exports.userLogin = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    // try login
    // if can't find user, register the user
    var user = yield User_1.default.findOne({ email: email }).exec();
    if (user) {
        var isMatch = yield user.validatePassword(password);
        if (isMatch) {
            return user;
        }
        else {
            return {
                "error": "Wrong password."
            };
        }
    }
    else {
        var ltnUser = new User_1.default({
            email: email,
            password: password,
            ranking: (yield User_1.default.countDocuments()) + 1
        });
        yield ltnUser.save();
        return {
            "success": `Registered ${email}`
        };
    }
});
