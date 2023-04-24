export interface User {
	image: {
		png: string;
		webp: string;
	};
	username: string;
}

export interface Reply {
	id: string;
	user: User;
	createdAt: string;
	content: string;
	replyingTo: string;
	score: number;
}

export default interface Comment {
	id: string;
	user: User;
	createdAt: string;
	content: string;
	score: number;
	replies: Reply[];
}
