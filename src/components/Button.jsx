const hoverStyle = {
  primary: "hover:bg-fuchsia-700",
  "primary-outline": "hover:bg-fuchsia-100",
};

const variants = {
  primary: `border-stone-400 bg-fuchsia-800 text-stone-100 ${hoverStyle["primary"]}`,
  "primary-outline": `border-fuchsia-800 bg-stone-50 text-fuchsia-800 ${hoverStyle["primary-outline"]}`,
};

const sizes = {
  small: "text-sm py-1 px-2",
  medium: "py-2 px-4",
};

const disabledModifier = {
  primary: "disabled:opacity-40",
};

export default function Button(props) {
  const {
    children,
    dataTestid,
    disabled = false,
    onClick = () => {},
    size = "medium",
    variant = "primary",
  } = props;

  const defaultBtn = "border";
  const btnText = "font-semibold";
  const btnStyle = `${defaultBtn} ${btnText} ${variants[variant]} ${sizes[size]} ${disabledModifier[variant]}`;

  return (
    <button
      disabled={disabled}
      className={btnStyle}
      onClick={onClick}
      data-testid={dataTestid}
    >
      {children}
    </button>
  );
}
