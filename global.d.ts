// global.d.ts
import * as React from "react";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      /**
       * Dialogflow Messenger web component
       * Accepts all standard HTML attributes.
       */
      "df-messenger": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
    }
  }
}

// this makes it a module and prevents global scope leakage
export {};
