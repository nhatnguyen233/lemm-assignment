import { Model, DataTypes } from "sequelize";
import sequelize from "../";

class Itinerary extends Model {
  public id!: number;
  public from_airport!: string;
  public to_airport!: string;
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
  },
  {
    sequelize,
    tableName: "itineraries",
    timestamps: false,
  }
);

export default Itinerary;
