// global.d.ts
import * as React from "react";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      /**
       * Dialogflow Messenger custom element.
       * Tar emot vanliga HTML-attribut.
       */
      "df-messenger": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
    }
  }
}
