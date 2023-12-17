(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["microbin"] = factory();
	else
		root["microbin"] = factory();
})(self, () => {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
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
var __await = (this && this.__await) || function (v) { return this instanceof __await ? (this.v = v, this) : new __await(v); }
var __asyncGenerator = (this && this.__asyncGenerator) || function (thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return", awaitReturn), i[Symbol.asyncIterator] = function () { return this; }, i;
    function awaitReturn(f) { return function (v) { return Promise.resolve(v).then(f, reject); }; }
    function verb(n, f) { if (g[n]) { i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; if (f) i[n] = f(i[n]); } }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
};
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.loadAll = exports.loadIter = exports.load = exports.loadsAll = exports.loadsIter = exports.loads = void 0;
const type_1 = __webpack_require__(/*! ./type */ "./src/type.ts");
const reader_1 = __webpack_require__(/*! ./reader */ "./src/reader.ts");
__exportStar(__webpack_require__(/*! ./type */ "./src/type.ts"), exports);
__exportStar(__webpack_require__(/*! ./reader */ "./src/reader.ts"), exports);
__exportStar(__webpack_require__(/*! ./writer */ "./src/writer.ts"), exports);
function loads(data, allowedMagic = type_1.DEFAULT_MAGIC) {
    return __awaiter(this, void 0, void 0, function* () {
        const reader = yield (0, reader_1.ArrayBufferReader)(data, allowedMagic);
        if (reader.count !== 1)
            throw new reader_1.DecodeError("File contains more than one global object");
        return yield reader.read();
    });
}
exports.loads = loads;
function loadsIter(data, allowedMagic = type_1.DEFAULT_MAGIC) {
    return __asyncGenerator(this, arguments, function* loadsIter_1() {
        const reader = yield __await((0, reader_1.ArrayBufferReader)(data, allowedMagic));
        for (let i = 0; i < reader.count; i++) {
            yield yield __await(yield __await(reader.read()));
        }
    });
}
exports.loadsIter = loadsIter;
function loadsAll(data, allowedMagic = type_1.DEFAULT_MAGIC) {
    var _a, e_1, _b, _c;
    return __awaiter(this, void 0, void 0, function* () {
        const arr = [];
        try {
            for (var _d = true, _e = __asyncValues(loadsIter(data, allowedMagic)), _f; _f = yield _e.next(), _a = _f.done, !_a; _d = true) {
                _c = _f.value;
                _d = false;
                const i = _c;
                arr.push(i);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (!_d && !_a && (_b = _e.return)) yield _b.call(_e);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return arr;
    });
}
exports.loadsAll = loadsAll;
function load(fp, allowedMagic = type_1.DEFAULT_MAGIC) {
    return __awaiter(this, void 0, void 0, function* () {
        const reader = yield (0, reader_1.ReadableStreamReader)(fp, allowedMagic);
        if (reader.count !== 1)
            throw new reader_1.DecodeError("File contains more than one global object");
        return yield reader.read();
    });
}
exports.load = load;
function loadIter(fp, allowedMagic = type_1.DEFAULT_MAGIC) {
    return __asyncGenerator(this, arguments, function* loadIter_1() {
        const reader = yield __await((0, reader_1.ReadableStreamReader)(fp, allowedMagic));
        for (let i = 0; i < reader.count; i++) {
            yield yield __await(yield __await(reader.read()));
        }
    });
}
exports.loadIter = loadIter;
function loadAll(fp, allowedMagic = type_1.DEFAULT_MAGIC) {
    var _a, e_2, _b, _c;
    return __awaiter(this, void 0, void 0, function* () {
        const arr = [];
        try {
            for (var _d = true, _e = __asyncValues(loadIter(fp, allowedMagic)), _f; _f = yield _e.next(), _a = _f.done, !_a; _d = true) {
                _c = _f.value;
                _d = false;
                const i = _c;
                arr.push(i);
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (!_d && !_a && (_b = _e.return)) yield _b.call(_e);
            }
            finally { if (e_2) throw e_2.error; }
        }
        return arr;
    });
}
exports.loadAll = loadAll;


/***/ }),

/***/ "./src/reader.ts":
/*!***********************!*\
  !*** ./src/reader.ts ***!
  \***********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Reader_instances, _Reader_count, _Reader_flags, _Reader_allowedMagic, _Reader_chunk, _Reader_offset, _Reader_read, _Reader_readObjectHeader;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ReadableStreamReader = exports.ArrayBufferReader = exports.Reader = exports.EOFError = exports.DecodeError = void 0;
const type_1 = __webpack_require__(/*! ./type */ "./src/type.ts");
class DecodeError extends Error {
    constructor(msg) {
        super(msg);
    }
}
exports.DecodeError = DecodeError;
class EOFError extends DecodeError {
    constructor() {
        super("End of file");
    }
}
exports.EOFError = EOFError;
class Reader {
    constructor(feeder, allowedMagic = type_1.DEFAULT_MAGIC) {
        _Reader_instances.add(this);
        _Reader_count.set(this, 0);
        _Reader_flags.set(this, 0);
        _Reader_allowedMagic.set(this, void 0);
        _Reader_chunk.set(this, undefined);
        _Reader_offset.set(this, 0);
        if (typeof allowedMagic === "number")
            allowedMagic = [allowedMagic];
        __classPrivateFieldSet(this, _Reader_allowedMagic, allowedMagic, "f");
        this.feeder = feeder;
    }
    readHeader() {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield __classPrivateFieldGet(this, _Reader_instances, "m", _Reader_read).call(this, 8);
            if (data.getUint16(0) !== 0x6D62)
                throw new DecodeError("Invalid magic bytes");
            if (!__classPrivateFieldGet(this, _Reader_allowedMagic, "f").includes(data.getUint16(2)))
                throw new DecodeError("Invalid application magic bytes");
            if (data.getUint8(4) !== 0)
                throw new DecodeError("Unsupported version");
            __classPrivateFieldSet(this, _Reader_flags, data.getUint8(5), "f");
            __classPrivateFieldSet(this, _Reader_count, data.getUint16(6), "f");
        });
    }
    get count() {
        return __classPrivateFieldGet(this, _Reader_count, "f");
    }
    get flags() {
        return __classPrivateFieldGet(this, _Reader_flags, "f");
    }
    read(_globl = true) {
        return __awaiter(this, void 0, void 0, function* () {
            const { type, value } = yield __classPrivateFieldGet(this, _Reader_instances, "m", _Reader_readObjectHeader).call(this, _globl);
            switch (type) {
                case type_1.Type.NONE: return null;
                case type_1.Type.FALSE: return false;
                case type_1.Type.TRUE: return true;
                case type_1.Type.FLOAT16:
                    return (yield __classPrivateFieldGet(this, _Reader_instances, "m", _Reader_read).call(this, 2)).getFloat32(0);
                case type_1.Type.FLOAT32:
                    return (yield __classPrivateFieldGet(this, _Reader_instances, "m", _Reader_read).call(this, 4)).getFloat32(0);
                case type_1.Type.FLOAT64:
                    return (yield __classPrivateFieldGet(this, _Reader_instances, "m", _Reader_read).call(this, 8)).getFloat64(0);
                case type_1.Type.RATIONAL:
                    throw new Error("Not implemented!");
                case type_1.Type.INT: return value;
                case type_1.Type.NINT: return -value;
                case type_1.Type.STRING: {
                    const data = yield __classPrivateFieldGet(this, _Reader_instances, "m", _Reader_read).call(this, value);
                    const decoder = new TextDecoder("utf-8");
                    return decoder.decode(new Uint8Array(data.buffer, data.byteOffset, data.byteLength));
                }
                case type_1.Type.BYTES: {
                    const data = yield __classPrivateFieldGet(this, _Reader_instances, "m", _Reader_read).call(this, value);
                    return new Uint8Array(data.buffer, data.byteOffset, data.byteLength);
                }
                case type_1.Type.LIST: {
                    const res = [];
                    for (let i = 0; i < value; i++) {
                        res.push(yield this.read(false));
                    }
                    return res;
                }
                case type_1.Type.MAP: {
                    const res = Object.create(null);
                    for (let i = 0; i < value; i++) {
                        const k = yield this.read(false);
                        res[k] = yield this.read(false);
                    }
                    return res;
                }
                default:
                    throw new Error("Internal error! Please, report a bug.");
            }
        });
    }
}
exports.Reader = Reader;
_Reader_count = new WeakMap(), _Reader_flags = new WeakMap(), _Reader_allowedMagic = new WeakMap(), _Reader_chunk = new WeakMap(), _Reader_offset = new WeakMap(), _Reader_instances = new WeakSet(), _Reader_read = function _Reader_read(n) {
    return __awaiter(this, void 0, void 0, function* () {
        if (typeof n != "number")
            throw new DecodeError("64-bit offsets not supported");
        while (__classPrivateFieldGet(this, _Reader_chunk, "f") === undefined || __classPrivateFieldGet(this, _Reader_offset, "f") + n > __classPrivateFieldGet(this, _Reader_chunk, "f").byteLength) {
            const { done, value } = yield this.feeder();
            if (done)
                throw new EOFError();
            if (value === undefined)
                continue;
            if (__classPrivateFieldGet(this, _Reader_chunk, "f") === undefined) {
                __classPrivateFieldSet(this, _Reader_chunk, value, "f");
                __classPrivateFieldSet(this, _Reader_offset, 0, "f");
                continue;
            }
            const l = __classPrivateFieldGet(this, _Reader_chunk, "f").byteLength - __classPrivateFieldGet(this, _Reader_offset, "f");
            const chunk = new Uint8Array(l + value.byteLength);
            chunk.set(__classPrivateFieldGet(this, _Reader_chunk, "f").slice(__classPrivateFieldGet(this, _Reader_offset, "f")));
            chunk.set(value, l);
            __classPrivateFieldSet(this, _Reader_chunk, chunk, "f");
            __classPrivateFieldSet(this, _Reader_offset, 0, "f");
        }
        const offset = __classPrivateFieldGet(this, _Reader_offset, "f");
        __classPrivateFieldSet(this, _Reader_offset, __classPrivateFieldGet(this, _Reader_offset, "f") + n, "f");
        return new DataView(__classPrivateFieldGet(this, _Reader_chunk, "f").buffer, __classPrivateFieldGet(this, _Reader_chunk, "f").byteOffset + offset, n);
    });
}, _Reader_readObjectHeader = function _Reader_readObjectHeader(globl) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        if (globl) {
            if (!__classPrivateFieldGet(this, _Reader_count, "f"))
                throw new EOFError();
            __classPrivateFieldSet(this, _Reader_count, (_a = __classPrivateFieldGet(this, _Reader_count, "f"), _a--, _a), "f");
        }
        let t = (yield __classPrivateFieldGet(this, _Reader_instances, "m", _Reader_read).call(this, 1)).getUint8(0);
        let tag = t >> 5;
        t &= 0b11111;
        let i = 0;
        while (i != 5 && t & (1 << (4 - i))) {
            i++;
        }
        t &= (1 << (5 - i)) - 1;
        if (i == 5)
            i = 8;
        let data = yield __classPrivateFieldGet(this, _Reader_instances, "m", _Reader_read).call(this, i);
        if (i == 8) {
            return {
                type: tag,
                value: (BigInt(t) << BigInt(i * 8)) | data.getBigUint64(0)
            };
        }
        t <<= i * 8;
        switch (i) {
            case 0: break;
            case 1:
                t |= data.getUint8(0);
                break;
            case 2:
                t |= data.getUint16(0);
                break;
            case 3:
                t |= (data.getUint8(0) << 16) | data.getUint16(1);
                break;
            case 4:
                t |= data.getUint32(0);
                break;
        }
        if (tag === type_1.Type.SPECIAL) {
            tag = (1 << 4) | t;
            t = 0;
        }
        return {
            type: tag,
            value: t
        };
    });
};
function ArrayBufferReader(data, allowedMagic = type_1.DEFAULT_MAGIC) {
    return __awaiter(this, void 0, void 0, function* () {
        let done = false;
        const reader = new Reader(() => __awaiter(this, void 0, void 0, function* () {
            if (done)
                return { done, value: undefined };
            done = true;
            return { done: false, value: new Uint8Array(data) };
        }), allowedMagic);
        yield reader.readHeader();
        return reader;
    });
}
exports.ArrayBufferReader = ArrayBufferReader;
function ReadableStreamReader(fp, allowedMagic = type_1.DEFAULT_MAGIC) {
    return __awaiter(this, void 0, void 0, function* () {
        const streamReader = fp.getReader();
        const reader = new Reader(() => streamReader.read(), allowedMagic);
        yield reader.readHeader();
        return reader;
    });
}
exports.ReadableStreamReader = ReadableStreamReader;


/***/ }),

/***/ "./src/type.ts":
/*!*********************!*\
  !*** ./src/type.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Type = exports.Flags = exports.DEFAULT_MAGIC = void 0;
exports.DEFAULT_MAGIC = 0x0000;
exports.Flags = {};
exports.Type = {
    SPECIAL: 0b000, //
    RATIONAL: 0b001, //
    INT: 0b100, // inline, max 64
    NINT: 0b010, // inline, max 64
    STRING: 0b011, // sized, inline
    BYTES: 0b101, // sized, inline
    LIST: 0b110, // sized
    MAP: 0b111, // sized
    NONE: 16, // singleton
    FALSE: 17, // singleton
    TRUE: 18, // singleton
    FLOAT16: 19, // 2 bytes
    FLOAT32: 20, // 4 bytes
    FLOAT64: 21, // 8 bytes
};


/***/ }),

/***/ "./src/writer.ts":
/*!***********************!*\
  !*** ./src/writer.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Writer = void 0;
class Writer {
}
exports.Writer = Writer;


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.ts");
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=microbin.1.0.0.js.map