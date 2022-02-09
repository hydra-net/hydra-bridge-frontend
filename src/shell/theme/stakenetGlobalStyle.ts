import { createGlobalStyle } from "styled-components";

export const StakenetGlobalStyle = createGlobalStyle`
  body, html {
    height: 100%;
    /* converts 1 rem to 10px instead of 16px */
    font-size: 62.5% !important;
  }

  body {
    /* brand darkest blue */
    background-color: #0D1328;
    font-family: 'Rubik', sans-serif;
    line-height: 1.1;
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
