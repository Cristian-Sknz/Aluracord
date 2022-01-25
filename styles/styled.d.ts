import 'styled-components';

declare module 'styled-components' {
  export type ColorVariant =
    | '000'
    | '050'
    | ('100' | 100)
    | ('200' | 200)
    | ('300' | 300)
    | ('400' | 400)
    | ('500' | 500)
    | ('600' | 600)
    | ('700' | 700)
    | ('800' | 800)
    | ('900' | 900)
    | ('999' | 999);
    
  export type ColorVariants = {
    '000'?: string;
    '050': string;
    '100': string;
    '200': string;
    '300': string;
    '400': string;
    '500': string;
    '600': string;
    '700': string;
    '800': string;
    '900': string;
    '999'?: string;
  };

  export type Sticker = string;

  export interface DefaultTheme {
    title: string;
    colors: {
      primary: ColorVariants;
      neutral: ColorVariants;
    };
    stickers: Sticker[];
  }
}
