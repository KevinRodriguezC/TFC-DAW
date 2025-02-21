import { useState } from "react";
import { Switch } from "@headlessui/react";

export function Toogle({
  inputName,
  defaultValue,
}: {
  inputName: string;
  defaultValue: boolean;
}) {
  const [enabled, setEnabled] = useState(defaultValue);

  return (
    <Switch
      checked={enabled}
      defaultChecked={defaultValue}
      onChange={setEnabled}
      className={`${
        enabled ? "bg-blue-600" : "bg-slate-300 dark:bg-slate-700"
      } relative inline-flex h-6 w-11 items-center rounded-full transition`}
      name={inputName}
      id={inputName}
    >
      <span className="sr-only">Enable notifications</span>
      <span
        className={`${
          enabled ? "translate-x-6" : "translate-x-1"
        } inline-block h-4 w-4 transform rounded-full bg-white transition`}
      />
    </Switch>
  );
}
