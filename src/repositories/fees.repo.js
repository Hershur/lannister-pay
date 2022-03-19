import Fees from "../database/models/Fees";
import { Op } from 'sequelize';

export const saveFeesConfigRepo = async (fees) =>  {
    const saveFees = await Fees.bulkCreate(fees);
    return saveFees;
}


export const fetchApplicableFeeConfigRepo = async (payload) => {

    const res = await Fees.findAll({
                        raw: true,
                        where: 
                            {
                                [Op.and]: [
                                    {
                                        [Op.or]: [
                                            {
                                                FeeCurrency: {
                                                    [Op.eq]: payload.FeeCurrency
                                                }
                                            },
                                            {
                                                FeeCurrency: {
                                                    [Op.eq]: '*'
                                                }
                                            }
                                        ],
                                    },
                                    {
                                        [Op.or]: [
                                            {
                                                FeeEntity: {
                                                    [Op.eq]: payload.FeeEntity
                                                }
                                            },
                                            {
                                                FeeEntity: {
                                                    [Op.eq]: '*'
                                                }
                                            }
                                        ],
                                    },
                                    {
                                        [Op.or]: [
                                            {
                                                EntityProperty: {
                                                    [Op.eq]: payload.EntityProperty
                                                }
                                            },
                                            {
                                                EntityProperty: {
                                                    [Op.eq]: '*'
                                                }
                                            }
                                        ],
                                    },
                                    {
                                        [Op.or]: [
                                            {
                                                FeeLocale: {
                                                    [Op.eq]: payload.FeeLocale
                                                }
                                            },
                                            {
                                                FeeLocale: {
                                                    [Op.eq]: '*'
                                                }
                                            }
                                        ],
                                    },
                                    
                                ],

                            }
                        });
    return res;
}


export const truncateTableRepo = async ()=> {
    return await Fees.truncate();
}