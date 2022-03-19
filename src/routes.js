import express from 'express';
import { celebrate, Joi } from 'celebrate';
import { computeTransactionFee, saveFeesConfig, truncateTable } from './controllers/fees.controller';

const router = express.Router();


router.get('/', (_, res) => {
    return res.status(200).json({ message: 'Hello, welcome to my express server 💥' });
})
.post('/fees', 
    celebrate({
        body: Joi.object({
            FeeConfigurationSpec: Joi.string()
                .required()
                .messages({
                    "string.empty": "FeeConfigurationSpec is required.",
                })
            
        })
    }),
    async (req, res) => await saveFeesConfig(req, res)
)
.post('/compute-transaction-fee', 
    celebrate({
        body: Joi.object({
            ID: Joi.number()
                .required()
                .messages({
                    "string.empty": "The unique id of the transaction is required.",
                }),
            Amount: Joi.number()
                    .min(0)
                    .required()
                    .messages({
                        "string.empty": "The transaction amount is required.",
                        "string.number": "The transaction amount must be a number.",
                        "number.min": "The transaction amount must be a non-negative number.",
                    }),
            Currency: Joi.string()
                        .required()
                        .messages({
                            "string.empty": "The currency is required.",
                        }),
            CurrencyCountry: Joi.string()
                        .required()
                        .messages({
                            "string.empty": "The CurrencyCountry is required.",
                        }),
            Customer: Joi.object().keys({
                ID: Joi.number()
                    .required()
                    .messages({
                        "string.empty": "The id of the customer is required.",
                    }),
                EmailAddress: Joi.string()
                    .required()
                    .messages({
                        "string.empty": "The Email Address the customer is required.",
                    }),
                FullName: Joi.string()
                    .required()
                    .messages({
                        "string.empty": "The full name the customer is required.",
                    }),
                BearsFee: Joi.bool()
                    .required()
                    .messages({
                        "string.empty": "Indication whether or not the customer is set to bear the transaction cost is required.",
                    }),
            }),
            PaymentEntity: Joi.object().keys({
                ID: Joi.number()
                    .min(0)
                    .required()
                    .messages({
                        "string.empty": "The id of the entity is required.",
                    }),
                Issuer: Joi.string()
                    .required()
                    .messages({
                        "string.empty": "The issuing company / organization for the entity is required.",
                    }),
                Brand: Joi.string()
                    .required()
                    .messages({
                        "string.empty": "The  card-type  brand is required.",
                    }),
                Number: Joi.string()
                    .required()
                    .messages({
                        "string.empty": "The payment entity number (masked pan in case of credit/debit cards, bank account) is required.",
                    }),
                SixID: Joi.number()
                    .min(0)
                    .required()
                    .messages({
                        "string.empty": "The first six digits of the payment entity number is required.",
                    }),
                Type: Joi.string()
                    .required()
                    .messages({
                        "string.empty": "The type of the entity e.g. CREDIT-CARD, DEBIT-CARD, BANK-ACCOUNT, USSD is required.",
                    }),
                Country: Joi.string()
                    .required()
                    .messages({
                        "string.empty": "he issuing country of the entity is required.",
                    }),
            }),
            
        })
    }),
    async (req, res) => await computeTransactionFee(req, res)
)
.delete('/truncate', async (req, res) => truncateTable(req, res));


export default router;
