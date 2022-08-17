"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var test_server_exports = {};
__export(test_server_exports, {
  default: () => test_server_default
});
module.exports = __toCommonJS(test_server_exports);
var import_express = __toESM(require("express"), 1);
const app = (0, import_express.default)();
app.get("/set", (req, res) => {
  const { name, value } = req.query;
  res.setHeader("Set-Cookie", `${name}=${value}`);
  res.end();
});
app.get("/set-redirect", (req, res) => {
  const { name, value } = req.query;
  res.setHeader("Set-Cookie", `${name}=${value}`);
  res.redirect("http://localhost:9999/get");
});
app.get("/set-relative-redirect", (req, res) => {
  const { name, value } = req.query;
  res.set("set-cookie", `${name}=${value}`);
  res.redirect("/get");
});
app.get("/set-multiple", (req, res) => {
  res.cookie("foo", "bar", { expires: new Date(2e3, 0, 1) });
  res.cookie("tuna", "can");
  res.end();
});
app.get("/get", (req, res) => {
  let cookies = req.headers.cookie;
  if (!Array.isArray(cookies)) {
    cookies = [cookies];
  }
  res.json(cookies);
});
app.get("/ok-if-empty", (req, res) => {
  if (req.headers.cookie !== void 0) {
    res.status(400);
  }
  res.end();
});
app.get("/cookie", (req, res) => {
  res.setHeader(
    "set-cookie",
    "my_cookie=HelloWorld; path=/; domain=www.example.com; secure; HttpOnly; SameSite=Lax"
  );
  res.cookie("tuna", "can");
  res.end();
});
var test_server_default = app;
