import GlobalStyle from '../../styles/global';
import { ThemeProvider } from 'styled-components';
import DefaultTheme from '../../styles/theme/default';

const MyApp = ({ Component, pageProps }) => {
  return (
    <ThemeProvider theme={DefaultTheme}>
      <Component {...pageProps} />
      <GlobalStyle />
    </ThemeProvider>
  );
};

export default MyApp;
