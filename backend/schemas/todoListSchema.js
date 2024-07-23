import Joi from 'joi';

const createTodoListSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
});

const updateTodoListSchema = Joi.object({
  title: Joi.string().optional(),
  description: Joi.string().optional(),
});

export { createTodoListSchema, updateTodoListSchema };
