const Button = ({
  label,
  backgroundColor,
  borderColor,
  textColor,
  fullWidth,
}) => {
  return (
    <button
      className={`
    flex justify-center hover:text-white hover:bg-black hover:border-transparent items-center gap-2 px-7 py-4 border font-montserrat text-lg leading-none rounded-full
    ${fullWidth && "w-full"}
    ${
      backgroundColor
        ? `${backgroundColor} ${borderColor} ${textColor}`
        : `bg-tesla-red border-tesla-red text-white`
    }
    `}
    >
      {label}
    </button>
  );
};
export default Button
