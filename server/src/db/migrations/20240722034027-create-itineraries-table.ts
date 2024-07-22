"use strict";

import { QueryInterface, DataTypes } from "sequelize";
import sequelize from "..";

(async () => {
  const queryInterface: QueryInterface = sequelize.getQueryInterface();

  try {
    await queryInterface.createTable("itineraries", {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      flights: {
        type: DataTypes.JSON,
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
  } catch (error) {
    console.error("Error creating itineraries table:", error);
  } finally {
    await sequelize.close();
  }
})();
