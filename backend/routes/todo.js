import express from 'express';

import {
  createTodoListController,
  deleteTodoListController,
  updateTodoListController,
  getTodoItemsController,
  getTodoListsController,
  getTodoListByIdController,
} from '../controllers/TodoListController.js';
import {
  createTodoListSchema,
  updateTodoListSchema,
} from '../schemas/todoListSchema.js';
import validateRequest from '../middlewares/validateRequest.js';

const router = express.Router();

// Create a new Todo List
router.post(
  '/lists',
  validateRequest(createTodoListSchema),
  createTodoListController
);

// Get all Todo Lists for a user
router.get('/lists', getTodoListsController);

// Get Items for a Todo List
router.get('/lists/:listId/items', getTodoItemsController);

//Get One List
router.get('/lists/:listId', getTodoListByIdController);

// Update a Todo List
router.patch(
  '/lists/:listId',
  validateRequest(updateTodoListSchema),
  updateTodoListController
);

// Delete a Todo List
router.delete('/lists/:listId', deleteTodoListController);

export default router;
