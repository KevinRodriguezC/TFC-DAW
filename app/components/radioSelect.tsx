import { useState } from "react";
import { RadioGroup } from "@headlessui/react";

export function MyRadioGroup({ name, values }: { name: any; values: any }) {
  let [plan, setPlan] = useState("startup");

  return (
    <RadioGroup value={plan} onChange={setPlan} className="flex flex-col gap-2">
      {values.map((value: any) => (
        <RadioGroup.Option value={value.name}>
          {({ checked }) => (
            <span
              className={"radioItem " + (checked ? "radioItemSelected" : "")}
            >
              {value.visibleName}
            </span>
          )}
        </RadioGroup.Option>
      ))}
    </RadioGroup>
  );
}
