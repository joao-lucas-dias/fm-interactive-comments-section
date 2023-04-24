export interface Reply {
	id: string;
	user: {
		img: {
			png: string;
			webp: string;
		};
		username: string;
	};
	createdAt: string;
	content: string;
	replyingTo: string;
	score: number;
}

export default interface Comment {
	id: string;
	user: {
		img: {
			png: string;
			webp: string;
		};
		username: string;
	};
	createdAt: string;
	content: string;
	score: number;
	replies: Reply[];
}
