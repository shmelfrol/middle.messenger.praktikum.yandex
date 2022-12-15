export const formsdata = {
  forChildrens: {
    firstName: {
      inputname: 'first_name',
      text: 'Имя',
      type: 'text',
    },
    secondName: {
      inputname: 'second_name',
      text: 'Фамилия',
      type: 'text',
    },
    displayName: {
      inputname: 'display_name',
      text: 'Отображаемое имя',
      type: 'text',
    },
    login: {
      inputname: 'login',
      text: 'Логин',
      type: 'text',
    },
    email: {
      inputname: 'email',
      text: 'Email',
      type: 'email',
    },
    phone: {
      inputname: 'phone',
      text: 'Тел',
      type: 'text',
    },
    oldPassword: {
      inputname: 'oldPassword',
      text: 'oldPassword',
      type: 'password',
    },
    newPassword: {
      inputname: 'newPassword',
      text: 'newPassword',
      type: 'password',
    },
    Password: {
      inputname: 'password',
      text: 'пароль',
      type: 'password',
    },
    avatar: {
      inputname: 'avatar',
      text: 'Фото',
      type: 'file',
    },
    chatName: {
      inputname: 'chatName',
      text: 'chatName',
      type: 'text',
    },
    btnLogin: { btn_name: 'SignIn' },
    btnReg: { btn_name: 'SignUp' },
    btnSettings: { btn_name: 'Save' },
    btnCreateChat: { btn_name: 'Create Chat' },
  },
};

export const formfields = {
  LoginFields: ['login', 'Password', 'btnLogin'],
  RegFields: ['firstName', 'secondName', 'email', 'phone', 'login', 'Password', 'btnReg'],
  SettingsFields: [
    'firstName',
    'secondName',
    'displayName',
    'email',
    'phone',
    'login',
    'oldPassword',
    'newPassword',
    'avatar',
    'btnSettings',
  ],
  ChatFields: ['chatName', 'btnCreateChat'],
};
