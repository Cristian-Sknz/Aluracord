import { createGlobalStyle, DefaultTheme, ColorVariant, css } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyle = createGlobalStyle`
 ${reset}
 body {
   font-family: Roboto, sans-serif;
 }
`;

export const customScrollbar = css`
  ::-webkit-scrollbar {
    width: 0.4rem;
  }

  ::-webkit-scrollbar-track {
    background: transparent;
    border-radius: 0.5rem;
  }

  ::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => useNeutralColor(theme, '800')};
    border-radius: 20px;
  }
`;

export function useNeutralColor(theme: DefaultTheme, variant: ColorVariant): string {
  return theme.colors.neutral[variant];
}

export function usePrimaryColor(theme: DefaultTheme, variant: ColorVariant): string {
  return theme.colors.primary[variant];
}

export default GlobalStyle;
