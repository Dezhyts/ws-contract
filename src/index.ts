export enum DurationBan {
  TEN_MINUTES = '600',
  ONE_HOUR = '3600',
  ONE_DAY = '86400',
  ONE_WEEK = '604800',
  ONE_MONTH = '2592000',
  PERMANENT = '0',
}

// CLIENT --> SERVER
export interface SendMessageDto {
  streamId: string;
  message: string;
  replyToId?: string;
}

export interface JoinStreamDto {
  streamId: string;
  limit?: number;
  cursor?: string;
}

export interface LeaveStreamDto {
  streamId: string;
}

export interface BanUserDto {
  streamId: string;
  targetUserIdBan: string;
  duration: DurationBan;
}

// SERVER --> CLIENT

export interface UserJoinedResponse {
  userId: string;
  username: string;
}

export interface ReplyToResponse {
  id: string;
  message: string;
  username: string;
}

export interface ChatMessageResponse {
  id: string;
  username: string;
  userId: string;
  message: string;
  createdAt: string;
  replyTo: ReplyToResponse | null;
}

export interface HistoryChatResponse {
  messages: ChatMessageResponse[];
}

export interface UserBannedResponse {
  userId: string;
}

export interface ErrorResponse {
  message: string;
  code?: string;
  timeLeft?: number;
  windowSeconds?: number;
}

export interface ClientToServerEvents {
  /** Join stream chat room. Server replies with history.Server Broadcast user_joined */
  join_stream: (data: JoinStreamDto) => void;

  /** Leave stream chat room */
  leave_stream: (data: LeaveStreamDto) => void;

  /** Send a chat message (reply). Server broadcasts message. */
  send_message: (data: SendMessageDto) => void;

  /**Ban a user from the stream chat. Server broadcasts user_banned. */
  ban_user: (data: BanUserDto) => void;
}

export interface ServerToClientEvents {
  /** User joined the room. */
  user_joined: (data: UserJoinedResponse) => void;

  /** Chat history, sent to the user who joined. */
  history: (data: HistoryChatResponse) => void;

  /** New chat message in the room. */
  message: (data: ChatMessageResponse) => void;

  /** A user was banned from the room. */
  user_banned: (data: UserBannedResponse) => void;

  /** Error action */
  error: (data: ErrorResponse) => void;
}
