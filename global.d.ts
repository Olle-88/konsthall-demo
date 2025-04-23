// global.d.ts

// Ingen import behövs här – TS läser in alla *.d.ts som ligger under include-glob
declare namespace JSX {
    interface IntrinsicElements {
      // Vi deklarerar df-messenger som en "any"-tagg
      "df-messenger": any
    }
  }
  