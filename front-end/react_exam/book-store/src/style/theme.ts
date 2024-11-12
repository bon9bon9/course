export type ThemeName = "light" | "dark"
export type ColorKey = "primary" | "background" | "secondary" | "third" | "border" | "text";
export type HeadingSize = "large" | "medium" | "small";
export type ButtonSize = "large" | "medium" | "small";
export type ButtonScheme = "primary" | "normal";
export type LayoutWidth = "large" | "medium" | "small"

interface Theme {
  name : ThemeName;
  global : {
    color : "black" | "white";
    background : "black" | "white";
  }
  color : Record<ColorKey, string>;
  heading : {
    [key in HeadingSize] : {
      fontSize : string;
    };
  };
  button : {
    [key in ButtonSize] : {
      fontSize : string;
      padding : string;
    }
  },
  buttonScheme : {
    [key in ButtonScheme] : {
      color : string;
      backgroundColor : string;
    }
  },
  borderRadius : {
    default : string;
  },
  layout : {
    width : {
      [key in LayoutWidth] : string;
    }
  }

  // {
  //   [key in ColorKey] : string;
  //   // primary :string;
  //   // background : string;
  //   // secondary? : string;
  // }
}

export const light : Theme = {
  name : 'light',
  global : {
    color : "black",
    background : "white"
  },
  color : {
    primary : 'brown',
    background : 'lightgray',
    secondary : "blue",
    third : "green",
    border : "grey",
    text : "black"
  },
  heading :{
    large : {
      fontSize : "2rem"
    },
    medium :{
      fontSize : "1.5rem"
    },
    small : {
      fontSize : "0.75rem"
    }
  },
  button : {
    large : {
      fontSize : "1.5rem",
      padding : "1rem 2rem"
    },
    medium :{
      fontSize : "1rem",
      padding : "0.5rem 1rem"
    },
    small : {
      fontSize : "0.75rem",
      padding : "0.25rm 0.5rem"
    }
  },
  buttonScheme :{
    primary : {
      color : "white",
      backgroundColor : "midnightblue"
    },
    normal : {
      color : "black",
      backgroundColor : "lightgrey",
    }
  },
  borderRadius : {
    default : "4px"
  },
  layout : {
    width : {
      large : '1020px',
      medium : "760px",
      small : "320px"
    }
  }
}

export const dark : Theme = {
  ...light,
  name : 'dark',
  global : {
    color : "white",
    background : "black"
  },
  color : {
    primary : 'coral',
    background : 'midnightblue',
    secondary : 'darkblue',
    third : 'darkgreen',
    border : "grey",
    text : "black",
  }
}

export const getTheme = (themeName : ThemeName) : Theme => {
  switch(themeName){
    case "light":
      return light
    case "dark" :
      return dark;
  }
}
