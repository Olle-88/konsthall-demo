// global.d.ts
import * as React from "react"

// Augment JSX so TS knows about <df-messenger>:
declare global {
  namespace JSX {
    interface IntrinsicElements {
      /** Dialogflow Messenger web component */
      "df-messenger": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >
    }
  }
}
