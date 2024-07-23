import express from 'express';

import {
  createTodoListController,
  deleteTodoListController,
  updateTodoListController,
  getTodoItemsController,
  getTodoListsController,
} from '../controllers/TodoListController.js';

const router = express.Router();

// Create a new Todo List
router.post('/lists', createTodoListController);

// Get all Todo Lists for a user
router.get('/lists', getTodoListsController);

// Get Items for a Todo List
router.get('/lists/:listId/items', getTodoItemsController);

// Update a Todo List
router.patch('/lists/:listId', updateTodoListController);

// Delete a ToDo
router.delete('/lists/:id', deleteTodoListController);

export default router;
