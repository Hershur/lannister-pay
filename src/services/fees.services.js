import { computeApplicableFee, computeAppliedFeeValue, computeFeeConfigFromTransPayLoad, generateFeeConfigObj } from "../helpers/helper";
import { fetchApplicableFeeConfigRepo, saveFeesConfigRepo, truncateTableRepo } from "../repositories/fees.repo";
import { SECRET_KEY } from '../config/index';

export const saveFeesConfigService = async (feesConfigSpec)=> {
    try {
        const getFees = generateFeeConfigObj(feesConfigSpec);

        const saveFees = await saveFeesConfigRepo(getFees);
        
        if(saveFees){
            return {
                Status: "ok"
            }
        }
        
    } catch (error) {
        return {
            Status: "error",
            Error: "An error occurred"
        }
    }

    
}


export const computeTransactionFeeService = async (transactionPayload)=> {
    try {
        const configurePayload = computeFeeConfigFromTransPayLoad(transactionPayload);
        const fetchApplicableFees = await fetchApplicableFeeConfigRepo(configurePayload);

        if(fetchApplicableFees.length < 1){
            return {
                Error: `No fee configuration for ${transactionPayload.Currency} transactions.`
            }
        }

        const mostSpecificFee = computeApplicableFee(fetchApplicableFees)?.feeObj;
        const appliedFeeValue = computeAppliedFeeValue(+transactionPayload.Amount, mostSpecificFee.FeeType, mostSpecificFee.FeeValue)
        const chargeAmount = transactionPayload.Customer.BearsFee ? appliedFeeValue + Number(transactionPayload.Amount) : +transactionPayload.Amount;
        

        return {
            AppliedFeeID: mostSpecificFee.FeeId,
            AppliedFeeValue: Math.round(appliedFeeValue),
            ChargeAmount: chargeAmount,
            SettlementAmount: chargeAmount - appliedFeeValue
        }
        
    } catch (error) {
        console.log(error);
        return {
            Status: "error",
            Error: "An error occurred"
        }
    }
}


export const truncateTableService = async (secretKey)=> {
    try {
        if(secretKey === SECRET_KEY){
            const res = await truncateTableRepo();
            return { Message: 'Truncated'};
        } else {
            return { Error: 'Not allowed', Message: 'Secret key required'};
        }
        
    } catch (error) {
        return {
            Status: "error",
            Error: "An error occurred"
        }
    }
}