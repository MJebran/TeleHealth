import { useState } from "react";

export const useFormControls = (initialValue: string) => {
  const [value, setValue] = useState(initialValue);

  const handleChange = (newValue: string) => {
    setValue(newValue);
  };

  return {
    value,
    setValue: handleChange,
  };
};
