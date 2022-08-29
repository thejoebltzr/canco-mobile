import {
    RegisterFormDataConst,
    IS_LOADING,
    TOKEN,
    CURRENT_PROMOS,
    UPCOMING_PROMOS,
    MISSINGPOINTSFORM,
    LOCATIONPARAMS,
    GETSPECIFICLOCATION,
    CUSTOMARR,
    MY_CARDS,
    TRANSFERFUNDS,
    RECENTTRANS,
    COUNTRY,
    REGISTERED_USER,
    CURRENT_USER,
    SELECTED_CARD_INDEX,
    TERMS_ACCEPTED,
    DEFAULT_CARD

} from "../constant"


let initialState = {
    loading: false,
    loadingResend: false,
    data: {},
    token: '',
    RegisterFMdata: "",
    verificationCode: null,
    userSignupDetail: null,
    storeCurrentPromotion: null,
    storeUpcomingPromotion: null,
    missingPointForm: null,
    getLocationParams: null,
    getspecifyLocation: null,
    customArray: null,
    AddCancoCard: null,
    myCards: null,
    TransferBalance: null,
    recentTransaction: null,
    countryCode: null,
    registeredUser: null,
    currentUser: null,
    selectedCardIndex: 0,
    termsAccepted: false,
    defaultCard:null
};

export default (state = initialState, action) => {
    switch (action.type) {
        case RegisterFormDataConst:
            return {
                ...state,
                RegisterFMdata: action.data,

            };
        case TOKEN:
            return {
                ...state,
                token: action.data,
            };
        case IS_LOADING:
            return {
                ...state,
                loading: action.isloading,
            };
        case UPCOMING_PROMOS:
            return {
                ...state,
                storeUpcomingPromotion: action.data,
            };
        case CURRENT_PROMOS:
            return {
                ...state,
                storeCurrentPromotion: action.data,
            };
        case MISSINGPOINTSFORM:
            return {
                ...state,
                missingPointForm: action.data,
            };
        case GETSPECIFICLOCATION:
            return {
                ...state,
                getspecifyLocation: action.data,
            };
        case LOCATIONPARAMS:
            return {
                ...state,
                getLocationParams: action.data,
            };
        case CUSTOMARR:
            return {
                ...state,
                customArray: action.data,
            };
        case MY_CARDS:
            return {
                ...state,
                myCards: action.data,
            };
        case TRANSFERFUNDS:
            return {
                ...state,
                TransferBalance: action.data,
            };
        case RECENTTRANS:
            return {
                ...state,
                recentTransaction: action.data,
            };
        case COUNTRY:
            return {
                ...state,
                countryCode: action.data,
            };
        case REGISTERED_USER:
            return {
                ...state,
                registeredUser: action.data,
            };
        case CURRENT_USER:
            return {
                ...state,
                currentUser: action.data,
            };
        case SELECTED_CARD_INDEX:
            return {
                ...state,
                selectedCardIndex: action.data,
            };
        case TERMS_ACCEPTED:
            return {
                ...state,
                termsAccepted: action.data,
            };
        case DEFAULT_CARD:
            return {
                ...state,
                defaultCard: action.data,
            };
        default:
            return state;
    }

}