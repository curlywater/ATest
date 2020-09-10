"use strict";
// 约定：
// title数据类型为String
// userId为主键，数据类型为Number
Object.defineProperty(exports, "__esModule", { value: true });
function find(origin) {
    if (!Array.isArray(origin)) {
        throw new Error("parameter should be an array.");
    }
    return Object.defineProperties([...origin], {
        where: {
            value(condition) {
                var _a, _b;
                const removeIndexes = [];
                const len = this.length;
                for (let i = 0; i < len; i++) {
                    const item = this[i];
                    for (let key in condition) {
                        if (!((_b = (_a = condition[key]) === null || _a === void 0 ? void 0 : _a.test) === null || _b === void 0 ? void 0 : _b.call(_a, item[key]))) {
                            removeIndexes.push(i);
                        }
                    }
                }
                let rIndex = 0;
                let slowIndex = removeIndexes[rIndex];
                let fastIndex = removeIndexes[rIndex];
                while (fastIndex < len) {
                    if (fastIndex === removeIndexes[rIndex]) {
                        rIndex++;
                    }
                    else {
                        this[slowIndex] = this[fastIndex];
                        slowIndex++;
                    }
                    fastIndex++;
                }
                this.length = len - removeIndexes.length;
                return this;
            },
            writable: false,
            enumerable: false,
        },
        orderBy: {
            value(key, order = "desc") {
                const returnValue = order === "desc" ? 1 : -1;
                this.sort((a, b) => {
                    const aValue = a[key];
                    const bValue = b[key];
                    if (aValue === null) {
                        return bValue === null ? 0 : returnValue;
                    }
                    else if (bValue === null) {
                        return aValue === null ? 0 : -returnValue;
                    }
                    else {
                        return aValue > bValue ? -returnValue : returnValue;
                    }
                });
                return this;
            },
            writable: false,
            enumerable: false,
        },
    });
}
exports.default = find;
;
// 查找 data 中，符合条件的数据，并进⾏排序
//# sourceMappingURL=index.js.map