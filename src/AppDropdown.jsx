import { Dropdown } from "primereact/dropdown";
import React from "react";
import { getDropdownPT } from "./dropdownStyles";


export default function AppDropdown({
  value,
  options,
  onChange,
  placeholder = "Select",
  loading = false,
  filter = true,
  triggerBg = "#4f5bd5",
  ...rest
}) {
  return (
    <Dropdown
      value={value || ""}
      options={options}
      optionLabel="label"
      optionValue="value"
      placeholder={loading ? "Loading..." : placeholder}
      disabled={loading}
      filter={filter}
      appendTo="self"
      baseZIndex={2000}
      className="w-full"
      onChange={onChange}
      pt={getDropdownPT({ triggerBg })}
      {...rest}
    />
  );
}
