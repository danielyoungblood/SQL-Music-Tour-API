const router = require("express").Router();
const db = require("../models");

//index route, shows all stages sorted by date in ascending order
router.get("/", async (req, res) => {
  console.log("router.get => / (stage)");
  try {
    const stages = await db.Stage.findAll();
    res.status(200).json(stages);
  } catch (error) {
    res.status(500).json(error);
  }
});

//show route, show one stage by its iD
router.get("/:id", (req, res) => {
  console.log("router.get => /:id (stage)");
});

//create route, create a new stage
router.post("/", (req, res) => {
  console.log("router.post => / (stage)");
  console.log("router.put=>/:id, req.body" + req.body);
});

//delete route, delete existing stage
router.delete("/:id", (req, res) => {
  console.log("router.get => /:id/, (stage)");
});

//update route, update existing stage
router.put("/:id", (req, res) => {
  console.log("router.put=>/:id, req.body" + req.body);
  console.log("router.put=>/:id, req.params.id" + req.params.id);
  console.log("router.put => /:id/, (stage)");
});

module.exports = router;
