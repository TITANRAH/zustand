import {
  IoAccessibilityOutline,
  IoHeartOutline,
  IoInformationOutline,
  IoListOutline,
  IoLockClosedOutline,
  IoPawOutline,
} from "react-icons/io5";
import { WhiteCard } from "../../components";
import { useAuthStore, useBearStore, useTaskStore, userPersonStore } from "../../stores";
import RequestInfo from "../../components/shared/request-info/RequestInfo";

export const Dashboard = () => {
  const totalBears = useBearStore((state) => state.computed!.totalBears);
  const firstName = userPersonStore((state) => state.firstName);
  const tasks = useTaskStore((state) => state.tasks);
  const userName = useAuthStore((state) => state.user?.fullName ?? 'No user');

  // como es un record <llave: valor> los pasamos a object.keys
  const taskCount = Object.keys(tasks!).length;

  return (
    <>
      <h1>Dashboard</h1>
      <p>Información colectiva de varios stores de Zustand</p>
      <hr />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        <WhiteCard centered>
          <IoPawOutline size={50} className="text-indigo-600" />
          <h2>{totalBears}</h2>
          <p>Información</p>
        </WhiteCard>

        <WhiteCard centered>
          <IoAccessibilityOutline size={50} className="text-indigo-600" />
          <h2>Persona</h2>
          <p>{firstName}</p>
        </WhiteCard>

        <WhiteCard centered>
          <IoListOutline size={50} className="text-indigo-600" />
          <h2>Tareas</h2>
          <p>{taskCount}</p>
        </WhiteCard>

        <WhiteCard centered>
          <IoHeartOutline size={50} className="text-indigo-600" />
          <h2>Boda</h2>
          <p>Información</p>
        </WhiteCard>

        <WhiteCard centered>
          <IoLockClosedOutline size={50} className="text-indigo-600" />
          <h2>Auth</h2>
          <p>{userName}</p>
        </WhiteCard>

        <WhiteCard centered>
          <IoInformationOutline size={50} className="text-indigo-600" />
          <RequestInfo/>
        </WhiteCard>
      </div>
    </>
  );
};

