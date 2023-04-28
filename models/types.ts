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
	parentComment: Comment;
	score: number;
}

interface Comment {
	id: string;
	user: User;
	createdAt: string;
	content: string;
	score: number;
	replies: Reply[];
}

export type { Comment as CommentType, Reply as ReplyType };
