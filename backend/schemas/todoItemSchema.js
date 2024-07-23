import Joi from 'joi';

const createTodoItemSchema = Joi.object({
  title: Joi.string().required(),
  dueDate: Joi.date().optional(),
});

const updateTodoItemSchema = Joi.object({
  title: Joi.string().optional,
  dueDate: Joi.date().optional(),
  completed: Joi.date().optional(),
  newListId: Joi.string().optional(),
});

export { createTodoItemSchema, updateTodoItemSchema };
