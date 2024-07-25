import TodoList from '../models/TodoList.js';
import TodoItem from '../models/TodoItem.js';

// Create a new Todo Item
const createTodoItemController = async (req, res) => {
  try {
    const { title, dueDate } = req.body;
    const { listId } = req.params;

    const userId = req.user.id;

    const todoList = await TodoList.exists({ _id: listId, user: userId });
    if (!todoList) {
      return res.status(404).json({ message: 'List Not Found!' });
    }

    const newTodoItem = await TodoItem.create({
      title,
      dueDate,
      list: listId,
    });

    res.status(201).json({
      message: 'ToDoItem created successfully!',
      toDoItem: newTodoItem,
    });
  } catch (error) {
    console.log({ error });
    res.status(500).json({ message: 'An error occurred!', error });
  }
};

// Update a Todo Item
const updateTodoItemController = async (req, res) => {
  try {
    const { listItemId } = req.params;
    const { title, dueDate, completed, newListId } = req.body;

    const _todoItem = await TodoItem.findById(listItemId);
    if (!_todoItem) {
      return res.status(404).json({ message: 'Todo Item Not Found!' });
    }

    const updates = {};
    if (title) updates.title = title;
    if (dueDate) updates.dueDate = dueDate;
    if (typeof completed !== 'undefined') updates.completed = completed;

    if (newListId && newListId !== _todoItem.list.toString()) {
      const newList = await TodoList.findById(newListId);
      if (!newList) {
        return res.status(404).json({ message: 'New Todo List Not Found!' });
      }

      await Promise.all([
        TodoList.findByIdAndUpdate(_todoItem.list, {
          $pull: { items: listItemId },
        }),
        TodoList.findByIdAndUpdate(newListId, { $push: { items: listItemId } }),
      ]);

      _todoItem.list = newListId;
    }

    Object.assign(_todoItem, updates);
    const updatedTodoItem = await _todoItem.save();

    res.status(200).json({
      message: 'Todo Item Updated Successfully!',
      updatedTodoItem,
    });
  } catch (error) {
    console.log({ error });
    res
      .status(500)
      .json({ message: 'An error occurred while updating ToDoItem.', error });
  }
};

// Delete a Todo Item
const deleteTodoItemController = async (req, res) => {
  try {
    const { listId, listItemId } = req.params;

    const todoItem = await TodoItem.findById(listItemId);
    if (!todoItem) {
      return res.status(404).json();
    }

    const updatedTodoList = await TodoList.findByIdAndUpdate(
      listId,
      { $pull: { items: listItemId } },
      { new: true }
    );

    if (!updatedTodoList) {
      return res.status(404).json({ message: 'To-Do List not found!' });
    }

    await TodoItem.findByIdAndDelete(listItemId);

    res.status(200).json({ message: 'Todo Item deleted successfully!' });
  } catch (error) {
    console.log({ error });
    res
      .status(500)
      .json({ message: 'An error occurred while deleting ToDoItem.', error });
  }
};

export {
  createTodoItemController,
  updateTodoItemController,
  deleteTodoItemController,
};
