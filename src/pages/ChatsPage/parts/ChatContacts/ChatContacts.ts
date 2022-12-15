import { Children, Props } from 'src/type_component';
import { Component } from 'src/modules/Component';
import ContactTpl from 'src/component/Contact/Contact.hbs';
import { store } from 'src/Storage/store';
import { EVENTS } from 'src/const/constsStore';
import { Contact } from 'src/component/Contact/Contact';
import { InPut } from 'src/component/Input/Input';
import InputTpl from 'src/component/Input/Input.hbs';
import { ChatContact } from 'src/component/ChatContact/ChatContact';
import ChatContactTpl from 'src/component/ChatContact/ChatContact.hbs';
import { ChatsCtr } from 'src/Controllers/ChatsController';
import { UserCtr } from 'src/Controllers/UserController';

export class ChatContacts extends Component {
  constructor(tag: string, myprops: Children, classofTag: string, template: Function) {
    // передаю в родительский класс пропсы и тег
    super(tag, myprops, classofTag, template);
    store.on(EVENTS.UPDATE, () => {
      // {contacts:store.getState().contacts, ActiveChat: store.getState().ActiveChat}
      // пдписываемся на обновление компонента, передав данные из хранилища
      if (store.getState().ActiveChat) {
        this.setProps({ contacts: store.getState().contacts, ActiveChat: store.getState().ActiveChat });
      }
    });

    this.addChildren({
      SearchInput: new InPut(
        'div',
        {
          // @ts-ignore
          inputname: 'search',
          events: { keydown: this.ContactsSearch },
        },
        'form-example',
        InputTpl
      ),
    });
  }

  ContactsSearch = (e: KeyboardEvent) => {
    const target = e.target as HTMLElement;
    const tag = target.tagName;
    const errdiv = this.getContent().querySelector('#error-search-chat-contact');
    if (errdiv !== null) {
      errdiv.textContent = '';
      if (tag === 'INPUT') {
        if (e.keyCode === 13) {
          console.log('Search value', this.children.SearchInput.getInputValue());
          const searchUser = this.children.SearchInput.getInputValue();
          if (searchUser.search) {
            UserCtr.search(searchUser.search).then((res) => {
              if (Array.isArray(res)) {
                if (res.length !== 0) {
                  this.setProps({ contacts: res });
                } else {
                  // @ts-ignore
                  errdiv.textContent += 'Users not found';
                  this.setProps({ contacts: res });
                }
              }
            });
          }
          this.children.SearchInput.setInputVale('');
        }
      }
    }
  };

  addUsersToChat = (e: Event) => {
    e.preventDefault();
    const ActiveChat = this.props.ActiveChat;
    const target = e.target as HTMLElement;
    const tag = target.tagName;
    if (tag === 'BUTTON') {
      const userId = Number(target.getAttribute('id'));
      const userarr = this.getIdsChatUsers();
      if (userarr.indexOf(userId) === -1) {
        ChatsCtr.addUsersToChat({ users: [userId], chatId: ActiveChat }).then(() => {
          ChatsCtr.getChatUsers(ActiveChat).then((res) => {
            this.setProps({ chatUsers: res.users });
          });
        });
      }
    }
  };

  delUsersFromChat = (e: Event) => {
    e.preventDefault();
    const ActiveChat = this.props.ActiveChat;
    const target = e.target as HTMLElement;
    const tag = target.tagName;
    if (tag === 'BUTTON') {
      const userId = Number(target.getAttribute('id'));
      ChatsCtr.delUsersFromChat({ users: [userId], chatId: ActiveChat }).then((res) => {
        if (res === 'OK') {
          ChatsCtr.getChatUsers(ActiveChat).then((resp) => {
            this.setProps({ chatUsers: resp.users });
          });
        }
      });
    }
  };

  getIdsChatUsers() {
    const idsChatUsers = [];
    if (this.props.chatUsers) {
      for (let i = 0; i < this.props.chatUsers.length; i++) {
        idsChatUsers[i] = this.props.chatUsers[i].id;
      }
    }
    return idsChatUsers;
  }

  componentDidUpdate(oldProps: Props) {
    if (this.props.ActiveChat !== oldProps.ActiveChat) {
      ChatsCtr.getChatUsers(this.props.ActiveChat).then((res) => {
        this.setProps({ chatUsers: res.users });
      });
    }

    if (this.props.chatUsers) {
      this.children.ActiveChatUsers = this.props.chatUsers.map((user: Props) => {
        const correctUserData = this.CorrectUserData(user);
        return new ChatContact(
          'div',
          {
            ...correctUserData,
            events: { click: this.delUsersFromChat },
          },
          'userchat',
          ChatContactTpl
        );
      });
    }

    this.children.newContacts = this.props.contacts.map((contact: Props) => {
      const correctUserData = this.CorrectUserData(contact);
      return new Contact(
        'div',
        {
          ...correctUserData,
          events: { click: this.addUsersToChat },
        },
        'userchat',
        ContactTpl
      );
    });

    return true;
  }

  CorrectUserData(user: Props) {
    const correctUserData: Props = {};
    Object.keys(user).forEach((key) => {
      if (key === 'avatar') {
        if (user.avatar === null) {
          correctUserData.avatar =
            'https://ya-praktikum.tech/api/v2/resources/c720b08a-1e26-458f-9001-05e3da7ff293/14bb2f66-9b8f-43d9-b43c-682600621dd9_349-3496330_download-person-icon-orange-clipart-computer-icons-user-icon-orange-png.png';
        } else {
          correctUserData.avatar = `https://ya-praktikum.tech/api/v2/resources/${user[key]}`;
        }
      } else {
        correctUserData[key] = user[key];
      }
    });
    return correctUserData;
  }

  render() {
    if (this.template !== null) {
      return this.compile(this.template, this.children);
    }
  }

  show() {
    if (this.getContent() !== undefined) {
      this.getContent().style.display = '';
    }
  }

  hide() {
    this.isShow = false;
    this.getContent().style.display = 'none';
  }
}
