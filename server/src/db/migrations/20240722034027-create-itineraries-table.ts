"use strict";

import { QueryInterface, DataTypes } from "sequelize";

/** @type {import('sequelize-cli').Migration} */
export default {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.createTable("itineraries", {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      from_airport: {
        type: DataTypes.STRING(3),
        allowNull: false,
      },
      to_airport: {
        type: DataTypes.STRING(3),
        allowNull: false,
      },
      requester_ip: {
        type: DataTypes.STRING(45),
        allowNull: true,
      },
      timestamp: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    });
  },
  down: async (queryInterface: QueryInterface) => {
    await queryInterface.dropTable("itineraries");
  },
};
