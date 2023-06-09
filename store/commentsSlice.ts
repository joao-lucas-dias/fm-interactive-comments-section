import { CommentType, ReplyType } from "@/models/types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type State = {
	comments: CommentType[];
};

const initialState: State = {
	comments: []
};

const commentsSlice = createSlice({
	name: "comments",
	initialState,
	reducers: {
		loadComments: (state, action: PayloadAction<CommentType[]>) => {
			const sortedComments = action.payload
				.slice()
				.sort(
					(comment1: CommentType, comment2: CommentType) =>
						comment2.score - comment1.score
				);

			state.comments = sortedComments;
		},
		addComment: (state, action: PayloadAction<CommentType>) => {
			const comments = [...state.comments];

			comments.push(action.payload);

			const sortedComments = comments.sort(
				(comment1: CommentType, comment2: CommentType) => comment2.score - comment1.score
			);

			state.comments = sortedComments;
		},
		addReplyAction: (
			state,
			action: PayloadAction<{ parentComment: CommentType; replyData: ReplyType }>
		) => {
			const comments = [...state.comments];
			const parentComment: CommentType = action.payload.parentComment;

			const updatedComments: CommentType[] = comments.map((comment) => {
				if (comment.id === parentComment.id) {
					const updatedReplies = [...comment.replies, action.payload.replyData];

					return {
						...comment,
						replies: updatedReplies
					};
				}

				return comment;
			});

			// TODO: sort replies

			state.comments = updatedComments;
		},
		editAction: (
			state,
			action: PayloadAction<{
				type: string;
				data: any;
				parentComment?: CommentType;
				updatedContent: string;
			}>
		) => {
			const comments = [...state.comments];
			let updatedComments: CommentType[];

			if (action.payload.type === "comment") {
				updatedComments = comments.map((comment) => {
					if (comment.id === action.payload.data.id) {
						return {
							...comment,
							content: action.payload.updatedContent
						};
					}

					return comment;
				});
			} else {
				updatedComments = comments.map((comment) => {
					if (comment.id === action.payload.parentComment!.id) {
						const updatedReplies = comment.replies.map((reply) => {
							if (reply.id === action.payload.data.id) {
								return {
									...reply,
									content: action.payload.updatedContent
								};
							}
							return reply;
						});

						return {
							...comment,
							replies: updatedReplies
						};
					}

					return comment;
				});
			}

			state.comments = updatedComments;
		},
		voteAction: (
			state,
			action: PayloadAction<{
				type: "comment" | "reply";
				id: string;
				voteType: "inc" | "dec";
			}>
		) => {
			const comments = [...state.comments];
			var commentId: string = action.payload.id;

			if (action.payload.type === "reply") {
				commentId = action.payload.id.slice(0, action.payload.id.indexOf("_"));
			}

			const comment = comments.find((comment) => comment.id === commentId);

			if (action.payload.type === "comment") {
				comment!.score += action.payload.voteType === "inc" ? 1 : -1;
			} else {
				const replyId = action.payload.id;
				const reply = comment!.replies.find((reply) => reply.id === replyId);

				reply!.score += action.payload.voteType === "inc" ? 1 : -1;
			}

			const sortedComments = comments.sort(
				(comment1: CommentType, comment2: CommentType) => comment2.score - comment1.score
			);

			state.comments = sortedComments;
		},
		deleteAction: (state, action: PayloadAction<{ id: string; type: string }>) => {
			let comments: CommentType[] = [...state.comments];
			let updatedComments: CommentType[];

			if (action.payload.type === "comment") {
				updatedComments = comments.filter((comment) => comment.id !== action.payload.id);
			} else {
				const commentId = action.payload.id.slice(0, action.payload.id.indexOf("_"));

				updatedComments = comments.map((comment) => {
					if (comment.id === commentId) {
						const updatedReplies = comment.replies.filter(
							(reply) => reply.id !== action.payload.id
						);
						return { ...comment, replies: updatedReplies };
					} else {
						return comment;
					}
				});
			}

			const sortedComments = updatedComments.sort(
				(comment1: CommentType, comment2: CommentType) => comment2.score - comment1.score
			);

			state.comments = sortedComments;
		}
	}
});

export const {
	loadComments,
	addComment,
	addReplyAction,
	editAction,
	voteAction,
	deleteAction
} = commentsSlice.actions;

export default commentsSlice.reducer;
