export const generateFeeConfigObj = (feesConfigSpec)=>{
    return feesConfigSpec.split('\n').map(config => config.split(' '))
        .reduce((result, feesConfig) => {
            const entity = feesConfig[3].replace(')', '').split('(');
            result.push({
                FeeId: feesConfig[0],
                FeeCurrency: feesConfig[1],
                FeeLocale: feesConfig[2],
                FeeEntity: entity[0],
                EntityProperty: entity[1],
                FeeType: feesConfig[6],
                FeeValue: feesConfig[7]
            })
            return result;
        }, []);
}



export const computeFeeConfigFromTransPayLoad = (transPayload)=> {
    return {
        FeeCurrency: transPayload.Currency,
        FeeLocale: transPayload.CurrencyCountry === transPayload.PaymentEntity.Country ? 'LOCL' : 'INTL',
        FeeEntity: transPayload.PaymentEntity.Type,
        EntityProperty: transPayload.PaymentEntity.Brand
    }
};


export const computeApplicableFee = (fees)=> {
    return fees.map(obj => ({feeObj: obj,  countStar: Object.values(obj).join(' ').split("*").length - 1 })).reduce((a,b)=> a.countStar < b.countStar ? a : b);
}

export const computeAppliedFeeValue = (amount, feeType, feeValue)=> {
    if(feeType === 'FLAT_PERC'){
        const [flatRate, percRate] = feeValue.split(':');
        
        return Number(flatRate) + ((Number(percRate) / 100) * amount);
    } else if (feeType === 'PERC'){
        return (Number(feeValue) / 100) * amount
    }

    return amount;
}