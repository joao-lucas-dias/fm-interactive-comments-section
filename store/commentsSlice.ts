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
		addReplyAction: (state, action: PayloadAction<ReplyType>) => {
			const comments = [...state.comments];
			const parentComment: CommentType = action.payload.parentComment;

			const updatedComments: CommentType[] = comments.map((comment) => {
				if (comment.id === parentComment.id) {
					const updatedReplies = [...comment.replies, action.payload];

					return {
						...comment,
						replies: updatedReplies
					}
				}

				return comment;
			});

			// TODO: sort replies

			state.comments = updatedComments;
		},
		voteAction: (
			state,
			action: PayloadAction<{
				type: "comment" | "reply";
				id: string;
				voteType: "upvote" | "downvote";
			}>
		) => {
			const comments = [...state.comments];
			var commentId: string = action.payload.id;

			if (action.payload.type === "reply") {
				commentId = action.payload.id.slice(0, action.payload.id.indexOf("_"));
			}

			const comment = comments.find((comment) => comment.id === commentId);

			if (action.payload.type === "comment") {
				if (action.payload.voteType === "upvote") {
					comment!.score++;
				} else {
					comment!.score--;
				}
			} else {
				const replyId = action.payload.id;
				const reply = comment!.replies.find((reply) => reply.id === replyId);

				if (action.payload.voteType === "upvote") {
					reply!.score++;
				} else {
					reply!.score--;
				}
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

export const { loadComments, addComment, addReplyAction, voteAction, deleteAction } = commentsSlice.actions;

export default commentsSlice.reducer;
