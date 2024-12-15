import { Label } from "./ui/label";
import { Input } from "./ui/input";

function FormInput({ label, type, name }) {
  return (
    <div className="grid w-full items-center gap-1.5">
      <Label className="capitalize" htmlFor={type}>
        {label}
      </Label>
      <Input name={name} type={type} id={type} placeholder={`Enter ${type}`} />
    </div>
  );
}

export default FormInput;
