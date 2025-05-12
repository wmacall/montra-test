import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";
import {
  ChangeEvent,
  HTMLInputTypeAttribute,
  ReactNode,
  useState,
} from "react";

interface FormInputProps {
  name: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  type?: HTMLInputTypeAttribute;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

export default function FormInput({
  name,
  placeholder,
  value,
  onChange,
  type = "text",
  leftIcon,
  rightIcon,
}: FormInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  const handleChangeValue = (e: ChangeEvent<HTMLInputElement>) =>
    onChange(e.target.value);
  const handleTogglePassword = () => setShowPassword(!showPassword);

  const isPassword = type === "password";

  return (
    <div className="relative">
      {leftIcon && (
        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-gray-400 shadow-none">
          {leftIcon}
        </div>
      )}
      <Input
        name={name}
        type={isPassword && showPassword ? "text" : type}
        placeholder={placeholder}
        className="pl-10 ring-0 focus:ring-0 focus-visible:ring-0 bg-gray-100/50"
        value={value}
        onChange={handleChangeValue}
      />
      {isPassword ? (
        <div
          className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-400"
          onClick={handleTogglePassword}
        >
          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </div>
      ) : (
        rightIcon && (
          <div className="absolute inset-y-0 right-3 flex items-center text-gray-400">
            {rightIcon}
          </div>
        )
      )}
    </div>
  );
}
