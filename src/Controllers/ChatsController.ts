import {ChatsApi} from "src/api/chats-api";
import {AuthCtr} from "src/Controllers/AuthController";
import {store} from "src/Storage/store";
import {UserApi} from "src/api/user-api";
import {Props, TMessageResponse} from "src/type_component";
import {TNewMessageResponse} from "src/pages/ChatsPage/parts/ChatMessenges/ChatMessenges";




class ChatController {

    getChatUsers(id: number) {
        return ChatsApi.getChatUsers({id}).then((users) => {
            return {chatId: id, users}
        });
    }

    addUsersToChat(data: { users: number[]; chatId: number }) {
        return ChatsApi.addUsersToChat(data).then(res => res);
    }

    getUserById(id: number) {
        return UserApi.getUserbyId(id)
    }


    getChatiks() {
        return ChatsApi.getChats({limit: Number.MAX_SAFE_INTEGER})
            .then(async (chats) => {
                if (chats.length !== 0) {
                    store.set('chats', chats);
                }
            })
    }


    ActiveChat(ActiveChat: Props) {
        store.set('ActiveChat', ActiveChat);
    }


    createChatik(title: string) {
        return AuthCtr.getUser().then((user) => {
            return ChatsApi.createChat({title: title}).then(({id: chatId}) => {
                this.addUsersToChat({users: [user.id], chatId: chatId})
                return chatId
            })
        })
    }


    delete(chatId: number) {
        AuthCtr.getUser().then((user) => {
            ChatsApi.delete({users: [user.id], chatId: chatId}).then((res) => {
                if (res === "OK") {
                    this.getChatiks()
                }
            })
        })
    }

    delUsersFromChat(data: { users: number[], chatId: number }) {
        return ChatsApi.delete(data).then((res) => {
            return res
        })
    }

    token(chatId: number) {
        return ChatsApi.token(chatId).then((res): string => {
            return res.token
        });
    }

    createSocket(data:{ chatId: number }, callbacks: {
        onOpen?: (_socket: WebSocket) => void;
        onClose?: (_data: { message: string; code: number; reason: string }) => void;
        onMessage?: (_data: TNewMessageResponse | TMessageResponse[]) => void;
    }) {
        //???????????????? ???? data chatId
        const {chatId} = data;
        //???????????????? ????????????????????????
        AuthCtr.getUser().then(({id: userId}) => {
            //???????????????? ???? ??????????????????  ??????????????
            const {onOpen, onClose, onMessage} = callbacks;
            this.token(chatId).then((token) => {
                ///ws/chats/<USER_ID>/<CHAT_ID>/<TOKEN_VALUE>
                const socket = new WebSocket(`wss://ya-praktikum.tech/ws/chats/${userId}/${chatId}/${token}`);
                //???????????????? ?????????????? OnOpen, ?????????? ?????????????? onopen
                socket.onopen = () => {
                    if (onOpen) {
                        onOpen(socket);
                    }
                };
//???????????????? ?????????????? onClose , ?????????? ?????????????? onclose
                socket.onclose = (event) => {
                    let message = '';
                    if (event.wasClean) {
                        message = '???????????????????? ?????????????? ??????????';
                    } else {
                        message = '?????????? ????????????????????';
                    }
                    if (onClose) {
                        onClose({message, code: event.code, reason: event.reason});
                    }
                };

                socket.onmessage = (event) => {
                    if (onMessage) {
                        const resData = JSON.parse(event.data);

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
