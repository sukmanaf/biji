import React from "react";
import { cn } from "@/lib/utils";

interface FieldsetProps extends React.HTMLAttributes<HTMLFieldSetElement> {
  legend?: string;
}

export function Fieldset({ legend, className, children, ...props }: FieldsetProps) {
  return (
    <fieldset
      className={cn(
        "border border-gray-300 rounded-md p-4 dark:border-gray-700",
        className
      )}
      {...props}
    >
      {legend && (
        <legend className="px-2 text-sm font-medium text-gray-700 dark:text-gray-300">
          {legend}
        </legend>
      )}
      <div className="space-y-4">{children}</div>
    </fieldset>
  );
}
