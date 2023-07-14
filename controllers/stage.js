const router = require("express").Router();
const db = require("../models");
const { Op } = require("sequelize");

//index route, shows all stages sorted by date in ascending order
router.get("/", async (req, res) => {
  console.log("(stage) router.get=>/");
  try {
    const stages = await db.Stage.findAll({
      order: [["stage_name", "ASC"]],
      where: {
      stage_name: { [Op.like]: `%${req.query.name ? req.query.name : ""}%` },
      },
    });
    res.status(200).json(stages);
  } catch (error) {
    res.status(500).json(error);
  }
});

//show route, show one stage by its iD
stages.get("/:name", async (req, res) => {
  try {
    const foundStage = await Stage.findOne({
      where: { stage_name: req.params.name },
      include: {
        model: Event,
        as: "events",
        through: { attributes: [] },
      },
      order: [[{ model: Event, as: "events" }, "date", "ASC"]],
    });
    res.status(200).json(foundStage);
  } catch (error) {
    res.status(500).json(error);
  }
});

//create route, create a new stage
router.post("/", async (req, res) => {
  console.log("(stage) router.post=>/");
  console.log("(stage) router.post=>/, req.body=" + req.body);
   try {
    const newStages = await db.Stage.create(req.body);
    res.status(200).json({
      message: "Successfully inserted a stage",
      data: newStages,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//delete route, delete existing stage
router.delete("/:id", async (req, res) => {
  console.log("(stage) router.delete=>/:id");
  console.log("(stage) router.delete=>/:id, req.params.id=" + req.params.id);
    try {
    const deletedStages = await db.Stage.destroy({
      where: {
        stage_id: req.params.id,
      },
    });
    res.status(200).json({
      message: `Successfully deleted ${deletedStages} stage(s)`,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//update route, update existing stage
router.put("/:id", async (req, res) => {
  console.log("(stage) router.put=>/:id");
  console.log("(stage) router.put=>/:id, req.body=" + req.body);
  console.log("(stage) router.put=>/:id, req.params.id=" + req.params.id);
  try {
    const updatedStages = await db.Stage.update(req.body, {
      where: {
        stage_id: req.params.id,
      },
    });
    res.status(200).json({
      message: `Successfully updated ${updatedStages} stage(s)`,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
