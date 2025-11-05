// Temporary placeholder components - replace with shadcn/ui components later
import * as React from "react"
import { cn } from "@/lib/utils"

// Button
export const Button = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: string; size?: string }>(
  ({ className, variant, size, ...props }, ref) => (
    <button ref={ref} className={cn("px-4 py-2 rounded-md font-medium", className)} {...props} />
  )
)

// Input
export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => (
    <input ref={ref} className={cn("w-full px-3 py-2 border rounded-md", className)} {...props} />
  )
)

// Label
export const Label = React.forwardRef<HTMLLabelElement, React.LabelHTMLAttributes<HTMLLabelElement>>(
  ({ className, ...props }, ref) => (
    <label ref={ref} className={cn("text-sm font-medium", className)} {...props} />
  )
)

// Card
export const Card = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("rounded-lg border bg-card text-card-foreground shadow-sm", className)} {...props} />
)

export const CardHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("flex flex-col space-y-1.5 p-6", className)} {...props} />
)

export const CardTitle = ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
  <h3 className={cn("text-2xl font-semibold leading-none tracking-tight", className)} {...props} />
)

export const CardDescription = ({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
  <p className={cn("text-sm text-muted-foreground", className)} {...props} />
)

export const CardContent = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("p-6 pt-0", className)} {...props} />
)

export const CardFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("flex items-center p-6 pt-0", className)} {...props} />
)

// Badge
export const Badge = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold", className)} {...props} />
)

// Table
export const Table = ({ className, ...props }: React.HTMLAttributes<HTMLTableElement>) => (
  <table className={cn("w-full caption-bottom text-sm", className)} {...props} />
)

export const TableHeader = ({ className, ...props }: React.HTMLAttributes<HTMLTableSectionElement>) => (
  <thead className={cn("[&_tr]:border-b", className)} {...props} />
)

export const TableBody = ({ className, ...props }: React.HTMLAttributes<HTMLTableSectionElement>) => (
  <tbody className={cn("[&_tr:last-child]:border-0", className)} {...props} />
)

export const TableRow = ({ className, ...props }: React.HTMLAttributes<HTMLTableRowElement>) => (
  <tr className={cn("border-b transition-colors hover:bg-muted/50", className)} {...props} />
)

export const TableHead = ({ className, ...props }: React.ThHTMLAttributes<HTMLTableCellElement>) => (
  <th className={cn("h-12 px-4 text-left align-middle font-medium text-muted-foreground", className)} {...props} />
)

export const TableCell = ({ className, ...props }: React.TdHTMLAttributes<HTMLTableCellElement>) => (
  <td className={cn("p-4 align-middle", className)} {...props} />
)

// Separator
export const Separator = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("shrink-0 bg-border h-[1px] w-full", className)} {...props} />
)

// Alert
export const Alert = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("relative w-full rounded-lg border p-4", className)} {...props} />
)

export const AlertDescription = ({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
  <div className={cn("text-sm [&_p]:leading-relaxed", className)} {...props} />
)

// Slider
export const Slider = ({ value, onValueChange, min = 0, max = 100, step = 1, className, ...props }: any) => (
  <input
    type="range"
    min={min}
    max={max}
    step={step}
    value={value?.[0] || 0}
    onChange={(e) => onValueChange?.([parseInt(e.target.value)])}
    className={cn("w-full", className)}
    {...props}
  />
)

// Tabs
export const Tabs = ({ value, onValueChange, className, children, ...props }: any) => (
  <div className={cn("w-full", className)} {...props}>
    {React.Children.map(children, child =>
      React.isValidElement(child) ? React.cloneElement(child as React.ReactElement<any>, { activeValue: value, onValueChange }) : child
    )}
  </div>
)

export const TabsList = ({ className, children, ...props }: any) => (
  <div className={cn("inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground", className)} {...props}>
    {children}
  </div>
)

export const TabsTrigger = ({ value, activeValue, onValueChange, className, children, ...props }: any) => (
  <button
    data-state={activeValue === value ? "active" : "inactive"}
    onClick={() => onValueChange?.(value)}
    className={cn("inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm", className)}
    {...props}
  >
    {children}
  </button>
)

export const TabsContent = ({ value, activeValue, className, children, ...props }: any) => (
  activeValue === value ? (
    <div className={cn("mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2", className)} {...props}>
      {children}
    </div>
  ) : null
)

// Select
export const Select = ({ value, onValueChange, children }: any) => (
  <div>
    {React.Children.map(children, child =>
      React.isValidElement(child) ? React.cloneElement(child as React.ReactElement<any>, { value, onValueChange }) : child
    )}
  </div>
)

export const SelectTrigger = ({ className, children, ...props }: any) => (
  <button className={cn("flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm", className)} {...props}>
    {children}
  </button>
)

export const SelectValue = ({ placeholder, ...props }: any) => (
  <span>{props.value || placeholder}</span>
)

export const SelectContent = ({ children, ...props }: any) => (
  <div className="absolute z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md">
    {children}
  </div>
)

export const SelectItem = ({ value, children, ...props }: any) => (
  <div
    onClick={() => props.onValueChange?.(value)}
    className="relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-accent hover:text-accent-foreground"
  >
    {children}
  </div>
)

// Dialog
export const Dialog = ({ open, onOpenChange, children }: any) => (
  open ? (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/50" onClick={() => onOpenChange?.(false)} />
      {children}
    </div>
  ) : null
)

export const DialogContent = ({ className, children, ...props }: any) => (
  <div className={cn("relative z-50 grid w-full max-w-lg gap-4 border bg-background p-6 shadow-lg sm:rounded-lg", className)} {...props}>
    {children}
  </div>
)

export const DialogHeader = ({ className, ...props }: any) => (
  <div className={cn("flex flex-col space-y-1.5 text-center sm:text-left", className)} {...props} />
)

export const DialogTitle = ({ className, ...props }: any) => (
  <h2 className={cn("text-lg font-semibold leading-none tracking-tight", className)} {...props} />
)
