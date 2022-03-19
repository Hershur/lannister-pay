import { computeTransactionFeeService, saveFeesConfigService, truncateTableService } from '../services/fees.services';

export const saveFeesConfig = async (req, res)=> {
    const { FeeConfigurationSpec } = req.body;

    const saveFees = await saveFeesConfigService(FeeConfigurationSpec);

    if(saveFees.status === 'ok'){
        return res.status(200).json(saveFees);
    } else {
        return res.status(500).json(saveFees);
    }
}

export const computeTransactionFee = async (req, res)=> {
    const compute = await computeTransactionFeeService();
    return res.status(200).json(compute);
}

export const truncateTable = async (req, res)=>{
    const { secret_key } = req.headers;
    const result = await truncateTableService(secret_key);

    if(!result.error){
        return res.status(200).json(result)
    } else {
        return res.status(500).json(result)
    }
}