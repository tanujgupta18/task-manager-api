const reminders = new Map();

export const scheduleReminder = (task) => {
  if (!task.dueDate) return;

  const delay = new Date(task.dueDate).getTime() - Date.now() - 3600000;

  if (delay <= 0) return;

  const timeout = setTimeout(() => {
    console.log(`Reminder: Task "${task.title}" is due soon!`);
  }, delay);

  reminders.set(task._id.toString(), timeout);
};

export const cancelReminder = (taskId) => {
  const timeout = reminders.get(taskId);
  if (timeout) {
    clearTimeout(timeout);
    reminders.delete(taskId);
  }
};
