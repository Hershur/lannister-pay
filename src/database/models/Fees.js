import { Model, DataTypes } from 'sequelize';
import sequelize from '../database'; 

class Fees extends Model {}

Fees.init({
    FeeId: {
        type: DataTypes.STRING 
    },
    FeeCurrency:  {
        type: DataTypes.STRING 
    },
    FeeLocale:  {
        type: DataTypes.STRING 
    },
    FeeEntity:  {
        type: DataTypes.STRING 
    },
    EntityProperty:  {
        type: DataTypes.STRING 
    },
    FeeType: {
        type: DataTypes.STRING
    },
    FeeValue: {
        type: DataTypes.STRING
    }
}, { 
    sequelize,
    modelName: 'fees',
});


export default Fees;