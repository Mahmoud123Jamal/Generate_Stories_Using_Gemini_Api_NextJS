const config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        body: "var(--bodyFont)",
        primary: "var(--blue)",
      },
    },
  },
  plugins: [],
};

export default config;