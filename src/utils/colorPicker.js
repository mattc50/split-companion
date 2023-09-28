import {
  blue,
  cyan,
  deepOrange,
  deepPurple,
  green,
  indigo,
  lightBlue,
  lightGreen,
  orange,
  pink,
  purple,
  red,
  teal
} from '@mui/material/colors'

const paint = (name) => {
  if (!name) return;
  const i = name[0].toUpperCase();
  if (i === "A") return '#b71c1c' || red[900];
  if (i === "B") return '#0d47a1' || blue[900];
  if (i === "C") return '#880e4f' || pink[900];
  if (i === "D") return '#01579b' || lightBlue[900];
  if (i === "E") return '#4a148c' || purple[900];
  if (i === "F") return '#006064' || cyan[900];
  if (i === "G") return '#311b92' || deepPurple[900];
  if (i === "H") return '#004d40' || teal[900];
  if (i === "I") return '#1a237e' || indigo[900];
  if (i === "J") return '#1b5e20' || green[900];
  if (i === "K") return '#e65100' || orange[900];
  if (i === "L") return '#33691e' || lightGreen[900];
  if (i === "M") return '#bf360c' || deepOrange[900];
  if (i === "N") return '#e53935' || red[600];
  if (i === "O") return '#1e88e5' || blue[600];
  if (i === "P") return '#d81b60' || pink[600];
  if (i === "Q") return '#039be5' || lightBlue[600];
  if (i === "R") return '#8e24aa' || purple[600];
  if (i === "S") return '#0097a7' || cyan[700];
  if (i === "T") return '#5e35b1' || deepPurple[600];
  if (i === "U") return '#00897b' || teal[600];
  if (i === "V") return '#3949ab' || indigo[600];
  if (i === "W") return '#43a047' || green[600];
  if (i === "X") return '#ef6c00' || orange[800];
  if (i === "Y") return '#689f38' || lightGreen[700];
  if (i === "Z") return '#f4511e' || deepOrange[600];
}

export { paint }