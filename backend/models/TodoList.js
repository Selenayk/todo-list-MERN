import mongoose from 'mongoose';

const todoListSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    deletedAt: { type: Date, default: null },
  },
  { timestamps: true, collection: 'todo_lists' }
);

const TodoList = mongoose.model('TodoList', todoListSchema);

export default TodoList;
