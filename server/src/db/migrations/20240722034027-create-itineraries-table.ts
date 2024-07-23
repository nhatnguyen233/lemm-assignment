"use strict";

import { QueryInterface, DataTypes, QueryTypes } from "sequelize";
import sequelize from "..";

(async () => {
  const queryInterface: QueryInterface = sequelize.getQueryInterface();

  try {
    const [results] = await queryInterface.sequelize.query<{ exists: boolean }>(
      "SELECT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'itineraries');",
      { type: QueryTypes.SELECT }
    );

    if (!results.exists) {
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
      console.log("Table 'itineraries' created successfully.");
    } else {
      console.log("Table 'itineraries' already existed.");
    }
  } catch (error) {
    console.error("Error creating itineraries table:", error);
  }
})();
