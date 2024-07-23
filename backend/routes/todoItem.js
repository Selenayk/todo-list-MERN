import express from 'express';
import {
  createTodoItemController,
  updateTodoItemController,
  deleteTodoItemController,
} from '../controllers/TodoItemController.js';

const router = express.Router();

// Create an item to a Todo List
router.post('/lists/:listId/items', createTodoItemController);

// Update a ToDoItem
router.patch('/lists/:listId/items/:listItemId', updateTodoItemController);

// Delete a ToDoItem
router.delete('/lists/:listId/items/:listItemId', deleteTodoItemController);

export default router;
