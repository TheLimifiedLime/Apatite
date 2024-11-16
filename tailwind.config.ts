import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{html,js,svelte,ts}"],

  theme: {
    // Use Material Design 3 colors, breakpoints, and spacing
    colors: {
      primary: "rgb(var(--m3-scheme-primary) / <alpha-value>)",
      "on-primary": "rgb(var(--m3-scheme-on-primary) / <alpha-value>)",
      "primary-container":
        "rgb(var(--m3-scheme-primary-container) / <alpha-value>)",
      "on-primary-container":
        "rgb(var(--m3-scheme-on-primary-container) / <alpha-value>)",
      secondary: "rgb(var(--m3-scheme-secondary) / <alpha-value>)",
      "on-secondary": "rgb(var(--m3-scheme-on-secondary) / <alpha-value>)",
      "secondary-container":
        "rgb(var(--m3-scheme-secondary-container) / <alpha-value>)",
      "on-secondary-container":
        "rgb(var(--m3-scheme-on-secondary-container) / <alpha-value>)",
      tertiary: "rgb(var(--m3-scheme-tertiary) / <alpha-value>)",
      "on-tertiary": "rgb(var(--m3-scheme-on-tertiary) / <alpha-value>)",
      "tertiary-container":
        "rgb(var(--m3-scheme-tertiary-container) / <alpha-value>)",
      "on-tertiary-container":
        "rgb(var(--m3-scheme-on-tertiary-container) / <alpha-value>)",
      error: "rgb(var(--m3-scheme-error) / <alpha-value>)",
      "on-error": "rgb(var(--m3-scheme-on-error) / <alpha-value>)",
      "error-container":
        "rgb(var(--m3-scheme-error-container) / <alpha-value>)",
      "on-error-container":
        "rgb(var(--m3-scheme-on-error-container) / <alpha-value>)",
      background: "rgb(var(--m3-scheme-background) / <alpha-value>)",
      "on-background": "rgb(var(--m3-scheme-on-background) / <alpha-value>)",
      surface: "rgb(var(--m3-scheme-surface) / <alpha-value>)",
      "on-surface": "rgb(var(--m3-scheme-on-surface) / <alpha-value>)",
      "surface-variant":
        "rgb(var(--m3-scheme-surface-variant) / <alpha-value>)",
      "on-surface-variant":
        "rgb(var(--m3-scheme-on-surface-variant) / <alpha-value>)",
      outline: "rgb(var(--m3-scheme-outline) / <alpha-value>)",
      "outline-variant":
        "rgb(var(--m3-scheme-outline-variant) / <alpha-value>)",
      shadow: "rgb(var(--m3-scheme-shadow) / <alpha-value>)",
      scrim: "rgb(var(--m3-scheme-scrim) / <alpha-value>)",
      "inverse-surface":
        "rgb(var(--m3-scheme-inverse-surface) / <alpha-value>)",
      "inverse-on-surface":
        "rgb(var(--m3-scheme-inverse-on-surface) / <alpha-value>)",
      "inverse-primary":
        "rgb(var(--m3-scheme-inverse-primary) / <alpha-value>)",
      "surface-bright": "rgb(var(--m3-scheme-surface-bright) / <alpha-value>)",
      "surface-container":
        "rgb(var(--m3-scheme-surface-container) / <alpha-value>)",
      "surface-container-high":
        "rgb(var(--m3-scheme-surface-container-high) / <alpha-value>)",
      "surface-container-highest":
        "rgb(var(--m3-scheme-surface-container-highest) / <alpha-value>)",
      "surface-container-low":
        "rgb(var(--m3-scheme-surface-container-low) / <alpha-value>)",
      "surface-container-lowest":
        "rgb(var(--m3-scheme-surface-container-lowest) / <alpha-value>)",
      "surface-dim": "rgb(var(--m3-scheme-surface-dim) / <alpha-value>)",
      "surface-tint": "rgb(var(--m3-scheme-surface-tint) / <alpha-value>)",
    },
    screens: {
      medium: "600px",
      expanded: "840px",
      large: "1200px",
      "extra-large": "1600px",
    },
    spacing: {
      "8": "8px",
      "16": "16px",
      "24": "24px",
      "32": "32px",
      "40": "40px",
      "48": "48px",
    },
    fontSize: {
      "display-large": [
        "57pt",
        {
          lineHeight: "64pt",
          letterSpacing: "-0.25pt",
          fontWeight: "400",
        },
      ],
      "display-medium": [
        "45pt",
        {
          lineHeight: "52pt",
          letterSpacing: "0pt",
          fontWeight: "400",
        },
      ],
      "display-small": [
        "36pt",
        {
          lineHeight: "44pt",
          letterSpacing: "0pt",
          fontWeight: "400",
        },
      ],
      "headline-large": [
        "32pt",
        {
          lineHeight: "40pt",
          letterSpacing: "0pt",
          fontWeight: "400",
        },
      ],
      "headline-medium": [
        "28pt",
        {
          lineHeight: "36pt",
          letterSpacing: "0pt",
          fontWeight: "400",
        },
      ],
      "headline-small": [
        "24pt",
        {
          lineHeight: "32pt",
          letterSpacing: "0pt",
          fontWeight: "400",
        },
      ],
      "title-large": [
        "22pt",
        {
          lineHeight: "28pt",
          letterSpacing: "0pt",
          fontWeight: "400",
        },
      ],
      "title-medium": [
        "16pt",
        {
          lineHeight: "24pt",
          letterSpacing: ".15pt",
          fontWeight: "400",
        },
      ],
      "title-small": [
        "14pt",
        {
          lineHeight: "20pt",
          letterSpacing: ".1pt",
          fontWeight: "400",
        },
      ],
      "body-large": [
        "16pt",
        {
          lineHeight: "24pt",
          letterSpacing: ".5pt",
          fontWeight: "400",
        },
      ],
      "body-medium": [
        "14pt",
        {
          lineHeight: "20pt",
          letterSpacing: ".25pt",
          fontWeight: "400",
        },
      ],
      "body-small": [
        "12pt",
        {
          lineHeight: "16pt",
          letterSpacing: ".4pt",
          fontWeight: "400",
        },
      ],
      "label-large": [
        "14pt",
        {
          lineHeight: "20pt",
          letterSpacing: ".1pt",
          fontWeight: "500",
        },
      ],
      "label-medium": [
        "12pt",
        {
          lineHeight: "16pt",
          letterSpacing: ".5pt",
          fontWeight: "500",
        },
      ],
      "label-small": [
        "11pt",
        {
          lineHeight: "16pt",
          letterSpacing: ".5pt",
          fontWeight: "500",
        },
      ],
    },
    extend: {},
  },

  plugins: [],
} satisfies Config;
