import { create } from "zustand";
import { PersonSlice, createPersonSlice } from "./person.slice";
import { devtools, persist } from "zustand/middleware";
import { GuestSlice, createGuestSlice } from "./guest.slice";
import { DateSlice, createDateSlice } from "./date.slice";

type ShareState = PersonSlice & GuestSlice & DateSlice

export const useWiddingBoundStore = create<ShareState>()(
  devtools(
    persist(
      (...a) => ({
        ...createPersonSlice(...a),
        ...createGuestSlice(...a),
        ...createDateSlice(...a)
      }),
      { name: "widding" }
    )
  )
);
function createDataSlice(arg0: (() => ShareState) | (Omit<Omit<import("zustand").StoreApi<ShareState>, "setState"> & { setState<A extends string | { type: string; }>(partial: ShareState | Partial<ShareState> | ((state: ShareState) => ShareState | Partial<ShareState>), replace?: boolean | undefined, action?: A | undefined): void; }, "persist"> & { persist: { setOptions: (options: Partial<import("zustand/middleware").PersistOptions<ShareState, unknown>>) => void; clearStorage: () => void; rehydrate: () => void | Promise<void>; hasHydrated: () => boolean; onHydrate: (fn: (state: ShareState) => void) => () => void; onFinishHydration: (fn: (state: ShareState) => void) => () => void; getOptions: () => Partial<import("zustand/middleware").PersistOptions<ShareState, unknown>>; }; }) | (<A extends string | { type: string; }>(partial: ShareState | Partial<ShareState> | ((state: ShareState) => ShareState | Partial<ShareState>), replace?: boolean | undefined, action?: A | undefined) => void)): ShareState {
    throw new Error("Function not implemented.");
}

