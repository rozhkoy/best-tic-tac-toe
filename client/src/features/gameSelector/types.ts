export type GameModeTypes = '1p' | '2p' | 'online';
export type HardLevelTypes = 'easy' | 'normal' | 'hard';
export interface GameModeProps {
	[index: number]: GameModeTypes;
}
