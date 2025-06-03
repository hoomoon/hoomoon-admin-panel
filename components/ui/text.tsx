import * as React from "react"
import { cn } from "@/lib/utils"

export interface TextProps extends React.HTMLAttributes<HTMLParagraphElement> {}

const Text = React.forwardRef<HTMLParagraphElement, TextProps>(({ className, ...props }, ref) => {
  return <p ref={ref} className={cn("text-sm text-zinc-400", className)} {...props} />
})
Text.displayName = "Text"

export { Text }
