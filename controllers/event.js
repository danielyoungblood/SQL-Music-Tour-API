const router = require("express").Router();
const db = require("../models");

//this defines a route (path) to /events using the GET method
//with express using the name router then a . followed by the http method defines a path
router.get("/", (req, res) => {
  console.log("router.get => / (event)");
  db.Event.find()
    .then((events) => {
      res.render("events/index", { events });
    })
    .catch((err) => {
      console.log(err);
      res.render("error404");
    });
});

router.post("/", (req, res) => {
  console.log("router.post => / (event)");
  db.Event.create(req.body)
    .then(() => {
      console.log("event added successfully");
      res.redirect("/events");
    })
    .catch((err) => {
      console.log("err", err);
      res.render("error404");
    });
});

router.post("/:id/comment", (req, res) => {
  console.log("router.post=>/:id/comment, req.body" + req.body);
  console.log("router.post=>/:id/comment, req.params.id" + req.params.id);
  console.log("router.post =>/:id/comment, (event)");
  req.body.rant = req.body.rant ? true : false;
  db.Event.findById(req.params.id)
    .then((event) => {
      db.Comment.create(req.body).then((comment) => {
        event.comments.push(comment.id);
        event.save().then(() => {
          res.redirect(`/events/${req.params.id}`);
        });
      });
    })
    .catch((err) => {
      res.render("error404");
    });
});

//this defines a route (path) to /events/new
//router.get adds the "/events" to this path that ends with "/new" giving us the complete path as "/events/new"
router.get("/new", (req, res) => {
  console.log("router.get => /new (event)");
  res.render("events/new");
});

router.get("/:id", (req, res) => {
  console.log("router.get => /:id (event)");
  db.Event.findById(req.params.id)
    .populate("comments")
    .then((event) => {
      console.log(event.comments);
      res.render("events/show", { event });
    })
    .catch((err) => {
      console.log("err", err);
      res.render("error404");
    });
});

router.get("/:id/edit", (req, res) => {
  console.log("router.get => /:id/edit (event)");
  db.Event.findById(req.params.id)
    .then((event) => {
      res.render("events/edit", { event });
    })
    .catch((err) => {
      res.render("error404");
    });
});

router.get("/:id/comment", (req, res) => {
  console.log("router.get => /:id/comment (event)");
  db.Event.findById(req.params.id)
    .then((event) => {
      res.render("events/comment", { event });
    })
    .catch((err) => {
      res.render("error404");
    });
});

router.delete("/:id", (req, res) => {
  console.log("router.get => /:id/, (event)");
  db.Event.findByIdAndDelete(req.params.id)
    .then((event) => {
      res.redirect("/events");
    })
    .catch((err) => {
      console.log("err", err);
      res.render("error404");
    });
});

router.put("/:id", (req, res) => {
  console.log("router.put=>/:id, req.body" + req.body);
  console.log("router.put=>/:id, req.params.id" + req.params.id);
  console.log("router.put => /:id/, (event)");
  db.Event.findByIdAndUpdate(req.params.id, req.body)
    .then(() => {
      res.redirect(`/events/${req.params.id}`);
    })
    .catch((err) => {
      console.log("err", err);
      res.render("error404");
    });
});

module.exports = router;
