interface ThemeColors {
    main: string;
    mainContrast: string;
    secondary: string;
    secondaryDimmed: string;
    highlighted: string;
    dimmed: string;
    dimmedLight: string;
    dimmedMedium: string;
    transparent: string;
  }
  
  interface Theme {
    colors: ThemeColors;
  }
  
  export const theme: Theme = {
    colors: {
      main: 'white',
      mainContrast: 'black',
      secondary: 'rgb(34, 71, 34)',
      secondaryDimmed: 'rgb(121, 146, 131)',
      highlighted: 'rgb(219, 69, 69)',
      dimmed: 'gray',
      dimmedLight: 'rgb(250, 250, 250)',
      dimmedMedium: 'rgb(246, 243, 243)',
      transparent: 'rgba(255, 255, 255, 0)',
    },
  };
  
  export const darkTheme: Theme = {
    colors: {
      main: 'black',
      mainContrast: 'white',
      secondary: 'rgb(23, 47, 23)',
      secondaryDimmed: 'rgb(80, 100, 90)',
      highlighted: 'rgb(200, 50, 50)',
      dimmed: 'lightgray',
      dimmedLight: 'rgb(40, 40, 40)',
      dimmedMedium: 'rgb(50, 50, 50)',
      transparent: 'rgba(0, 0, 0, 0)',
    },
  };
  