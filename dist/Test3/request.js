"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function xhrRequest(url) {
    if (global.XMLHttpRequest) {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open("GET", url);
            xhr.onload = function () {
                resolve(xhr.response);
            };
            xhr.onerror = function (error) {
                reject(error);
            };
            xhr.send();
        });
    }
    else {
        return new Promise((resolve, reject) => {
            setTimeout(() => resolve(1), 1000);
        });
    }
}
exports.default = xhrRequest;
//# sourceMappingURL=request.js.map