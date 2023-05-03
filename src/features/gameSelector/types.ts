export type GameModeTypes = '1p' | '2p' | 'Online';
export type HardLevelTypes = 'Easy' | 'Normal' | 'Hard';
export interface GameModeProps {
	[index: number]: GameModeTypes;
}
