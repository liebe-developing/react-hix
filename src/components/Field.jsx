/* eslint-disable react/prop-types */
import {
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Field = ({
  label,
  type,
  placeholder,
  helper,
  accept,
  onChange,
  value,
  reference,
  name,
  onKeyDown,
  maxLength,
  children,
  isRequired,
  defaultValue,
  ...rest
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <FormControl isRequired={isRequired}>
      <FormLabel fontSize="14px">{label}</FormLabel>
      <InputGroup>
        <Input
          type={type || "text"}
          placeholder={placeholder}
          pr={4}
          _placeholder={{ fontSize: "12px" }}
          onChange={onChange}
          maxLength={maxLength}
          value={value}
          name={name}
          defaultValue={defaultValue}
          accept={accept}
          onKeyDown={onKeyDown}
          ref={reference}
          {...rest}
        />
        {type === "password" && (
          <InputLeftElement h={"full"}>
            <Button
              variant={"ghost"}
              onClick={() => setShowPassword((showPassword) => !showPassword)}
            >
              {showPassword ? <Icon as={FaEye} /> : <Icon as={FaEyeSlash} />}
            </Button>
          </InputLeftElement>
        )}
      </InputGroup>
      {children}
      <FormHelperText fontSize="11px">{helper}</FormHelperText>
    </FormControl>
  );
};

export default Field;
