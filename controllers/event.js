const router = require("express").Router();
const db = require("../models");
const { Op } = require("sequelize");

//index route, shows all events sorted by date in ascending order
router.get("/", async (req, res) => {
  console.log("(event) router.get=>/");
  try {
    const events = await db.Event.findAll({
      order: [["date", "ASC"]],
      where: {
        name: { [Op.like]: `%${req.query.name ? req.query.name : ""}%` },
      },
    });

    res.status(200).json(events);
  } catch (error) {
    res.status(500).json(error);
  }
});

//show route, show one event by its iD
router.get("/:id", async (req, res) => {
  console.log("(event) router.get=>/:id");
  console.log("(event) router.get=>/:id, req.params.id=" + req.params.id);
  try {
    const events = await db.Event.findOne({
      where: { event_id: req.params.id },
    });
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json(error);
  }
});

//create route, create a new event
router.post("/", async (req, res) => {
  console.log("(event) router.post=>/)");
  console.log("(event) router.post=>/, req.body=" + req.body);
  try {
    const events = await db.Event.create(req.body);
    res.status(200).json({
      message: "Successfully inserted a new event",
      data: events,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//delete route, delete existing event
router.delete("/:id", async (req, res) => {
  console.log("(event) router.delete=>/:id");
  console.log("(event) router.delete=>/:id, req.params.id=" + req.params.id);
  try {
    const deletedEvent = await db.Event.destroy({
      where: {
        event_id: req.params.id,
      },
    });
    res.status(200).json({
      message: `Successfully deleted ${deletedEvent} event(s)`,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//update route, update existing event
router.put("/:id", async (req, res) => {
  console.log("(event) router.put=>/:id");
  console.log("(event) router.put=>/:id, req.body=" + req.body);
  console.log("(event) router.put=>/:id, req.params.id=" + req.params.id);
  try {
    const updatedEvent = await db.Event.update(req.body, {
      where: {
        event_id: req.params.id,
      },
    });
    res.status(200).json({
      message: `Successfully updated ${updatedEvent} event(s)`,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
