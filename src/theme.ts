import { definePreset } from '@primeuix/themes'
import Aura from '@primeuix/themes/aura'

export const MyThickKlassPreset = definePreset(Aura, {
  semantic: {
    primary: {
      50: '{blue.50}',
      100: '{blue.100}',
      200: '{blue.200}',
      300: '{blue.300}',
      400: '{blue.400}',
      500: '{blue.500}',
      600: '{blue.600}',
      700: '{blue.700}',
      800: '{blue.800}',
      900: '{blue.900}',
      950: '{blue.950}',
    },
    colorScheme: {
      light: {
        success: {
          color: '{green.500}',
          contrastColor: '#ffffff',
          hoverColor: '{green.600}',
          activeColor: '{green.700}',
        },
        warning: {
          color: '{orange.500}',
          contrastColor: '#ffffff',
          hoverColor: '{orange.600}',
          activeColor: '{orange.700}',
        },
        error: {
          color: '{red.500}',
          contrastColor: '#ffffff',
          hoverColor: '{red.600}',
          activeColor: '{red.700}',
        },
        info: {
          color: '{sky.500}',
          contrastColor: '#ffffff',
          hoverColor: '{sky.600}',
          activeColor: '{sky.700}',
        },
        secondary: {
          color: '{slate.500}',
          contrastColor: '#ffffff',
          hoverColor: '{slate.600}',
          activeColor: '{slate.700}',
        },
        accent: {
          color: '{yellow.500}',
          contrastColor: '{surface.900}',
          hoverColor: '{yellow.600}',
          activeColor: '{yellow.700}',
        },
      },
      dark: {
        success: {
          color: '{green.400}',
          contrastColor: '{surface.900}',
          hoverColor: '{green.300}',
          activeColor: '{green.200}',
        },
        warning: {
          color: '{orange.400}',
          contrastColor: '{surface.900}',
          hoverColor: '{orange.300}',
          activeColor: '{orange.200}',
        },
        error: {
          color: '{red.400}',
          contrastColor: '{surface.900}',
          hoverColor: '{red.300}',
          activeColor: '{red.200}',
        },
        info: {
          color: '{sky.400}',
          contrastColor: '{surface.900}',
          hoverColor: '{sky.300}',
          activeColor: '{sky.200}',
        },
        secondary: {
          color: '{slate.400}',
          contrastColor: '{surface.900}',
          hoverColor: '{slate.300}',
          activeColor: '{slate.200}',
        },
        accent: {
          color: '{yellow.400}',
          contrastColor: '{surface.900}',
          hoverColor: '{yellow.300}',
          activeColor: '{yellow.200}',
        },
      },
    },
  },
})
