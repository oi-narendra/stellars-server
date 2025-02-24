import * as React from "react";
import { cn } from "@/app/utils/utils";
import { Label } from "./label";

const Form = React.forwardRef(({ className, ...props }, ref) => {
  return <form ref={ref} className={cn("space-y-6", className)} {...props} />;
});
Form.displayName = "Form";

const FormField = React.forwardRef(({ className, ...props }, ref) => {
  return <div ref={ref} className={cn("space-y-2", className)} {...props} />;
});
FormField.displayName = "FormField";

const FormLabel = React.forwardRef(
  ({ className, children, error, ...props }, ref) => {
    return (
      <Label
        ref={ref}
        className={cn(error && "text-destructive", className)}
        {...props}
      >
        {children}
        {error && <span className="text-sm font-normal"> - {error}</span>}
      </Label>
    );
  }
);
FormLabel.displayName = "FormLabel";

const FormMessage = React.forwardRef(
  ({ className, children, ...props }, ref) => {
    if (!children) return null;

    return (
      <p
        ref={ref}
        className={cn("text-sm font-medium text-destructive", className)}
        {...props}
      >
        {children}
      </p>
    );
  }
);
FormMessage.displayName = "FormMessage";

export { Form, FormField, FormLabel, FormMessage };
