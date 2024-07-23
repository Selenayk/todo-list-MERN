import express from 'express';
import {
  createTodoItemController,
  updateTodoItemController,
  deleteTodoItemController,
} from '../controllers/TodoItemController.js';
import {
  createTodoItemSchema,
  updateTodoItemSchema,
} from '../schemas/todoItemSchema.js';
import validateRequest from '../middlewares/validateRequest.js';

const router = express.Router();

// Create an item to a Todo List
router.post(
  '/lists/:listId/items',
  validateRequest(createTodoItemSchema),
  createTodoItemController
);

// Update a ToDoItem
router.patch(
  '/lists/:listId/items/:listItemId',
  validateRequest(updateTodoItemSchema),
  updateTodoItemController
);

// Delete a ToDoItem
router.delete('/lists/:listId/items/:listItemId', deleteTodoItemController);

export default router;
