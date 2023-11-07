export interface IconProps {
	name: IconNamesTypes;
	color?: IconColorTypes;
	className?: string;
	size?: 'small' | 'medium' | 'large';
	colorType?: 'fill' | 'stroke';
}

// const iconNames = [
//     "back",
//     "facebook",
//     "github",
//     "google",
//     "behance",
//     "linkedin",
//     "cup",
//     "logout",
//     "login",
//     "moon",
//     "music",
//     "restart",
//     "search",
//     "sound",
//     "sun",
// ];

export type IconColorTypes = 'primary' | 'secondary' | 'red' | 'light-gray' | 'gray' | 'inherit' | 'default';

export type IconNamesTypes =
	| 'back'
	| 'facebook'
	| 'github'
	| 'google'
	| 'behance'
	| 'linkedin'
	| 'cup'
	| 'logout'
	| 'login'
	| 'moon'
	| 'music'
	| 'restart'
	| 'search'
	| 'sound'
	| 'sun'
	| 'nought'
	| 'cross'
	| 'info'
	| 'mark'
	| 'reject'
	| 'close'
	| 'home'
	| 'profile'
	| 'notifications'
	| 'friends'
	| 'settings';
