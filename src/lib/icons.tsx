import React from "react"
// Icon imports based on configured library
import {
Github01Icon,
Mail01Icon,
User02Icon,
LockPasswordIcon,
View01Icon,
ViewOffIcon,
Loading03Icon,
GoogleIcon,
DiscordIcon
} from "hugeicons-react"
interface IconProps {
className?: string
size?: number
}
// Provider Icons
export const GitHubIcon: React.FC<IconProps> = ({ className, size = 20 }) => (
<Github01Icon className={className} size={size} />
)
export const GoogleIcon: React.FC<IconProps> = ({ className, size = 20 }) => (
<GoogleIcon className={className} size={size} />
)
export const DiscordIcon: React.FC<IconProps> = ({ className, size = 20 }) => (
<DiscordIcon className={className} size={size} />
)
export const MicrosoftIcon: React.FC<IconProps> = ({ className, size = 20 }) => (
<svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
<path d="M11.4 24H0V12.6h11.4V24zM24 24H12.6V12.6H24V24zM11.4 11.4H0V0h11.4v11.4zM24 11.4H12.6V0H24v11.4z"/>
</svg>
)
// Common UI Icons
export const EmailIcon: React.FC<IconProps> = ({ className, size = 20 }) => (
<Mail01Icon className={className} size={size} />
)
export const UserIcon: React.FC<IconProps> = ({ className, size = 20 }) => (
<User02Icon className={className} size={size} />
)
export const LockIcon: React.FC<IconProps> = ({ className, size = 20 }) => (
<LockPasswordIcon className={className} size={size} />
)
export const EyeIcon: React.FC<IconProps> = ({ className, size = 20 }) => (
<View01Icon className={className} size={size} />
)
export const EyeOffIcon: React.FC<IconProps> = ({ className, size = 20 }) => (
<ViewOffIcon className={className} size={size} />
)
export const LoadingIcon: React.FC<IconProps> = ({ className, size = 20 }) => (
<Loading03Icon className={className} size={size} />
)
// Provider icon mapping
export const providerIcons = {
github: GitHubIcon,
google: GoogleIcon,
discord: DiscordIcon,
microsoft: MicrosoftIcon,
} as const