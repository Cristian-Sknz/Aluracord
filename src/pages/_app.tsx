import moment, { LocaleSpecification } from 'moment';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from '@styles/global';
import DefaultTheme from '@styles/theme/default';
import ptbr from 'src/lib/moment_lang.json';
import AuthProvider from '@contexts/auth';

moment.defineLocale('pt-br', ptbr as LocaleSpecification);
const MyApp = ({ Component, pageProps }) => {
  return (
    <ThemeProvider theme={DefaultTheme}>
      <AuthProvider>
        <Component {...pageProps} />
        <GlobalStyle />
      </AuthProvider>
    </ThemeProvider>
  );
};

export default MyApp;
