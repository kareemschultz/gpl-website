import React from "react"
import { cn } from "@/lib/utils"
interface LoadingProps {
size?: "sm" | "md" | "lg"
className?: string
text?: string
}
export function Loading({ size = "md", className, text }: LoadingProps) {
const sizeClasses = {
sm: "h-4 w-4",
md: "h-8 w-8",
lg: "h-12 w-12"
}
return (
<div className={cn("flex items-center justify-center space-x-2", className)}>
<div
className={cn(
"animate-spin rounded-full border-2 border-gray-300 border-t-primary",
sizeClasses[size]
)}
/>
{text && <span className="text-sm text-muted-foreground">{text}</span>}
</div>
)
}
export function LoadingPage({ text = "Loading..." }: { text?: string }) {
return (
<div className="flex min-h-screen items-center justify-center">
<Loading size="lg" text={text} />
</div>
)
}
export function LoadingButton({
children,
isLoading,
...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
isLoading: boolean
}) {
return (
<button
{...props}
disabled={isLoading || props.disabled}
className={cn(
"inline-flex items-center justify-center",
props.className
)}
>
{isLoading && <Loading size="sm" className="mr-2" />}
{children}
</button>
)
}