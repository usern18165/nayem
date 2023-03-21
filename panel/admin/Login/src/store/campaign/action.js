import {
    ADD_CAMPAIGNS,
    DELETE_CAMPAIGNS,
    SEARCH_CAMPAIGNS,
    EDIT_CAMPAIGNS,
    TOGGLE_BAN,
    TOGGLE_TOP,
    MULTIPLE_DELETE
} from './type';


export function AddCampaign(campaign) {
    return { type: ADD_CAMPAIGNS, payload: campaign };
}

export function DeleteCampaign(id) {
    return { type: DELETE_CAMPAIGNS, payload: id }
}

export function SearchCampaign(searchText) {
    return { type: SEARCH_CAMPAIGNS, payload: searchText }
}

export function EditCampaigns(updateCampaign) {
    return { type: EDIT_CAMPAIGNS, payload: updateCampaign }
}

export function ToggleBan(id) {
    return { type: TOGGLE_BAN, payload: id }
}

export function ToggleTop(id) {
    return { type: TOGGLE_TOP, payload: id }
}

export function multipleDelete(ids) {
    return { type: MULTIPLE_DELETE, payload: ids }
}
