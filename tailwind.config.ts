import type { Config } from "tailwindcss";
import defaultTheme from 'tailwindcss/defaultTheme';

export default {
    darkMode: ["class"],
    content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}", // Simplified content path
  ],
  theme: {
  	extend: {
      fontFamily: {
        sans: ['var(--font-geist-sans)', ...defaultTheme.fontFamily.sans],
        serif: ['Georgia', 'Times New Roman', 'serif'],
      },
  		colors: {
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
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
  			},
        
        // Heritage Color Variables
        cedar: {
          DEFAULT: 'hsl(var(--cedar))',
          foreground: 'hsl(var(--cedar-foreground))'
        },
        sand: {
          DEFAULT: 'hsl(var(--sand))',
          foreground: 'hsl(var(--sand-foreground))'
        },
        copper: {
          DEFAULT: 'hsl(var(--copper))',
          foreground: 'hsl(var(--copper-foreground))'
        },
        papyrus: {
          DEFAULT: 'hsl(var(--papyrus))',
          foreground: 'hsl(var(--papyrus-foreground))'
        },
        olive: {
          DEFAULT: 'hsl(var(--olive))',
          foreground: 'hsl(var(--olive-foreground))'
        },

        // Override default blue with Terracotta Heritage Colors
        blue: {
          50: '#fef7f4',   // Very light terracotta
          100: '#fceee8',  // Light terracotta  
          200: '#f8ddd1',  // Lighter terracotta
          300: '#f2c4b1',  // Light-medium terracotta
          400: '#ea9d84',  // Medium terracotta
          500: '#d97555',  // Base terracotta (close to our primary)
          600: '#c85a3a',  // Darker terracotta
          700: '#a7482e',  // Dark terracotta
          800: '#8a3f2a',  // Very dark terracotta
          900: '#723927',  // Darkest terracotta
          950: '#3d1d13'   // Almost black terracotta
        },

        // Override default purple with Cedar Heritage Colors
        purple: {
          50: '#f3f8f5',   // Very light cedar
          100: '#e3f0e7',  // Light cedar
          200: '#c9e2d1',  // Lighter cedar
          300: '#a3ccb3',  // Light-medium cedar
          400: '#75ad8c',  // Medium cedar
          500: '#52926c',  // Base cedar (close to our cedar)
          600: '#437655',  // Darker cedar
          700: '#3a5f46',  // Dark cedar
          800: '#314c3a',  // Very dark cedar
          900: '#2a3f31',  // Darkest cedar
          950: '#16241b'   // Almost black cedar
        },

        // Override default indigo with Copper Heritage Colors
        indigo: {
          50: '#fef9f5',   // Very light copper
          100: '#fdf2ea',  // Light copper
          200: '#fae3d1',  // Lighter copper
          300: '#f5cfae',  // Light-medium copper
          400: '#eeb184',  // Medium copper
          500: '#e49158',  // Base copper (close to our copper)
          600: '#d5703a',  // Darker copper
          700: '#b25a2e',  // Dark copper
          800: '#8f4a2a',  // Very dark copper
          900: '#743e26',  // Darkest copper
          950: '#3f1f13'   // Almost black copper
        },

        // Override default violet with Sand Heritage Colors  
        violet: {
          50: '#fcfaf8',   // Very light sand
          100: '#f8f3ed',  // Light sand
          200: '#f0e6d7',  // Lighter sand
          300: '#e5d4bc',  // Light-medium sand
          400: '#d7bc95',  // Medium sand
          500: '#c9a474',  // Base sand (close to our sand)
          600: '#b8915a',  // Darker sand
          700: '#98754a',  // Dark sand
          800: '#7d6140',  // Very dark sand
          900: '#665137',  // Darkest sand
          950: '#382c1d'   // Almost black sand
        },

        // Heritage Golden Amber Scale (keeping your accent)
        amber: {
          50: '#fffbeb',   // Very light amber
          100: '#fef3c7',  // Light amber
          200: '#fde68a',  // Lighter amber
          300: '#fcd34d',  // Light-medium amber
          400: '#fbbf24',  // Medium amber
          500: '#f59e0b',  // Base amber (close to our accent)
          600: '#d97706',  // Darker amber
          700: '#b45309',  // Dark amber
          800: '#92400e',  // Very dark amber
          900: '#78350f',  // Darkest amber
          950: '#451a03'   // Almost black amber
        },

        // Heritage Olive Scale
        emerald: {
          50: '#f6f8f4',   // Very light olive
          100: '#eaefe5',  // Light olive
          200: '#d7e0cc',  // Lighter olive
          300: '#bcc9a8',  // Light-medium olive
          400: '#9cb080',  // Medium olive
          500: '#7d9660',  // Base olive (close to our olive)
          600: '#63784c',  // Darker olive
          700: '#4f5f3e',  // Dark olive
          800: '#424f35',  // Very dark olive
          900: '#38422f',  // Darkest olive
          950: '#1d2419'   // Almost black olive
        }
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
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
  			},
        // Heritage-specific animations
        'heritage-shimmer': {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' }
        },
        'heritage-float': {
          '0%, 100%': { transform: 'translateY(0) translateX(0) rotate(0deg)' },
          '25%': { transform: 'translateY(-20px) translateX(10px) rotate(1deg)' },
          '50%': { transform: 'translateY(-10px) translateX(-10px) rotate(-1deg)' },
          '75%': { transform: 'translateY(-15px) translateX(5px) rotate(0.5deg)' }
        },
        'heritage-glow': {
          '0%, 100%': { 
            boxShadow: '0 0 20px hsl(var(--primary) / 0.4), 0 0 40px hsl(var(--accent) / 0.2)' 
          },
          '50%': { 
            boxShadow: '0 0 30px hsl(var(--primary) / 0.6), 0 0 60px hsl(var(--accent) / 0.4)' 
          }
        }
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out',
        'heritage-shimmer': 'heritage-shimmer 4s ease-in-out infinite',
        'heritage-float': 'heritage-float 6s ease-in-out infinite', 
        'heritage-glow': 'heritage-glow 2s ease-in-out infinite'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;