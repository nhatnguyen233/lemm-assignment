import { Model, DataTypes } from "sequelize";
import sequelize from "../";

class Itinerary extends Model {
  public id!: number;
  public flights!: string;
  public requester_ip!: string;
  public timestamp!: Date;
}

Itinerary.init(
  {
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
      type: DataTypes.STRING,
      allowNull: false,
    },
    timestamp: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: "itineraries",
    timestamps: false,
  }
);

export default Itinerary;
