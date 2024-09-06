/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";
import { cn } from "@/lib/utils";
import ReactInputMask from "react-input-mask";

export interface MaskedInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'ref'> {
  mask: string | (string | RegExp)[];
}

const MaskedInput = React.forwardRef<HTMLInputElement, MaskedInputProps>(
  ({ className, mask, ...props }, ref) => {
    return (
      <ReactInputMask
        mask={mask}
        alwaysShowMask={false}
        className={cn(
          "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        // ref={ref as React.Ref<HTMLInputElement>}
        {...props}
        ref={ref as any}
      >
        {/* {(inputProps: any) => <input {...inputProps} type="text" />} */}
      </ReactInputMask>
    );
  }
);

MaskedInput.displayName = "MaskedInput";

export { MaskedInput };