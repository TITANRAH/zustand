import { StateCreator, create } from "zustand";
import { Task, TaskStatus } from "../../interfaces";
// import { devtools } from "zustand/middleware";
import { v4 as uuidV4 } from "uuid";
// import { produce } from "immer";
import { immer } from "zustand/middleware/immer";
import { devtools, persist } from "zustand/middleware";

// interface de clave valor usando Record entonces mis tareas seran de tipo record string task
interface TaskState {
  draggingTaskId?: string;
  tasks: Record<string, Task>;
  getTaskByStatus: (status: TaskStatus) => Task[];
  addTask: (title: string, status: TaskStatus) => void;
  setDraggingTaskId: (taskId: string) => void;
  removeDraggingTaskId: () => void;
  changeTaskStatus: (taskId: string, status: TaskStatus) => void;
  onTaskDrop: (status: TaskStatus) => void;
}

const storeApi: StateCreator<TaskState, [["zustand/immer", never]]> = (
  set,
  get
) => ({
  draggingTaskId: undefined,
  tasks: {
    "ABC-1": { id: "ABC-1", title: "Task 1", status: "open" },
    "ABC-2": { id: "ABC-2", title: "Task 2", status: "in-progress" },
    "ABC-3": { id: "ABC-3", title: "Task 3", status: "open" },
    "ABC-4": { id: "ABC-4", title: "Task 4", status: "open" },
  },
  getTaskByStatus: (status: TaskStatus) => {
    const tasks = get().tasks;

    // const task = tasks[status];

    // asi puedo aplicar mtodos como filter a un objeto

    console.log(
      "tareas filtradas",
      Object.values(tasks).filter((task) => task.status === status)
    );

    return Object.values(tasks).filter((task) => task.status === status);
  },

  addTask: (title: string, status: TaskStatus) => {
    const newTask = { id: uuidV4(), title, status };

    // middleware de immer propio de zustand mejor este
    set((state) => {
      state.tasks[newTask.id] = newTask;
    });

    // npm i immer
    // ESTE PRODUCE HACE LO MISMO QUE LO DE ABAHO SOLO QUE INSTANALNDO IMMER
    // set( produce( (state: TaskState) => {
    //   state.tasks[newTask.id] = newTask
    // }))

    // forma nativa
    // set((state) => ({
    //   // destructura del state y sl state contiene tasks:
    //   tasks: {
    //     ...state.tasks,
    //     // como las tareas son llave valor le paso el id y la llave es el id la uso asi

    //     [newTask.id]: newTask,
    //   },
    // }));
  },

  setDraggingTaskId: (taskId: string) => {
    set({ draggingTaskId: taskId });
  },

  removeDraggingTaskId: () => {
    set({ draggingTaskId: undefined });
  },

  changeTaskStatus: (taskId: string, status: TaskStatus) => {
    // aqui tengo la tarea dinamica
    // si uso middleware de immer que es para mutar estados deberia hacerlo asi
    const task = { ...get().tasks[taskId] };
    task.status = status;

    // al mutar un estado como en este caso agregando mas tareas
    // puedo usar immer
    // set((state) => ({
    //   tasks: {
    //     ...state.tasks,
    //     [taskId]: task,
    //   },
    // }));

    set((state) => {
      state.tasks[taskId] = {
        ...task,
      };
    });

    // set((state) => ({
    //   tasks: {
    //     ...state.tasks,
    //     [taskId]: task,
    //   },
    // }));
  },

  onTaskDrop: (status: TaskStatus) => {
    const taskId = get().draggingTaskId;

    if (!taskId) return;

    get().changeTaskStatus(taskId, status);
    get().removeDraggingTaskId();
  },
});

export const useTaskStore = create<TaskState>()(
  devtools(persist(immer(storeApi), { name: "task-store" }))
);
