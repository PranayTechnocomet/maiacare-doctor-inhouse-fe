export interface UserRequest {
    name: string;
    email: string;
  }

export interface LoginRequest {
    email: string;
    password: string;
}

// Request interface for creating/updating comment
export interface CommentRequest {
  postId: number;
  name: string;
  email: string;
  body: string;
}
