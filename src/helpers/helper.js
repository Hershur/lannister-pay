export const generateFeeConfigObj = (feesConfigSpec)=>{
    return feesConfigSpec.split('\n').map(config => {
        const feesConfig = config.split(' ');
        const entity = feesConfig[3].replace(')', '').split('(');
        return {
            FeeId: feesConfig[0],
            FeeCurrency: feesConfig[1],
            FeeLocale: feesConfig[2],
            FeeEntity: entity[0],
            EntityProperty: entity[1],
            FeeType: feesConfig[6],
            FeeValue: feesConfig[7]
        }

    });
};