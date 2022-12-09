import {Component} from "src/modules/Component";
import {Children} from "src/type_component";
import {FormFields} from "src/pages/forms/FormFields";
import {settingsdata} from "src/Storage/propsForms";
import FormSettingsTpl from "src/pages/SettingsPage/SettingsPage.hbs";
import {store} from "src/Storage/store";
import {EVENTS} from "src/const/constsStore";
import {InPut} from "src/component/Input/Input";
import {validformData} from "src/utility/valid";
import {UserCtr} from "src/Controllers/UserController";

export class Settings extends Component {
    constructor(
        tag: string,
        myprops: Children,
        classofTag: string,
        template: string,
    ) {
        let children = FormFields({...myprops})
        myprops = {...myprops, ...children}

        super(tag, myprops, classofTag, template);

        store.on(EVENTS.UPDATE, () => {
            this.setProps({currentUser: store.getState().currentUser, img: store.getState().currentUser.avatar});
        });
        let events = {click: this.ButtonClick}
        this.SetEvents(events)

    }


    getFormData() {
        let formdata = {}
        Object.keys(this.children).forEach((key) => {
            if (this.children[key] instanceof InPut) {
                let inputData = this.children[key].getInputValue();
                formdata = {...formdata, ...inputData};
            }
        })
        return formdata

    }

    ButtonClick = (e: Event) => {
        let targetType = e!.target!.getAttribute("type")
        let divErr: HTMLDivElement | null | undefined = null

        if (this?.getContent()) {
            divErr = this?.getContent()?.querySelector("#err");
        }

        if (targetType === "submit") {
            e.preventDefault()
            let formdata = this.getFormData()
            console.log("formdata", formdata)
            let error = validformData(formdata)
            if (divErr !== null && divErr !== undefined) {
                if (error === null) {
                    if (formdata?.avatar) {
                        UserCtr.changeAvatar(formdata.avatar)
                    }
                    UserCtr.changeProfile(formdata)
                }
            }
        }
    }


    componentDidUpdate() {
        Object.entries(this.children).forEach(([key, child]) => {
            this.children[key].setProps({...this.props.forChildrens[key], value: this.props.currentUser[key]})
        });
        return true
    }

    render() {
        let props = {...this.props, ...this.children}
        if (this.template !== null) {
            return this.compile(this.template, props);
        }
    }


}


export function SettingsPage() {
    let props;
    let currentUser = store.getState().currentUser
    if (currentUser?.id) {
        props = {...settingsdata, currentUser: currentUser, img: currentUser.avatar}
    } else {
        props = {...settingsdata}
    }

    return new Settings('div', props, 'testmain', FormSettingsTpl)
}