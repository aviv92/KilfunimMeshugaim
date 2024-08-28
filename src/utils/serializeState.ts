import { usePlayerStore } from "../stores/usePlayerStore";

export const serializeState = (): string => {
  const state = usePlayerStore.getState();
  const serializedState = JSON.stringify(state);
  return btoa(serializedState);
};

export const deserializeState = (serializedState: string) => {
  try {
    const state = JSON.parse(atob(serializedState));
    usePlayerStore.setState(state);
  } catch (error) {
    console.error("Failed to deserialize state", error);
  }
};

export const generateShareableLink = (): string => {
  const serializedState = serializeState();
  const baseUrl = window.location.origin;
  return `${baseUrl}/KilfunimMeshugaim/?data=${serializedState}`;
};

export const isReadOnlyMode = (): boolean => {
  const params = new URLSearchParams(window.location.search);
  return params.has("data");
};
