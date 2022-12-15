import { ChatsApi } from 'src/api/chats-api';
import { AuthCtr } from 'src/Controllers/AuthController';
import { store } from 'src/Storage/store';
import { UserApi } from 'src/api/user-api';
import { Props, TMessageResponse } from 'src/type_component';
import { TNewMessageResponse } from 'src/pages/ChatsPage/parts/ChatMessenges/ChatMessenges';

class ChatController {
  getChatUsers(id: number) {
    return ChatsApi.getChatUsers({ id }).then((users) => ({ chatId: id, users }));
  }

  addUsersToChat(data: { users: number[]; chatId: number }) {
    return ChatsApi.addUsersToChat(data).then((res) => res);
  }

  getUserById(id: number) {
    return UserApi.getUserbyId(id);
  }

  getChatiks() {
    return ChatsApi.getChats({ limit: Number.MAX_SAFE_INTEGER }).then(async (chats) => {
      if (chats.length !== 0) {
        store.set('chats', chats);
      }
    });
  }

  ActiveChat(ActiveChat: Props) {
    store.set('ActiveChat', ActiveChat);
  }

  createChatik(title: string) {
    return AuthCtr.getUser().then((user) =>
      ChatsApi.createChat({ title }).then(({ id: chatId }) => {
        this.addUsersToChat({ users: [user.id], chatId });
        return chatId;
      })
    );
  }

  delete(chatId: number) {
    AuthCtr.getUser().then((user) => {
      ChatsApi.delete({ users: [user.id], chatId }).then((res) => {
        if (res === 'OK') {
          this.getChatiks();
        }
      });
    });
  }

  delUsersFromChat(data: { users: number[]; chatId: number }) {
    return ChatsApi.delete(data).then((res) => res);
  }

  token(chatId: number) {
    return ChatsApi.token(chatId).then((res): string => res.token);
  }

  createSocket(
    data: { chatId: number },
    callbacks: {
      onOpen?: (_socket: WebSocket) => void;
      onClose?: (_data: { message: string; code: number; reason: string }) => void;
      onMessage?: (_data: TNewMessageResponse | TMessageResponse[]) => void;
    }
  ) {
    // получаем из data chatId
    const { chatId } = data;
    // получаем пользователя
    AuthCtr.getUser().then(({ id: userId }) => {
      // получаем из коллбэков  колбэки
      const { onOpen, onClose, onMessage } = callbacks;
      this.token(chatId).then((token) => {
        /// ws/chats/<USER_ID>/<CHAT_ID>/<TOKEN_VALUE>
        const socket = new WebSocket(`wss://ya-praktikum.tech/ws/chats/${userId}/${chatId}/${token}`);
        // вызывает коллбэк OnOpen, когда событие onopen
        socket.onopen = () => {
          if (onOpen) {
            onOpen(socket);
          }
        };
        // вызывает коллбэк onClose , когда событие onclose
        socket.onclose = (event) => {
          let message = '';
          if (event.wasClean) {
            message = 'Соединение закрыто чисто';
          } else {
            message = 'Обрыв соединения';
          }
          if (onClose) {
            onClose({ message, code: event.code, reason: event.reason });
          }
        };

        socket.onmessage = (event) => {
          if (onMessage) {
            const resData = JSON.parse(event.data);

            if (Array.isArray(resData)) {
              onMessage(
                resData.map((i) => ({
                  isRead: i.is_read,
                  chatId: i.chat_id,
                  time: i.time,
                  content: i.content,
                  id: i.id,
                  userId: i.user_id,
                  type: i.type,
                  isFromMe: i.user_id === userId,
                }))
              );
            } else {
              onMessage({
                content: resData.content,
                id: resData.id,
                time: resData.time,
                type: resData.type,
                userId: resData.user_id,
                isFromMe: resData.user_id === userId,
              });
            }
          }
        };
      });
    });
  }
}

export const ChatsCtr = new ChatController();
