import { generateFeeConfigObj } from "../helpers/helper";
import { saveFeesConfigRepo, truncateTableRepo } from "../repositories/fees.repo";
import { SECRET_KEY } from '../config/index';

export const saveFeesConfigService = async (feesConfigSpec)=> {
    try {
        const getFees = generateFeeConfigObj(feesConfigSpec);

        const saveFees = await saveFeesConfigRepo(getFees);
        
        if(saveFees){
            return {
                status: "ok"
            }
        }
        
    } catch (error) {
        return {
            status: "error",
            error: "An error occurred"
        }
    }

    
}


export const computeTransactionFeeService = async (transactionPayload)=> {
    return { message: "Compute fee here"};
}


export const truncateTableService = async (secretKey)=> {
    try {
        if(secretKey === SECRET_KEY){
            const res = await truncateTableRepo();
            return { message: 'Truncated'};
        } else {
            return { message: 'Secret key required'};
        }
        
    } catch (error) {
        return {
            status: "error",
            error: "An error occurred"
        }
    }
}