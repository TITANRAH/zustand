import { useShallow } from "zustand/react/shallow";
import { WhiteCard } from "../../components";
import { useBearStore } from "../../stores";

export const BearPage = () => {
  return (
    <>
      <h1>Contador de Osos</h1>
      <p>Manejo de estado simple de Zustand</p>
      <hr />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
        <BlacBears />
        <PandaBears />
        <PolarBears />

        <BearsDisplay />
      </div>
    </>
  );
};

function BlacBears() {
  const blackBears = useBearStore((state) => state.blackBears);
  const increaseBlackBears = useBearStore((state) => state.increaseBlackBears);
  return (
    <WhiteCard centered>
      <h2>Osos Negros</h2>

      <div className="flex flex-col md:flex-row">
        <button onClick={() => increaseBlackBears(+1)}> +1</button>
        <span className="text-3xl mx-2 lg:mx-10"> {blackBears} </span>
        <button onClick={() => increaseBlackBears(-1)}> -1</button>
      </div>
    </WhiteCard>
  );
}

function PandaBears() {
  const blackBears = useBearStore((state) => state.pandaBears);
  const increaseBlackBears = useBearStore((state) => state.increasePandaBears);
  return (
    <WhiteCard centered>
      <h2>Osos Panda</h2>

      <div className="flex flex-col md:flex-row">
        <button onClick={() => increaseBlackBears(+1)}> +1</button>
        <span className="text-3xl mx-2 lg:mx-10"> {blackBears} </span>
        <button onClick={() => increaseBlackBears(-1)}> -1</button>
      </div>
    </WhiteCard>
  );
}
function PolarBears() {
  const blackBears = useBearStore((state) => state.polarBears);
  const increaseBlackBears = useBearStore((state) => state.increasePolarBears);
  return (
    <WhiteCard centered>
      <h2>Osos Panda</h2>

      <div className="flex flex-col md:flex-row">
        <button onClick={() => increaseBlackBears(+1)}> +1</button>
        <span className="text-3xl mx-2 lg:mx-10"> {blackBears} </span>
        <button onClick={() => increaseBlackBears(-1)}> -1</button>
      </div>
    </WhiteCard>
  );
}

function BearsDisplay() {

  // useShallow revisa si algo cambio en el state, si no cambio nada en ningun oso no rendirazara 
  // si cambio algo si renderizara
  const bears = useBearStore(useShallow((state) => state.bears));
  const doNothing = useBearStore((state) => state.doNothing);
  const addBear = useBearStore((state) => state.addBear);
  const clearBear = useBearStore((state) => state.clearBear);
  return (
    <WhiteCard >
      <h1>Osos</h1>

      <div className="flex flex-col gap-y-2 mt-3">

      <button onClick={doNothing}>Do Nothing</button>
      <button onClick={addBear}>Add Bears</button>
      <button onClick={clearBear}>Clear Bears</button>
      </div>

      <pre>{JSON.stringify(bears, null, 2)}</pre>
    </WhiteCard>
  );
}
