import { Label } from "./ui/label";
import { Input } from "./ui/input";

function FormInputLtd({ label, type, name, value, onChange }) {
  return (
    <div className="grid w-full items-center gap-1.5">
      <Label className="capitalize" htmlFor={name}>
        {label}
      </Label>
      <Input
        name={name}
        type={type}
        id={name} // id должно совпадать с name
        value={value}
        placeholder={`Enter ${label}`}
        onChange={onChange} // Передаём обработчик
      />
    </div>
  );
}

export default FormInputLtd;
