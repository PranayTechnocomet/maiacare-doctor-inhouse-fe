import { CommentRequest } from "../types/requestInterface";
import apiClient from "./axiosInstance";

export const login = () => {
    return apiClient.post("/auth/login", {
      token: "sdfsfsf",
    });
  }

// GET all comments
export const getAllComments = () => {
  return apiClient.get("/comments");
};

export const getCommentsById = (id: number) => {
  return apiClient.get("/comments", {
    params: { id: id },
  });
};

// GET comment by ID
export const getCommentById = (id: number) => {
  return apiClient.get(`/comments/${id}`);
};

// GET comment by search query (?id=1)
export const searchCommentsById = (id: number) => {
  return apiClient.get(`/comments`, { params: { id } });
};

// CREATE new comment
export const createComment = (payload: CommentRequest) => {
  return apiClient.post("/comments", payload);
};

// UPDATE comment (PUT)
export const updateComment = (id: number, payload: CommentRequest) => {
  return apiClient.put(`/comments/${id}`, payload);
};

// PARTIAL UPDATE comment (PATCH)
export const patchComment = (id: number, payload: Partial<CommentRequest>) => {
  return apiClient.patch(`/comments/${id}`, payload);
};

// DELETE comment
export const deleteComment = (id: number) => {
  return apiClient.delete(`/comments/${id}`);
};
