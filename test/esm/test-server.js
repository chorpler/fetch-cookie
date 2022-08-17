import express from "express";
const app = express();
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
export {
  test_server_default as default
};
