const router = require("express").Router();
const db = require("../models");
const { Op } = require("sequelize");

//index route, shows all bands sorted by date in ascending order
router.get("/", async (req, res) => {
  console.log("router.get => / (band)");
  try {
    const bands = await db.Band.findAll({
      order: [["available_start_time", "ASC"]],
      where: {
        name: { [Op.like]: `%${req.query.name ? req.query.name : ""}%` }
      },
    });
    res.status(200).json(bands);
  } catch (error) {
    res.status(500).json(error);
  }
});

//show route, show one band by its iD
router.get("/:id", async (req, res) => {
  console.log("router.get => /:id (band)");
  try {
    const bands = await db.Band.findOne({
      where: { band_id: req.params.id },
    });
    res.status(200).json(bands);
  } catch (error) {
    res.status(500).json(error);
  }
});

//create route, create a new band
router.post("/", async (req, res) => {
  console.log("router.post => / (band)");
  console.log("router.put=>/:id, req.body" + req.body);
  try {
    const newBands = await db.Band.create(req.body);
    res.status(200).json({
      message: "Successfully inserted a new band",
      data: newBands,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//delete route, delete existing band
router.delete("/:id", async (req, res) => {
  console.log("router.get => /:id/, (band)");
  try {
    const deletedBands = await db.Band.destroy({
      where: {
        band_id: req.params.id,
      },
    });
    res.status(200).json({
      message: `Successfully deleted ${deletedBands} band(s)`,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//update route, update existing band
router.put("/:id", async (req, res) => {
  console.log("router.put=>/:id, req.body" + req.body);
  console.log("router.put=>/:id, req.params.id" + req.params.id);
  console.log("router.put => /:id/, (band)");
  try {
    const updatedBands = await db.Band.update(req.body, {
      where: {
        band_id: req.params.id,
      },
    });
    res.status(200).json({
      message: `Successfully updated ${updatedBands} band(s)`,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
