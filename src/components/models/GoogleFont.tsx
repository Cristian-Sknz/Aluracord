import React, { Fragment } from 'react';

type Font = {
  name: string;
  weights: number[];
};

type GoogleFontsProps = {
  font: Font[];
};

const GoogleFontAPI = 'https://fonts.googleapis.com'

function joinFonts(font: Font[]) {
  return font.map((item) => `family=${item.name}:wght@${item.weights.join(';')}`).join('&');
}

const GoogleFont: React.FC<GoogleFontsProps> = ({ font }) => {
  return (
    <Fragment>
      <link rel='preconnect' href={GoogleFontAPI} />
      <link rel='preconnect' href='https://fonts.gstatic.com' crossOrigin='true' />
      <link href={`${GoogleFontAPI}/css2?${joinFonts(font)}&display=swap`} rel='stylesheet'/>
    </Fragment>
  );
};

export default GoogleFont;