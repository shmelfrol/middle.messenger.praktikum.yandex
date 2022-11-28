import { EventBus} from "src/modules/EventBus";
import { set} from "src/utility/set";
import {EVENTS} from "src/const/constsStore";

export const STORE_ITEM = 'store';


const INITIAL_STATE = {
  currentUser: null,
  chatsData: {},
  chatFilter: '',
  contacts: [],
  chats:[],
  ActiveChat: null,
  activePath: null
};

export class Store extends EventBus {
  state

  constructor() {
    super();

    const cachedStore = localStorage.getItem(STORE_ITEM);

    this.state = cachedStore ? JSON.parse(cachedStore) : INITIAL_STATE;
  }

  public getState() {
    return this.state;
  }

  /*static EVENTS = {
    UPDATE: 'store-updated',
  };*/

  public set(path, value) {
    //обновляем state по пути и присваиваем value
    set(this.state, path, value);
    //обновляем запись в localStorage по пути store
    localStorage.setItem(STORE_ITEM, JSON.stringify(this.getState()));
    //эмитим - вызываем в ивентбасе событие update - get.state
    //this.emit(Store.EVENTS.UPDATE, this.getState());
    if(path==="activePath"){
      this.emit(EVENTS.UPDATEPATH);
    }else{
      this.emit(EVENTS.UPDATE);
    }


  }
}

export const store= new Store();


