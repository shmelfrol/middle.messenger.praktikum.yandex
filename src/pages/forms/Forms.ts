import {Children, Props, TSettingsRequest, TSignUpRequest} from '../../type_component';
import {formsdata} from '../../Storage/propsForms';
import FormLoginTpl from './FormLogin.hbs';
import FormRegTpl from './FormReg.hbs';
import FormSettingsTpl from './FormSettings.hbs';
import FormChatAddTpl from "./FormChatAdd.hbs"
import {FormFields} from "src/pages/forms/FormFields";
import {Component} from "src/modules/Component";
import {validformData} from "src/utility/myvalidate";
import {AuthCtr} from "src/Controllers/AuthController";
import {InPut} from "src/component/Input/Input";
import {focusout} from "src/component/Input/Input";
import {store} from "src/Storage/store";
import {EVENTS} from "src/const/constsStore";
import {UserCtr} from "src/Controllers/UserController";
import {ChatsCtr} from "src/Controllers/ChatsController";

export class Form extends Component {
    constructor(
        tag: string,
        myprops: Children,
        classofTag: string,
        template: Function,
    ) {
        super(tag, myprops, classofTag, template);

        if (this.props.path === "/settings") {
            store.on(EVENTS.UPDATE, () => {
                this.setProps({currentUser: store.getState().currentUser, img: store.getState().currentUser.avatar});
            });
        }


        this.addChildren(FormFields({
            ...myprops, eventsForInput: {
                focusout: focusout
            }
        }))


        let events = {click: this.ButtonClick}
        this.SetEvents(events)

    }


    getFormData() {
        let formdata:{} |TSignUpRequest = {}
        Object.keys(this.children).forEach((key) => {
            if (this.children[key] instanceof InPut) {
                let inputData = this.children[key].getInputValue();
                formdata = {...formdata, ...inputData};
            }
        })
        return formdata
    }


    SignIn = (formdata:TSignUpRequest, divErr:HTMLDivElement) => {
        AuthCtr.signIn(formdata).catch((res) => {
            if (typeof res === 'object') {
                if (res?.reason) {
                    divErr!.textContent += res.reason
                }
                if (res?.type) {
                    divErr!.textContent += res.type
                }
            } else {
                divErr!.textContent += res
            }
        })
    }

    SignUp = (formdata:TSignUpRequest, divErr:HTMLDivElement) => {
        AuthCtr.signUp(formdata).catch((res) => {
            divErr!.textContent += res.reason
        })
    }


    SettingsSave = (formdata:TSettingsRequest) => {
        if (formdata?.avatar) {
            UserCtr.changeAvatar(formdata.avatar)
        }
        UserCtr.changeProfile(formdata)
    }

    AddChat = (formdata:Props) => {
        if (formdata.chatName) {
            ChatsCtr.createChatik(formdata.chatName).then(res => {
                console.log("adddchatRES", res)
                ChatsCtr.getChatiks()
            })
        }


    }

    ButtonClick = (e: Event) => {
        let path = window.location.pathname
        let target=e.target as HTMLElement
        let targetType = target.getAttribute("type")
        let divErr=this.getContent()?.querySelector("#err") as HTMLDivElement;
        divErr!.textContent =""
        if (targetType === "submit") {
            e.preventDefault()
            let formdata = this.getFormData() as TSignUpRequest & TSettingsRequest
            let error = validformData(formdata)
            if (divErr !== null && divErr !== undefined) {
                if (error === null) {
                    if (path === "/") {
                        this.SignIn(formdata, divErr)
                    }
                    if (path === "/sign-up") {
                        this.SignUp(formdata, divErr)
                    }
                    if (path === "/settings") {
                        this.SettingsSave(formdata)
                    }
                    if (path === "/messenger") {
                        this.AddChat(formdata)
                    }


                } else {
                    divErr.textContent = error
                }
            }


        }

    }


    componentDidUpdate() {
        if (this.props.path === "/settings") {
            Object.entries(this.children).forEach(([key, child]) => {
                child.setProps({...this.props.forChildrens[key], value: this.props.currentUser[key]})
            });
        }
        return true
    }


    render() {
        let props = {...this.props, ...this.children}
        if (this.template !== null) {
            return this.compile(this.template, props);
        }


    }
}

export function FormPage() {
    let tpl = null;
    let path = window.location.pathname;
    let div = 'div'
    let classOfTag = 'testmain'
    let props = {...formsdata, path: path}
    switch (path) {
        case '/': {
            tpl = FormLoginTpl;
            break;
        }
        case '/sign-up': {
            tpl = FormRegTpl;
            break;
        }
        case '/settings': {
            tpl = FormSettingsTpl;
            let currentUser = store.getState().currentUser
            if (currentUser?.id) {
                // @ts-ignore
                props = {...props, currentUser: currentUser, img: currentUser.avatar}
            }
            break;
        }
        case '/messenger': {
            div = 'form'
            classOfTag = 'form-example'
            tpl = FormChatAddTpl;
            break;
        }
    }

    // @ts-ignore
    return new Form(div, props, classOfTag, tpl)
}