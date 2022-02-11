import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
body, html {
  height: 100%;
}

body {
  background-color: #fae3f8;
  font-family: 'Roboto', sans-serif;
}

/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type=number] {
  -moz-appearance: textfield;
}

`;
