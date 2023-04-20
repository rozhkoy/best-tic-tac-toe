export interface IconProps {
	name: IconNamesTypes;
	className?: string;
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
	| 'sun';
