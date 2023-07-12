module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("bands", "recommendation", {
      type: Sequelize.STRING,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("bands", "recommendation");
  },
};
