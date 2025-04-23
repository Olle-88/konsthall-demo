// types/df-messenger.d.ts
import * as React from "react";

// Här augmenterar vi JSX så att TS vet att <df-messenger> är giltigt
declare global {
  namespace JSX {
    interface IntrinsicElements {
      /** Dialogflow Messenger web component */
      "df-messenger": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
    }
  }
}
