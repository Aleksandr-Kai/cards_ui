export type TWordList = {
	id: number;
	name: string;
	words: TWord[];
};

export type TWord = {
	id: number;
	word: string;
	translation: string;
	studied: boolean;
};

export type TApiResponceWordCount = {
	studied: boolean;
	count: number;
}[];

export type TApiWordCount = { studied: number; unstudied: number };

export type TDialogAction = {
	name: string;
	callback: () => void;
};
export type TDialog = {
	title: string;
	text: string;
	actions: TDialogAction[];
};
