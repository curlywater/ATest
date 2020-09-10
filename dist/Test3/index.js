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
Object.defineProperty(exports, "__esModule", { value: true });
const request_1 = require("./request");
class CachedRequest {
    constructor() {
        this.cache = {};
        this.fetch = (url) => {
            this.cache[url] = request_1.default(url);
            return this.cache[url];
        };
        this.request = (url) => __awaiter(this, void 0, void 0, function* () {
            const cache = this.cache[url];
            try {
                if (cache) {
                    try {
                        return yield cache;
                    }
                    catch (err) {
                        return yield this.fetch(url);
                    }
                }
                else {
                    return yield this.fetch(url);
                }
            }
            catch (err) {
                console.log(err);
            }
        });
    }
}
const cacheRequest = new CachedRequest().request;
exports.default = cacheRequest;
//# sourceMappingURL=index.js.map