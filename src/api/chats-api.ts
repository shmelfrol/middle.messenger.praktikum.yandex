import {http} from "src/modules/HttpTransport";
import {TChatResponse, TChatResponseBackend, TUserResponse, TUserResponseBackend} from "src/type_component";

class ChatApi {
  getChats(data?: { offset?: number; limit?: number; title?: string }) {
    return http.get('/chats', { data }).then((res) => {
      const responseData = JSON.parse(res.response);
      return responseData.map((chat:TChatResponseBackend):TChatResponse => {
        const lastMessage = chat.last_message;
        return {
          id: chat.id,
          title: chat.title,
          avatar: chat.avatar,
          unreadCount: chat.unread_count,
          lastMessage: !lastMessage
            ? null
            : {
                user: {
                  firstName: lastMessage.user.first_name,
                  secondName: lastMessage.user.second_name,
                  avatar: lastMessage.user.avatar,
                  email: lastMessage.user.email,
                  login: lastMessage.user.login,
                  phone: lastMessage.user.phone,
                },
                time: lastMessage.time,
                content: lastMessage.content,
              },
        };
      });
    });
  }

  createChat(data: { title: string }) {
    return http.post('/chats', { data }).then((res): { id: number } => JSON.parse(res.response));
  }

  getChatUsers(data: { id: number; offset?: number; limit?: number; name?: string; email?: string }) {
    return http.get(`/chats/${data.id}/users`, { data }).then((res) => {
      const responseData:(TUserResponseBackend & {
          role: string;
      })[]= JSON.parse(res.response);

      return responseData.map(
        (item):TUserResponse=> ({
          id: item.id,
          firstName: item.first_name,
          secondName: item.second_name,
          displayName: item.display_name,
          login: item.login,
          email: item.email,
          phone: item.phone,
          avatar: item.avatar,
        })
      );
    });
  }

  token(chatId: number) {
    return http.post(`/chats/token/${chatId}`).then(
      (
        res
      ): {
        token: string;
      } => JSON.parse(res.response)
    );
  }

  addUsersToChat(data: { users: number[]; chatId: number }) {
    return http.put('/chats/users', { data }).then((res): 'OK' => res.response);
  }

  delete(data:{users:number[], chatId:number}){
      console.log("DATA!!!!!!!!!!!", data)
      return http.delete("/chats/users", {data}).then((res)=>res.response)
  }


}

export const ChatsApi = new ChatApi();
