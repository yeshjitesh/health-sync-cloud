import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
        /* Royal Theme Colors */
        maroon: {
          50: "hsl(348, 50%, 95%)",
          100: "hsl(348, 50%, 90%)",
          200: "hsl(348, 50%, 80%)",
          300: "hsl(348, 50%, 65%)",
          400: "hsl(348, 50%, 50%)",
          500: "hsl(348, 55%, 35%)",
          600: "hsl(348, 55%, 25%)",
          700: "hsl(348, 55%, 18%)",
          800: "hsl(348, 55%, 14%)",
          900: "hsl(348, 60%, 10%)",
          950: "hsl(348, 60%, 6%)",
        },
        gold: {
          50: "hsl(43, 74%, 95%)",
          100: "hsl(43, 74%, 88%)",
          200: "hsl(43, 74%, 78%)",
          300: "hsl(43, 74%, 68%)",
          400: "hsl(43, 74%, 58%)",
          500: "hsl(43, 74%, 49%)",
          600: "hsl(38, 70%, 42%)",
          700: "hsl(35, 65%, 35%)",
          800: "hsl(32, 60%, 28%)",
          900: "hsl(30, 55%, 22%)",
        },
        cream: {
          50: "hsl(40, 40%, 98%)",
          100: "hsl(40, 35%, 96%)",
          200: "hsl(40, 30%, 92%)",
          300: "hsl(40, 25%, 85%)",
          400: "hsl(40, 20%, 75%)",
          500: "hsl(40, 15%, 65%)",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
        "fade-in": {
          "0%": {
            opacity: "0",
            transform: "translateY(10px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        "scale-in": {
          "0%": {
            transform: "scale(0.95)",
            opacity: "0",
          },
          "100%": {
            transform: "scale(1)",
            opacity: "1",
          },
        },
        shimmer: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.5s ease-out",
        "scale-in": "scale-in 0.3s ease-out",
        shimmer: "shimmer 3s ease-in-out infinite",
      },
      boxShadow: {
        gold: "0 4px 20px hsla(43, 74%, 55%, 0.3)",
        "gold-lg": "0 8px 40px hsla(43, 74%, 55%, 0.4)",
        maroon: "0 4px 20px hsla(348, 55%, 15%, 0.4)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
