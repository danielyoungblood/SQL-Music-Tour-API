const router = require("express").Router();
const db = require("../models");

//index route, shows all events sorted by date in ascending order
router.get("/", async (req, res) => {
  console.log("router.get => / (event)");
  try {
    const events = await db.Event.findAll();
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json(error);
  }
});

//show route, show one event by its iD
router.get("/:id", (req, res) => {
  console.log("router.get => /:id (event)");
});

//create route, create a new event
router.post("/", (req, res) => {
  console.log("router.post => / (event)");
  console.log("router.put=>/:id, req.body" + req.body);
});

//delete route, delete existing event
router.delete("/:id", (req, res) => {
  console.log("router.get => /:id/, (event)");
});

//update route, update existing event
router.put("/:id", (req, res) => {
  console.log("router.put=>/:id, req.body" + req.body);
  console.log("router.put=>/:id, req.params.id" + req.params.id);
  console.log("router.put => /:id/, (event)");
});

module.exports = router;
