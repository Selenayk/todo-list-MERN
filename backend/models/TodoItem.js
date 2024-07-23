import mongoose, { mongo } from 'mongoose';

const todoItemSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    dueDate: { type: Date, default: null },
    completed: { type: Boolean, default: false },
    list: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'TodoList',
      required: true,
    },
    deletedAt: { type: Date, default: null },
  },
  { timestamps: true, collection: 'todo_items' }
);

const TodoItem = mongoose.model('TodoItem', todoItemSchema);

export default TodoItem;
