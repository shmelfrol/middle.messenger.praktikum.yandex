import { ChatsApi} from "src/api/chats-api";

import { AuthCtr} from "src/Controllers/AuthController";
import {UserCtr} from "src/Controllers/UserController";

import { store} from "src/Storage/store";
import {Chatlist} from "src/component/ChatList/Chatlist";


const PRIVATE_CHAT_NAME="ftyujty"
const WS_URL="ws"

class ChatController {
  async getChats(): Promise {
    const authorizedUser = await AuthCtr.getUser();

    return ChatsApi.getChats({ limit: Number.MAX_SAFE_INTEGER }).then(async (chats) => {
      const getUsersFromChatsPromises= [];
      chats.forEach((chat) => {
        const cachedChatData = store.getState().chats?.[chat.id];
        if (!cachedChatData) {
          getUsersFromChatsPromises.push(this.getChatUsers(chat.id));
        }
      });

      await Promise.all(getUsersFromChatsPromises).then((usersInChats) => {
        const chatsData= {};
        usersInChats.forEach(({ chatId, users }) => {
          chatsData[chatId] = {
            users,
          };
        });

        store.set('chatsData', chatsData);
      });

      return chats.map((chat) => {
        const cachedChatData = store.getState().chatsData?.[chat.id];

        const companion = cachedChatData?.users.find((user) => user.id !== authorizedUser.id);

        if (!companion) {
          return {
            ...chat,
            isFromMe: false,
            individualChatName: '',
            individualChatAvatar: '',
          };
        }
        const isFromMe = chat.lastMessage?.user.login === authorizedUser.login;
        const individualChatName = [companion.firstName, companion.secondName].join(' ');
        const individualChatAvatar = companion.avatar;

        return {
          ...chat,
          isFromMe,
          individualChatName,
          individualChatAvatar,
        };
      });
    });
  }

  getChatUsers(id: number) {
    return ChatsApi.getChatUsers({ id }).then((users) => ({ chatId: id, users }));
  }

  addUsersToChat(data: { users: number[]; chatId: number }) {
    console.log("aadata", data)
    return ChatsApi.addUsersToChat(data);
  }



  getChatiks(){
     //AuthCtr.getUser();
    return ChatsApi.getChats({ limit: Number.MAX_SAFE_INTEGER })
        .then(async (chats) => {
      console.log("chatsDATa", chats)
      if(chats.length!==0){
        store.set('chats', chats);
      }

    })

  }

  createChat(login: string) {
    return new Promise((resolve, reject) => {
      AuthCtr.getUser().then((user) => {
        UserCtr.search(login).then((users) => {
          const existingUser = users.find((u) => u.login === login);

          if (existingUser) {
            ChatsApi.createChat({ title: PRIVATE_CHAT_NAME }).then(({ id: chatId }) => {
              this.addUsersToChat({ chatId, users: [existingUser.id, user.id] }).then(() => {
                resolve('Chat is created');
              });
            });
          } else {
            reject(new Error(`Пользователь ${login} не найден`));
          }
        });
      });
    });
  }

  ActiveChat(ActiveChat){
    store.set('ActiveChat', ActiveChat);


  }
  create(login, id){
    return AuthCtr.getUser().then((user)=>{
      return ChatsApi.createChat({ title: login }).then(({ id: chatId })=>{
         this.addUsersToChat({ users: [id, user.id], chatId: chatId })
        return chatId
      })
    })


  }

 delete(chatId){

   AuthCtr.getUser().then((user)=>{
     ChatsApi.delete({ users: [user.id], chatId: chatId }).then((res)=> {
       if(res==="OK"){
         this.getChatiks()
       }
     })
   })

 }


  token(chatId: number) {
    return ChatsApi.token(chatId).then((res): string => res.token);
  }

  createSocket(data, callbacks) {
    //получаем из data chatId
    const { chatId } = data;
    //получаем пользователя
    AuthCtr.getUser().then(({ id: userId }) => {
      //получаем из коллбэков  колбэки
      const { onOpen, onClose, onMessage } = callbacks;
      this.token(chatId).then((token) => {
        ///ws/chats/<USER_ID>/<CHAT_ID>/<TOKEN_VALUE>
        const socket = new WebSocket(`wss://ya-praktikum.tech/ws/chats/${userId}/${chatId}/${token}`);
       //вызывает коллбэк OnOpen, когда событие onopen
        socket.onopen = () => {
          if (onOpen) {
            onOpen(socket);
          }
        };
//вызывает коллбэк onClose , когда событие onclose
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
            const resData= JSON.parse(event.data);

            if (Array.isArray(resData)) {
              onMessage(
                resData.map(
                  (i) => ({
                    isRead: i.is_read,
                    chatId: i.chat_id,
                    time: i.time,
                    content: i.content,
                    id: i.id,
                    userId: i.user_id,
                    type: i.type,
                    isFromMe: i.user_id === userId,
                  })
                )
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
