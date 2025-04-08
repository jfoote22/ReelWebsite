import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      keyframes: {
        shimmer: {
          '0%': { borderColor: 'rgba(107, 114, 128, 0.1)' },
          '50%': { borderColor: 'rgba(107, 114, 128, 0.3)' },
          '100%': { borderColor: 'rgba(107, 114, 128, 0.1)' }
        }
      }
    },
  },
  plugins: [],
};
export default config;
