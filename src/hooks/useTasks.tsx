import { DragEvent, useState } from "react";
import Swal from "sweetalert2";
import { useTaskStore } from "../stores";
import { TaskStatus } from "../interfaces";


interface Options {
    status: TaskStatus
}

export const useTasks = ({status}: Options) => {

    const isDragging = useTaskStore((state) => !!state.draggingTaskId);
    const onTaskDrop = useTaskStore((state) => state.onTaskDrop);
    const addTask = useTaskStore((state) => state.addTask);
    const [ondragOver, setOnDragOver] = useState(false);
  
    console.log({ isDragging });
  
    const handleAddTask = async() => {
  
     const {isConfirmed, value} = await Swal.fire({
      title: 'Nueva tarea',
      input: 'text',
      inputLabel: 'Nombre de la tarea',
      inputPlaceholder: 'Ingrese el nombre de la tarea',
      showCancelButton: true, 
      inputValidator: (value) => {
        if (!value) {
          return 'Debe ingresar un nombre para la tarea'
        }
      }
     })
  
     if(!isConfirmed) return;
      addTask(value, status)
    }
  
    const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
      event?.preventDefault();
      setOnDragOver(true);
    };
    const handleDragLeave = (event: DragEvent<HTMLDivElement>) => {
      event?.preventDefault();
      setOnDragOver(false);
    };
    const handleDrop = (event: DragEvent<HTMLDivElement>) => {
      event?.preventDefault();
      console.log("handleDrop", status);
      setOnDragOver(false);
      onTaskDrop(status);
    };


    return {
        isDragging,
        ondragOver,
        handleAddTask,
        handleDragOver,
        handleDragLeave,
        handleDrop
    }
  
}