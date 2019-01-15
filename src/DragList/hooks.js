import { useHammerHandler } from "src/hooks";

export const useDragReleaseEffect = (insertion, setInsertion) =>
  useHammerHandler({
    enable: !!insertion,
    event: "panmove pressup",
    handler: ev => console.log(0, ev, insertion, setInsertion)
  });

export const usePickItemEffect = (index, list, insertion, setInsertion) =>
  useHammerHandler({
    enable: !insertion,
    event: "press",
    handler: ev => console.log(1, ev, index, insertion, setInsertion)
  });

export const usePickInsertionSlotEffect = (
  index,
  list,
  insertion,
  setInsertion
) =>
  useHammerHandler({
    enable: !!insertion,
    event: "panmove",
    handler: ev => console.log(2, ev, index, insertion, setInsertion)
  });
