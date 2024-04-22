import { StateCreator, create } from "zustand";
import { Task, TaskStatus } from "../../interfaces";

// interface de clave valor usando Record entonces mis tareas seran de tipo record string task
interface TaskState {
  tasks: Record<string, Task>;
  getTaskByStatus: (status: TaskStatus) => Task[];
}

const storeApi: StateCreator<TaskState> = (set, get) => ({
  tasks: {
    "ABC-1": { id: "ABC-1", title: "Task 1", status: "open" },
    "ABC-2": { id: "ABC-2", title: "Task 2", status: "in-progress" },
    "ABC-3": { id: "ABC-3", title: "Task 3", status: "open" },
    "ABC-4": { id: "ABC-4", title: "Task 4", status: "open" },
  },
  getTaskByStatus: (status: TaskStatus) => {
    const tasks = get().tasks;

    const task = tasks[status];

    // asi puedo aplicar mtodos como filter a un objeto

    console.log('tareas filtradas',Object.values(tasks).filter((task) => task.status === status))

    return Object.values(tasks).filter((task) => task.status === status);
  },
});

export const useTaskStore = create<TaskState>()(storeApi);
