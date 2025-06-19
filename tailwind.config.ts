import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme"; // Import defaultTheme

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)', // Adjusted to be relative to the new base radius
				sm: 'calc(var(--radius) - 3px)'  // Adjusted slightly for 0.25rem (4px) base radius, sm = 1px. Or keep as -4px for 0px.
                                                 // Let's try: md: calc(var(--radius) * 0.75), sm: calc(var(--radius) * 0.5) for proportionality
                                                 // Or simply: md: '0.1875rem', sm: '0.125rem' if --radius is 0.25rem.
                                                 // Sticking to original calc with new values, but if radius is small, difference is small.
                                                 // If --radius is 0.25rem (4px), then md is 2px, sm is 0px. Let's make sm have some rounding.
                                                 // md: calc(var(--radius) - 0.125rem) -> 2px if radius is 4px
                                                 // sm: calc(var(--radius) - 0.1875rem) -> 1px if radius is 4px. This is minimal.
                                                 // Let's try fixed smaller values or slightly less reduction:
                                                 // md: 'calc(var(--radius) - 0.0625rem)', // 3px if radius is 4px (0.25rem)
                                                 // sm: 'calc(var(--radius) - 0.125rem)'  // 2px if radius is 4px (0.25rem)
                                                 // The existing calc logic: md: calc(0.5rem - 2px), sm: calc(0.5rem - 4px) which is 0.375rem and 0.25rem from a 0.5rem base.
                                                 // New --radius: 0.25rem.
                                                 // lg: 0.25rem (4px)
                                                 // md: calc(0.25rem - 2px) -> calc(4px - 2px) = 2px (0.125rem)
                                                 // sm: calc(0.25rem - 4px) -> calc(4px - 4px) = 0px (0rem). Minimal as requested.
			},
			fontFamily: { // Added font family configuration
        sans: ['var(--font-body)', ...defaultTheme.fontFamily.sans],
        heading: ['var(--font-heading)', ...defaultTheme.fontFamily.sans],
      },
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;