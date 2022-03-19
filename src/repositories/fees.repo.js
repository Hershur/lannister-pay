import Fees from "../database/models/Fees";

export const saveFeesConfigRepo = async (fees) =>  {
    const saveFees = await Fees.bulkCreate(fees);
    return saveFees;
}

export const truncateTableRepo = async ()=> {
    return await Fees.truncate();
}