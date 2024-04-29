import { FormEvent } from "react";
import { WhiteCard } from "../../components";
import { useWiddingBoundStore } from "../../stores/wedding";

export const WeddingInvitationPage = () => {
  
  const firstName = useWiddingBoundStore((state) => state.firstName);
  const lastName = useWiddingBoundStore((state) => state.lastName);
  const setFirstName = useWiddingBoundStore((state) => state.setFirstName);
  const setLastName = useWiddingBoundStore((state) => state.setLastName);

  const guestCount = useWiddingBoundStore((state) => state.guestCount);
  const setGuestCount = useWiddingBoundStore((state) => state.setGuestCount);

  const eventYYYYMMDD = useWiddingBoundStore((state) => state.eventYYYYMMDD());
  const eventHHMM = useWiddingBoundStore((state) => state.eventHHMM());
  const setEventDate = useWiddingBoundStore((state) => state.setEventDate);
  const setEventTime = useWiddingBoundStore((state) => state.setEventTime);

  const isConfirmed = useWiddingBoundStore((state) => state.isConfirmed);
  const setIsConfirmed = useWiddingBoundStore((state) => state.setIsConfirmed);
  const eventDate = useWiddingBoundStore((state) => state.eventDate);


  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    console.log({firstName, lastName, guestCount, eventDate, isConfirmed});
    
  }
  return (
    <>
      <h1>Invitación de Boda</h1>
      <p>Zustand segmentado en slices</p>
      <hr />

      <WhiteCard className="flex items-center justify-center p-12">
        <div className="mx-auto w-full max-w-[550px]">
          <form onSubmit={onSubmit}>
            <div className="-mx-3 flex flex-wrap">
              <div className="w-full px-3 sm:w-1/2">
                <div className="mb-5">
                  <label className="mb-3 block text-base font-medium text-[#07074D]">
                    Primer Nombre
                  </label>

                  <input
                    type="text"
                    name="firstName"
                    id="firstName"
                    placeholder="Primer Nombre"
                    onChange={(e) => setFirstName(e.target.value)}
                  />

                  {firstName}
                </div>
              </div>
              <div className="w-full px-3 sm:w-1/2">
                <div className="mb-5">
                  <label className="mb-3 block text-base font-medium text-[#07074D]">
                    Apellido
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    id="lastName"
                    placeholder="Apellido"
                    onChange={(e) => setLastName(e.target.value)}
                  />
                  {lastName}
                </div>
              </div>
            </div>
            <div className="mb-5">
              <label className="mb-3 block text-base font-medium text-[#07074D]">
                ¿Cuántos invitados traerá?
              </label>
              <input
                type="number"
                name="guestNumber"
                id="guestNumber"
                placeholder="5"
                value={guestCount}
                min="0"
                className="w-full appearance-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                onChange={(e) => setGuestCount(+e.target.value)}
              />
            </div>

            <div className="-mx-3 flex flex-wrap">
              <div className="w-full px-3 sm:w-1/2">
                <div className="mb-5">
                  <label className="mb-3 block text-base font-medium text-[#07074D]">
                    Fecha de evento
                  </label>
                  <input
                    type="date"
                    name="eventDate"
                    id="eventDate"
                    value={eventYYYYMMDD}
                    onChange={(e) => setEventDate(e.target.value)}
                  />
                </div>
              </div>
              <div className="w-full px-3 sm:w-1/2">
                <div className="mb-5">
                  <label className="mb-3 block text-base font-medium text-[#07074D]">
                    Hora del evento
                  </label>
                  <input
                    type="time"
                    name="eventTime"
                    id="eventTime"
                    value={eventHHMM}
                    onChange={(e) => setEventTime(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="mb-5">
              <label className="mb-3 block text-base font-medium text-[#07074D]">
                ¿Tu también vendrás?
              </label>
              <div className="flex items-center space-x-6">
                <div className="flex items-center">
                  <input
                    type="radio"
                    name="isComing"
                    id="radioButton1"
                    className="h-5 w-5"
                    checked={isConfirmed}
                    onChange={() => setIsConfirmed(true)}
                  />
                  <label className="pl-3 text-base font-medium text-[#07074D]">
                    Si
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="radio"
                    name="isComing"
                    id="radioButton2"
                    className="h-5 w-5"
                    checked={!isConfirmed}
                    onChange={() => setIsConfirmed(false)}
                  />
                  <label className="pl-3 text-base font-medium text-[#07074D]">
                    No
                  </label>
                </div>
              </div>
            </div>

            <div>
              <button type="submit">Enviar</button>
            </div>
          </form>
        </div>
      </WhiteCard>
    </>
  );
};
