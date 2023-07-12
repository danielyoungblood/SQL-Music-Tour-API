const router = require("express").Router();
const db = require("../models");

//this defines a route (path) to /places using the GET method
//with express using the name router then a . followed by the http method defines a path
router.get("/", (req, res) => {
  db.Event.find()
    .then((places) => {
      res.render("places/index", { places });
    })
    .catch((err) => {
      console.log(err);
      res.render("error404");
    });
});

router.post("/", (req, res) => {
  if (!req.body.pic) {
    // Default image if one is not provided
    req.body.pic = "http://placekitten.com/400/400";
  }
  db.Event.create(req.body)
    .then(() => {
      console.log("place added successfully");
      res.redirect("/places");
    })
    .catch((err) => {
      console.log("err", err);
      res.render("error404");
    });
});

router.post("/:id/comment", (req, res) => {
  console.log("router.post=>/:id/comment, req.body" + req.body);
  console.log("router.post=>/:id/comment, req.params.id" + req.params.id);
  req.body.rant = req.body.rant ? true : false;
  db.Event.findById(req.params.id)
    .then((place) => {
      db.Comment.create(req.body).then((comment) => {
        place.comments.push(comment.id);
        place.save().then(() => {
          res.redirect(`/places/${req.params.id}`);
        });
      });
    })
    .catch((err) => {
      res.render("error404");
    });
});

//this defines a route (path) to /places/new
//router.get adds the "/places" to this path that ends with "/new" giving us the complete path as "/places/new"
router.get("/new", (req, res) => {
  res.render("places/new");
});

router.get("/:id", (req, res) => {
  db.Event.findById(req.params.id)
    .populate("comments")
    .then((place) => {
      console.log(place.comments);
      res.render("places/show", { place });
    })
    .catch((err) => {
      console.log("err", err);
      res.render("error404");
    });
});

router.get("/:id/edit", (req, res) => {
  db.Event.findById(req.params.id)
    .then((place) => {
      res.render("places/edit", { place });
    })
    .catch((err) => {
      res.render("error404");
    });
});

router.get("/:id/comment", (req, res) => {
  db.Event.findById(req.params.id)
    .then((place) => {
      res.render("places/comment", { place });
    })
    .catch((err) => {
      res.render("error404");
    });
});

router.delete("/:id", (req, res) => {
  db.Event.findByIdAndDelete(req.params.id)
    .then((place) => {
      res.redirect("/places");
    })
    .catch((err) => {
      console.log("err", err);
      res.render("error404");
    });
});

router.put("/:id", (req, res) => {
  console.log("router.put=>/:id, req.body" + req.body);
  console.log("router.put=>/:id, req.params.id" + req.params.id);
  db.Event.findByIdAndUpdate(req.params.id, req.body)
    .then(() => {
      res.redirect(`/places/${req.params.id}`);
    })
    .catch((err) => {
      console.log("err", err);
      res.render("error404");
    });
});

module.exports = router;
