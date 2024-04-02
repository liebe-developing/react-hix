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
  children,
  ...rest
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <FormControl>
      <FormLabel fontSize="14px">{label}</FormLabel>
      <InputGroup>
        <Input
          type={type || "text"}
          placeholder={placeholder}
          pr={4}
          _placeholder={{ fontSize: "12px" }}
          onChange={onChange}
          value={value}
          name={name}
          accept={accept}
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
