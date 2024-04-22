import { JiraTasks } from '../../components';
import { useTaskStore } from '../../stores';

export const JiraPage = () => {

  const task = useTaskStore(state => state.tasks)
  const pendingTask = useTaskStore(state => state.getTaskByStatus('open'))
  const inProgressTask = useTaskStore(state => state.getTaskByStatus('in-progress'))
  const doneTask = useTaskStore(state => state.getTaskByStatus('done'))

  console.log('task', task)
  return (
    <>
      <h1>Tareas</h1>
      <p>Manejo de estado con objectos de Zustand</p>
      <hr />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          <JiraTasks title='Pendientes' value='pending' />
          
          <JiraTasks title='Avanzando' value='in-progress' />
          
          <JiraTasks title='Terminadas' value='done' />

      </div>

      



    </>
  );
};