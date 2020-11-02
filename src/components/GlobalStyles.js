import {createGlobalStyle} from "styled-components";
import reset from "styled-reset";

const GlobalStyles = createGlobalStyle`
    ${reset};

   h1{
       font-size:30px;
   } 
   p{
       font-size:18px;
   }
   body{
        width:100vw;
        height:100vh;
   }
`;

export default GlobalStyles;