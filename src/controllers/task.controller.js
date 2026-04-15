import Task from "../models/task.model.js";

// CREATE
export const createTask = async (req, res) => {
  try {
    const task = await Task.create({
      ...req.body,
      userId: req.user.id,
    });

    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ msg: "Error creating task" });
  }
};

// GET ALL (only user's tasks)
export const getTasks = async (req, res) => {
  const tasks = await Task.find({ userId: req.user.id });
  res.json(tasks);
};

// GET ONE
export const getTask = async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!task || task.userId !== req.user.id) {
    return res.status(403).json({ msg: "Forbidden" });
  }

  res.json(task);
};

// UPDATE
export const updateTask = async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!task || task.userId !== req.user.id) {
    return res.status(403).json({ msg: "Forbidden" });
  }

  Object.assign(task, req.body);
  await task.save();

  res.json(task);
};

// DELETE
export const deleteTask = async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!task || task.userId !== req.user.id) {
    return res.status(403).json({ msg: "Forbidden" });
  }

  await task.deleteOne();

  res.json({ msg: "Task deleted" });
};
