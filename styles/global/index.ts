import { createGlobalStyle, DefaultTheme, ColorVariant } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyle = createGlobalStyle`
 ${reset}
 body {
   font-family: Roboto, sans-serif;
 }
`;

export function useNeutralColor(theme: DefaultTheme, variant: ColorVariant): string {
  return theme.colors.neutral[variant];
}
  
export function usePrimaryColor(theme: DefaultTheme, variant: ColorVariant): string {
  return theme.colors.primary[variant];
}

export default GlobalStyle;
