type InputErrorProps = {
  children: React.ReactNode;
};

const InputError: React.FC<InputErrorProps> = ({ children }) => {
  return <span className="text-[12px] text-red-500 ml-2">{children}</span>;
};

export default InputError;