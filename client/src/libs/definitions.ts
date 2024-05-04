export type TFile = {
	_id: string;
	name: string;
	type: string;
	size: number;
	path: string;
	date: string;
	userId: string;
	parentId: string;
	childIds: string[];
	__v: number;
};
