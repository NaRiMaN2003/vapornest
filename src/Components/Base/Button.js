import { useEffect, useState } from "react";

import "./Button.css";

const Button = ({ baseVariant, disabled, children }) => {
  const [variant, setVariant] = useState(null);

  useEffect(() => {
    switch (baseVariant) {
      case "empty":
        setVariant("btn-empty");
        break;
      case "cta":
        setVariant("cta-button");
        break;
      default:
        break;
    }
  }, [baseVariant]);

  return (
    <button className={variant} disabled={disabled}>
      {children}
    </button>
  );
};

export default Button;
