import { useRef, useEffect } from "react";
import Hammer from "hammerjs";

export const useHammerHandler = ({ enable, event, handler }) => {
  const ref = useRef(null);
  let hammer = null;
  let context = null;

  useEffect(
    () => {
      hammer = new Hammer(ref.current);
      hammer.get("pan").set({ direction: Hammer.DIRECTION_ALL });
      return () => hammer.destroy();
    },
    [ref.current]
  );

  useEffect(
    () => {
      if (hammer && event && handler) {
        hammer.set({ enable, touchAction: enable ? "compute" : "auto" });
        hammer.on(event, ev => {
          const resultContext = handler(ev, context);
          if (typeof resultContext !== "undefined") {
            context = resultContext;
          }
        });
      }

      return () => hammer && hammer.set({ enable: false, touchAction: "auto" });
    },
    [enable, event, handler]
  );

  return ref;
};
