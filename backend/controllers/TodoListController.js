import mongoose from 'mongoose';
import TodoItem from '../models/TodoItem.js';
import TodoList from '../models/TodoList.js';
import User from '../models/User.js';

// Create a new TodoList
const createTodoListController = async (req, res) => {
  try {
    const { title, description, items = [] } = req.body;
    const userId = req.user.id;

    const newToDo = new TodoList({
      title,
      description,
      user: userId,
    });

    const savedToDo = await newToDo.save();

    await User.findByIdAndUpdate(
      userId,
      { $push: { todos: savedToDo._id } },
      { new: true }
    );

    res.status(201).json({ message: 'To-Do List Created!', savedToDo });
  } catch (error) {
    console.log({ error });
    res.status(500).json({ message: 'An error occurred!', error });
  }
};

// Get all Todo Lists for a user
const getTodoListsController = async (req, res) => {
  try {
    const todoLists = await TodoList.find({
      user: req.user.id,
      deletedAt: null,
    });
    res.status(200).json(todoLists);
  } catch (error) {
    console.log({ error });
    res.status(500).json({ message: 'An error occurred', error });
  }
};

// Update a Todo List
const updateTodoListController = async (req, res) => {
  try {
    const { listId } = req.params;
    const { title, description } = req.body;

    const todoList = await TodoList.findById(listId);
    if (!todoList) {
      return res.status(404).json({ message: 'Todo List Not Found!' });
    }

    const updates = {};
    if (title) updates.title = title;
    if (description) updates.description = description;

    Object.assign(todoList, updates);
    const updatedList = await todoList.save();

    res
      .status(200)
      .json({ message: 'Todo List Updated Successfully!', updatedList });
  } catch (error) {
    console.log({ error });
    res
      .status(500)
      .json({ message: 'An error occurred while updating Todo List.', error });
  }
};

// Delete a Todo List
const deleteTodoListController = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { listId } = req.params;
    if (!listId) {
      await session.abortTransaction();
      return res.status(404).json({ message: 'List not found', error });
    }

    const todoList = await TodoList.findById(listId).session(session);
    if (!todoList) {
      await session.abortTransaction();
      return res.status(404).json({ message: 'Todo List not found' });
    }

    await TodoList.findByIdAndUpdate(listId, { deletedAt: new Date() }).session(
      session
    );
    await TodoItem.updateMany(
      { list: listId },
      { deletedAt: new Date() }
    ).session(session);

    await session.commitTransaction();

    res.status(200).json({ message: 'Todo List deleted successfully!' });
  } catch (error) {
    await session.abortTransaction();
    res
      .status(500)
      .json({ message: 'An error occurred while deleting ToDo.', error });
  } finally {
    session.endSession();
  }
};

const getTodoItemsController = async (req, res) => {
  try {
    const { listId } = req.params;
    if (!listId) {
      return res.status(404).json();
    }
    const list = await TodoList.exists({ _id: listId });
    if (!list) {
      return res.status(404).json();
    }
    const todoItems = await TodoItem.find({ list: listId, deletedAt: null });
    return res.status(200).json(todoItems);
  } catch (error) {
    console.log({ error });
    res.status(500).json({ message: 'An error occured!', error });
  }
};

export {
  createTodoListController,
  getTodoListsController,
  updateTodoListController,
  deleteTodoListController,
  getTodoItemsController,
};
