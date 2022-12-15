export type TJsonValue =
  | string
  | number
  | boolean
  | null
  | undefined
  | TJsonValue[]
  | { [key: string]: TJsonValue }
  | {}
  | Function;
export type TJsonObject = { [key: string]: TJsonValue } | {};
export type Props = Record<string, any>;
export type Children = Record<string, Props>;
export function Arrow() {
  return 5;
}

export type TRequestOptions = {
  timeout?: number;
  headers?: { [name: string]: string };
  data?: TJsonObject | File;
};

export type TSignUpRequestBackend = {
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  password: string;
  phone: string;
};

export type TSignUpRequest = {
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  password: string;
  phone: string;
};

export type TSettingsRequest = {
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  password: string;
  phone: string;
  avatar?: File;
  oldPassword: string;
  newPassword: string;
  display_name: string;
};

export type TMessageResponse = {
  chatId: number;
  content: string;
  id: number;
  isRead: boolean;
  time: string;
  type: string;
  userId: number;
  isFromMe: boolean;
};

export type TChangeProfileRequest = {
  first_name: string;
  second_name: string;
  display_name?: string;
  login: string;
  email: string;
  phone: string;
};

export type TUserResponse = {
  id: number;
  firstName: string;
  secondName: string;
  displayName: string;
  login: string;
  email: string;
  phone: string;
  avatar: string;
};

export type TUserResponseBackend = {
  id: number;
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  email: string;
  phone: string;
  avatar: string;
};

export type TChatResponseBackend = {
  id: number;
  title: string;
  avatar: string;
  unread_count: number;
  last_message: {
    user: {
      first_name: string;
      second_name: string;
      avatar: string;
      email: string;
      login: string;
      phone: string;
    };
    time: string;
    content: string;
  };
};

export type TChatResponse = {
  id: number;
  title: string;
  avatar: string;
  unreadCount: number;
  lastMessage: null | {
    user: {
      firstName: string;
      secondName: string;
      avatar: string;
      email: string;
      login: string;
      phone: string;
    };
    time: string;
    content: string;
  };
};
