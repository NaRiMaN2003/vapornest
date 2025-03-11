import "./index.css";

const Input = ({ type, required, label, children, value, onChange }) => {
  return (
    <>
      <input
        type={type}
        required={required}
        value={value}
        onChange={onChange}
      />
      {label && <label>{label}</label>}
      {children}
    </>
  );
};

export default Input;
