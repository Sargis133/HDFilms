import {I_DropdownOptions} from "../../ui/uiDropdown/models/interfaces.ts";
import {useI18n} from "vue-i18n";

export const changeItemLocalName = (childs: I_DropdownOptions[]): I_DropdownOptions[] => {
    const { t,  } = useI18n({ useScope: 'global'})

    return childs.map((item: I_DropdownOptions) => {
        return {
            name: t('allCategories.' + refactorName(item.name || '')),
            value: item.value
        }
    })
    function refactorName (txt: string): string {
        txt = txt.toLowerCase()
        return txt.split(' ').map((item: string,index: number) => {
            if(index !== 0) return item[0].toUpperCase() + item.slice(1)
            else  return item
        }).join('')
    }
}