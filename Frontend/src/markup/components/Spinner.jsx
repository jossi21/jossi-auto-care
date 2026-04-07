import { Oval } from "react-loader-spinner";

const spinnerStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  margin: "20px 0",
  width: "100%",
};

const Spinner = ({ isLoading }) => {
  return (
    <Oval
      height={60}
      width={60}
      color="#059669"
      visible={isLoading}
      cssOverride={spinnerStyle}
      ariaLabel="loading"
      secondaryColor="#34d399"
      strokeWidth={3}
    />
  );
};

export default Spinner;
