"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var import_chai = require("chai");
var import_fetch_cookie = __toESM(require("@onsite/fetch-cookie"), 1);
var nodeFetch3 = __toESM(require("cross-fetch"), 1);
var import_node_fetch_2 = __toESM(require("node-fetch-2"), 1);
var undici = __toESM(require("undici"), 1);
var import_test_server = __toESM(require("./test-server.js"), 1);
undici.setGlobalDispatcher(new undici.Agent({
  keepAliveTimeout: 10,
  keepAliveMaxTimeout: 10
}));
const { CookieJar, Cookie } = import_fetch_cookie.default.toughCookie;
let server;
before("start test server", async () => {
  return new Promise((resolve, reject) => {
    server = import_test_server.default.listen(9999, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
});
after("stop test server", () => {
  if (server) {
    server.close();
  }
});
suite("node-fetch@3", nodeFetch3.default, nodeFetch3.Request);
suite("node-fetch@2", import_node_fetch_2.default, import_node_fetch_2.default.Request);
function suite(name, fetchImpl, Request) {
  describe(name, () => {
    const fetch = (0, import_fetch_cookie.default)(fetchImpl);
    it("should accept a Request object as only parameter", async () => {
      const req = new Request("http://localhost:9999/get");
      const res = await fetch(req);
      import_chai.assert.propertyVal(res, "status", 200);
    });
    it("should not send empty cookie header", async () => {
      const req = new Request("http://localhost:9999/ok-if-empty");
      const res = await fetch(req);
      import_chai.assert.propertyVal(res, "status", 200);
    });
    it("should handle cookies (using internal cookie jar)", async () => {
      await fetch("http://localhost:9999/set?name=foo&value=bar");
      const res = await fetch("http://localhost:9999/get");
      import_chai.assert.deepEqual(await res.json(), ["foo=bar"]);
    });
    it("should handle cookies (using custom cookie jar)", async () => {
      const jar1 = new CookieJar();
      const fetch1 = (0, import_fetch_cookie.default)(fetchImpl, jar1);
      await fetch1("http://localhost:9999/set?name=foo&value=bar");
      const cookies1 = jar1.store.idx.localhost["/"];
      import_chai.assert.property(cookies1, "foo");
      const cookie1 = cookies1.foo;
      import_chai.assert.instanceOf(cookie1, Cookie);
      import_chai.assert.propertyVal(cookie1, "value", "bar");
      const jar2 = new CookieJar();
      const fetch2 = (0, import_fetch_cookie.default)(fetchImpl, jar2);
      await fetch2("http://localhost:9999/set?name=tuna&value=can");
      const cookies2 = jar2.store.idx.localhost["/"];
      import_chai.assert.property(cookies2, "tuna");
      const cookie2 = cookies2.tuna;
      import_chai.assert.instanceOf(cookie2, Cookie);
      import_chai.assert.propertyVal(cookie2, "value", "can");
      import_chai.assert.notEqual(cookie1, cookie2);
      import_chai.assert.notStrictEqual(cookie1.key, cookie2.key);
      Object.keys(cookies1).forEach((cookie1Key) => {
        import_chai.assert.notProperty(cookie2, cookie1Key);
      });
      Object.keys(cookies2).forEach((cookie2Key) => {
        import_chai.assert.notProperty(cookie1, cookie2Key);
      });
    });
    it("should handle multiple cookies (including comma in 'expires' option)", async () => {
      const jar = new CookieJar();
      const fetch2 = (0, import_fetch_cookie.default)(fetchImpl, jar);
      await fetch2("http://localhost:9999/set-multiple");
      const cookies = jar.store.idx.localhost["/"];
      import_chai.assert.property(cookies, "foo");
      const cookie1 = cookies.foo;
      import_chai.assert.instanceOf(cookie1, Cookie);
      import_chai.assert.propertyVal(cookie1, "value", "bar");
      import_chai.assert.property(cookie1, "expires");
      import_chai.assert.instanceOf(cookie1.expires, Date);
      import_chai.assert.property(cookies, "tuna");
      const cookie2 = cookies.tuna;
      import_chai.assert.instanceOf(cookie2, Cookie);
      import_chai.assert.propertyVal(cookie2, "value", "can");
      import_chai.assert.notEqual(cookie1, cookie2);
      import_chai.assert.notStrictEqual(cookie1.key, cookie2.key);
    });
    it("should ignore error when there is error in setCookie", async () => {
      const jar = new CookieJar();
      const fetch2 = (0, import_fetch_cookie.default)(fetchImpl, jar);
      let error = null;
      try {
        await fetch2("http://localhost:9999/cookie");
      } catch (err) {
        error = err;
      }
      import_chai.assert.isNull(error);
    });
    it("should throw error when there is error in setCookie", async () => {
      const jar = new CookieJar();
      const fetch2 = (0, import_fetch_cookie.default)(fetchImpl, jar, false);
      let error = null;
      try {
        await fetch2("http://localhost:9999/cookie");
      } catch (err) {
        error = err;
      }
      import_chai.assert.instanceOf(error, Error);
    });
    it("should handle redirects", async () => {
      const jar = new CookieJar();
      const fetch2 = (0, import_fetch_cookie.default)(fetchImpl, jar);
      const res = await fetch2("http://localhost:9999/set-redirect?name=foo&value=bar");
      import_chai.assert.isTrue(res.redirected);
      import_chai.assert.deepEqual(await res.json(), ["foo=bar"]);
    });
    it("should handle relative redirects", async () => {
      const jar = new CookieJar();
      const fetch2 = (0, import_fetch_cookie.default)(fetchImpl, jar);
      const res = await fetch2("http://localhost:9999/set-relative-redirect?name=foo&value=bar");
      import_chai.assert.isTrue(res.redirected);
      import_chai.assert.deepEqual(await res.json(), ["foo=bar"]);
    });
  });
}
