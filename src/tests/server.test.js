const test = require("tape");
const superTest = require("supertest");
const router = require("../router");

test("Initialise", t => {
  let string = "Guinea Pigs!";
  t.equal(string, "Guinea Pigs!", "Should return Guinea Pigs!");
  t.end();
});

test("Home route returns status code of 200", t => {
  superTest(router)
    .get("/")
    .expect(200)
    .expect("Content-type", /html/)
    .end((err, res) => {
      t.error(err);
      t.equal(res.statusCode, 200, "Should be 200");
      t.end();
    });
});

test("Home route returns index.html", t => {
  superTest(router)
    .get("/")
    .expect(200)
    .expect("Content-type", /html/)
    .end((err, res) => {
      t.error(err);
      t.equal(
        res.text.includes("<title>Guinea Pig Hotel</title>"),
        true,
        "Should find index.html title"
      );
      t.end();
    });
});

test("Public route, css", t => {
  superTest(router)
    .get("/public/style.css")
    .expect(200)
    .expect("Content-type", /css/)
    .end((err, res) => {
      t.error(err);
      t.equal(res.statusCode, 200, "Should return 200");
      t.end();
    });
});

test("Public route, js", t => {
  superTest(router)
    .get("/public/dom.js")
    .expect(200)
    .expect("Content-type", /javascript/)
    .end((err, res) => {
      t.error(err);
      t.equal(res.statusCode, 200, "Should return 200");
      t.end();
    });
});
