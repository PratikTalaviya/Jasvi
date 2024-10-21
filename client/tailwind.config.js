/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      aspectRatio: {
        "3/1": "3 / 1",
        "2/3": "2 / 3",
        "2/1": "2 / 1",
        "1/2": "1 / 2",
      },
      zIndex: {
        1000: "1000",
        999: "999",
      },
      backdropBlur: {
        xs: "2px",
      },
      borderRadius: {
        outer: "var(--round)",
        inner: "var(--inner-round)",
      },
      spacing: {
        primary: "var(--padding)",
        secondary: "var(--secondary-padding)",
      },
      screens: {
        // // Tailwind Default Breakpoints
        // 'sm': '640px',  // Small devices (phones)
        // 'md': '768px',  // Medium devices (tablets)
        // 'lg': '1024px', // Large devices (desktops)
        // 'xl': '1280px', // Extra large devices (large desktops)
        // '2xl': '1536px', // 2X large devices (larger desktops)
        xs: "320px", // Extra small devices (small phones)
        "2xs": "375px", // Extra small-medium devices (medium phones)
        "3xl": "1920px", // 3X large devices (HD monitors)
        "4xl": "2560px", // 4X large devices (2K monitors)
        "5xl": "3840px", // 5X large devices (4K monitors)
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities(
        {
          ".hide-scrollbar": {
            overflow: "auto",
          },
          ".hide-scrollbar::-webkit-scrollbar": {
            display: "none",
          },
          ".hide-scrollbar": {
            "-ms-overflow-style": "none",
            "scrollbar-width": "none",
          },
          ".vertical": {
            "writing-mode": "vertical-rl",
            "text-orientation": "mixed",
          },
        },
        ["responsive", "hover"]
      );
    },
  ],
};
