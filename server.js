const restify = require("restify");
const mongoClient = require("mongodb").MongoClient;

const server = restify.createServer({
  name: "Simple Restfull API",
  version: "1.0.0",
});

server.use(restify.plugins.bodyParser());

server.get("/api/category/:_id", function (req, res, next) {
  res.send(200, "this is get by id");
});

server.put("/api/category/:_id", function (req, res, next) {
  res.send(200, "this is put");
});

server.del("/api/category/:_id", function (req, res, next) {
  res.send(200, "this is delete");
});

const mongoURI = "mongodb://localhost:27017/";

server.listen(3000, function () {
  console.log("%s listen at %s", server.name, server.url);
  mongoClient.connect(
    mongoURI,
    { useNewUrlParser: true, useUnifiedTopology: true },
    function (err, db) {
      if (err) throw ("Message: ", err);

      const dbo = db.db("simpleAPI");
      const collection = dbo.collection("categories");

      // Get all categories
      server.get("/api/category", function (req, res, next) {
        collection
          .find({})
          .toArray()
          .then((collection) => res.send(200, collection))
          .catch((err) => res.send(500, err));
      });

      // Post data
      server.post("/api/category", function (req, res, next) {
        // res.send(201, req.bodyParser);
        console.log("berhasil");
      });
    }
  );
});
