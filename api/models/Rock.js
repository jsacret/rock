const rock = {
  attributes: {
    title: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    description: {
      type: Sequelize.STRING,
    },
    creatorId: {
      type: Sequelize.INTEGER,
      references: {model: 'user', key: 'id'}
    }
  },
  options: {
  },
  associations: () => {
    Rock.belongsTo(User, {
      foreignKey: 'id'
    });
  }
}

module.exports = rock;