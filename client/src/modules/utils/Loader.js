// Download indicator

import { BallTriangle } from "react-loader-spinner";

const loaderStyles = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
};

export const Loader = () => (
  <BallTriangle 
  color="#00BFFF" 
  height={80} 
  width={80} 
  style={loaderStyles}
   />
);
