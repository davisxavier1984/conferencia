import * as React from "react";

const Button = React.forwardRef(({ className, variant = "default", ...props }, ref) => {
  const baseStyles = "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50";

  const variants = {
    default: "bg-primary text-white hover:bg-primary/90",
    ghost: "hover:bg-gray-100",
  };

  const sizeStyles = "h-10 px-4 py-2";

  return (
    <button
      className={`${baseStyles} ${variants[variant] || variants.default} ${sizeStyles} ${className || ''}`}
      ref={ref}
      {...props}
    />
  );
});

Button.displayName = "Button";

export { Button };
