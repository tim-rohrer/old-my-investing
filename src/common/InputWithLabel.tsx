import React, { FC } from "react";

interface InputWithLabelProps {
  id: string;
  type?: string;
  value: any;
  onInputChange: (event: any) => void;
  isFocused: boolean;
  children: any;
}

export const InputWithLabel: FC<InputWithLabelProps> = ({
  id,
  type = "text",
  value,
  onInputChange,
  isFocused,
  children,
}) => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  React.useEffect(() => {
    if (isFocused && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isFocused]);

  return (
    <>
      <label htmlFor={id}>{children}</label>
      &nbsp;
      <input
        ref={inputRef}
        id={id}
        type="text"
        value={value}
        onChange={onInputChange}
        autoFocus={isFocused}
      />{" "}
    </>
  );
};
