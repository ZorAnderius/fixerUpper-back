import Joi from 'joi';

const updateCartItemsSchema = Joi.object({
  quantity: Joi.number().integer().required().messages({
    'number.base': `"quantity" should be a type of 'number'`,
    'number.integer': `"quantity" must be an integer`,
    'any.required': `"quantity" is a required field`,
  }),
});

export default updateCartItemsSchema;
