import {
	BackArrowIcon,
	BehanceIcon,
	CupIcon,
	FacebookIcon,
	GithubIcon,
	GoogleIcon,
	LogoutIcon,
	LinkInIcon,
	LoginIcon,
	MoonIcon,
	MusicIcon,
	RestartIcon,
	SearchIcon,
	SoundIcon,
	SunIcon,
	CrossIcon,
	NoughtIcon,
	Info,
	Mark,
	Reject,
	CloseIcon,
	HomeIcon,
	SettingsIcon,
	ProfileIcon,
	NotificationsIcon,
	FriendsIcon,
} from './Static';
import { IconNamesTypes, IconProps } from './types';
import './styles.scss';
import classNames from 'classnames';

const icons: Record<IconNamesTypes, React.ReactNode> = {
	back: <BackArrowIcon />,
	facebook: <FacebookIcon />,
	github: <GithubIcon />,
	google: <GoogleIcon />,
	behance: <BehanceIcon />,
	linkedin: <LinkInIcon />,
	cup: <CupIcon />,
	logout: <LogoutIcon />,
	login: <LoginIcon />,
	moon: <MoonIcon />,
	music: <MusicIcon />,
	restart: <RestartIcon />,
	search: <SearchIcon />,
	sound: <SoundIcon />,
	sun: <SunIcon />,
	nought: <NoughtIcon />,
	cross: <CrossIcon />,
	info: <Info />,
	mark: <Mark />,
	reject: <Reject />,
	close: <CloseIcon />,
	home: <HomeIcon />,
	settings: <SettingsIcon />,
	profile: <ProfileIcon />,
	notifications: <NotificationsIcon />,
	friends: <FriendsIcon />,
};

export function Icon({ name, className, size = 'medium', color = 'default', colorType = 'fill' }: IconProps) {
	const classes = classNames('icon', className, `icon--${size}`, `icon--${colorType}-${color}`);
	return <span className={classes}>{icons[name]}</span>;
}
