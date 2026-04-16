import Task from "../models/task.model.js";
import { cancelReminder, scheduleReminder } from "../utils/reminder.js";
import { sendWebhook } from "../utils/webhook.js";

// CREATE
export const createTask = async (req, res) => {
  try {
    const task = await Task.create({
      ...req.body,
      userId: req.user.id,
    });

    // schedule reminder
    if (task.status !== "completed") {
      scheduleReminder(task);
    }

    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ msg: "Error creating task" });
  }
};

// GET ALL (only user's tasks)
export const getTasks = async (req, res) => {
  const { category, tag } = req.query;

  let filter = { userId: req.user.id };

  if (category) filter.category = category;
  if (tag) filter.tags = tag;

  const tasks = await Task.find(filter);

  res.json(tasks);
};

// GET ONE
export const getTask = async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    return res.status(404).json({ msg: "Task not found" });
  }

  if (task.userId !== req.user.id) {
    return res.status(403).json({ msg: "Forbidden" });
  }

  res.json(task);
};

// UPDATE
export const updateTask = async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    return res.status(404).json({ msg: "Task not found" });
  }

  if (task.userId !== req.user.id) {
    return res.status(403).json({ msg: "Forbidden" });
  }

  // cancel old reminder
  cancelReminder(task._id.toString());

  const prevStatus = task.status;

  Object.assign(task, req.body);
  await task.save();

  // schedule new reminder
  if (task.status !== "completed") {
    scheduleReminder(task);
  }

  // webhook if completed
  if (req.body.status === "completed" && prevStatus !== "completed") {
    sendWebhook({
      taskId: task._id,
      title: task.title,
      userId: req.user.id,
      completedAt: new Date(),
    });
  }

  res.json(task);
};

// DELETE
export const deleteTask = async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    return res.status(404).json({ msg: "Task not found" });
  }

  if (task.userId !== req.user.id) {
    return res.status(403).json({ msg: "Forbidden" });
  }

  // cancel reminder
  cancelReminder(task._id.toString());

  await task.deleteOne();

  res.json({ msg: "Task deleted" });
};
