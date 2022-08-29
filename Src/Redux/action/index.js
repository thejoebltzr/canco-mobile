import axios from 'axios';
import {
    IS_LOADING, TOKEN, CURRENT_PROMOS,
    UPCOMING_PROMOS, SELECTED_CARD_INDEX, LOCATIONPARAMS, GETSPECIFICLOCATION, CUSTOMARR,
    MY_CARDS,
    TRANSFERFUNDS,
    RECENTTRANS, CURRENT_USER
} from "../constant";

import Toast from 'react-native-toast-message';
import { BASE_URL } from '../../BASE_URL';
import moment from "moment";
import { Amenities } from '../../Utility/Utils';
import { element } from 'prop-types';


export function RegisterUserFn(data2, navigate, navigate1) {
    // console.log("DATA REGISTER", data2)
    return async dispatch => {
        dispatch({ type: IS_LOADING, isloading: true })
        axios({
            method: "post",
            url: `${BASE_URL}RegisterUser`,
            data: data2,
            validateStatus: (status) => {
                return true;
            },
        }).catch(error => {
            dispatch({ type: IS_LOADING, isloading: false })

        }).then(response => {
            if (response.data.Response.error) {
                dispatch({ type: IS_LOADING, isloading: false })
                // Toast.show({
                //     type: 'error',
                //     text1: 'Alert!',
                //     text2: response.data.Response.error,
                // })
                navigate1(response.data.Response.error)
            }
            else if (response.data.Message == "EmailInvalid") {
                dispatch({ type: IS_LOADING, isloading: false })

                Toast.show({
                    type: 'error',
                    text2: "Email is invalid",
                })
                navigate1()
            }
            else {
                dispatch({ type: IS_LOADING, isloading: false })
                navigate()
            }

        }
        )
    }
}

export function ValidateEmail(data, success){
    return async dispatch => {
         axios({
            method: "post",
            url: `${BASE_URL}ValidateEmail`,
            data: data,
            validateStatus: (status) => {
                return true
            }
        }).catch(error => {
            dispatch({ type: IS_LOADING, isloading: false })
        }).then((response) => {
            success(response.data)
        })
    }
}

export function VerifyPhoneOtp(data, removeStates, navigate) {
    return async dispatch => {
        dispatch({ type: IS_LOADING, isloading: true })
        axios({
            method: "post",
            url: `${BASE_URL}SendVerificationCode`,
            data: data,
            validateStatus: (status) => {
                return true
            }
        }).catch(error => {
            dispatch({ type: IS_LOADING, isloading: false })
        }).then(response => {
            if (response.data.Status == 200) {
                removeStates()
                navigate()
                dispatch({ type: IS_LOADING, isloading: false })
                console.log("ok", response.data)
            }
            else {
                dispatch({ type: IS_LOADING, isloading: false })
            }
        })
    }
}

export async function ResendOTP(data) {
    try {
        const res = await axios({
            method: "post",
            url: `${BASE_URL}SendVerificationCode`,
            data: data,
            validateStatus: (status) => {
                return true
            }
        });

        return res.data;
    } catch (err) {
        return err;
    }
}

export function LoginAction(data, removeStates, navigate) {
    console.log("LOGIN URL", `${BASE_URL}Login`);
    return async dispatch => {
        dispatch({ type: IS_LOADING, isloading: true })
        axios({
            method: 'post',
            url: `${BASE_URL}Login`,
            data: data,
            validateStatus: (status) => {
                return true;
            },
        }).catch(error => {
            console.log(error)
            removeStates()
        }).then(response => {
            if (response.data.Status == 201) {

                dispatch({ type: TOKEN, data: response.data.Token })
                dispatch({ type: MY_CARDS, data: response.data.UserCards })
                dispatch({ type: CURRENT_USER, data: response.data.UserProfile })



                if (response.data.UserCards.length > 0) {
                    dispatch({ type: SELECTED_CARD_INDEX, data: 0 })

                    let cardNumbers = []
                    response.data.UserCards.forEach(element => cardNumbers.push(element.cardnumber))
                    global.cardNumbers = cardNumbers
                    console.log('cards from login', global.cardNumbers)
                }

                removeStates()
                navigate()
            }
            else {
                dispatch({ type: IS_LOADING, isloading: false })
                if (response.data.Response.error == "PasswordInvalid") {
                    Toast.show({
                        type: 'error',
                        text2: "Incorrect password.",
                    })
                }
                else if (response.data.Response.error == "EmailNotRegistered") {
                    Toast.show({
                        type: 'error',
                        text2: "Email is not registered.",
                    })
                }
                else if (response.data.Response.error == "EmailNotConfirmed") {
                    Toast.show({
                        type: 'error',
                        text2: "Email is not confirmed yet.",
                    })
                } else {
                    Toast.show({
                        type: 'error',
                        text2: "Invalid credentials.",
                    })
                }
            }
        });
    }
}

export function getCardDetails(token) {
    console.log('getting cards now', global.cardNumbers)
    return async dispatch => {
        axios({
            method: 'post',
            url: `${BASE_URL}GetCardDetails`,
            data: global.cardNumbers,
            headers: {
                "Authorization": token
            },
            validateStatus: (status) => {
                return true;
            },
        }).catch(error => {
            console.log(error)
        }).then(response => {
            console.log("CARD DETAILS Response::", response.data, "API URL::", BASE_URL)
            dispatch({ type: MY_CARDS, data: response.data })

        });
    }
}

export function getPromotion(token) {
    return async dispatch => {
        dispatch({ type: IS_LOADING, isloading: true })
        axios({
            method: 'get',
            url: `${BASE_URL}/GetPromotions`,
            headers: {
                "Authorization": token
            },
            validateStatus: (status) => {
                return true;
            },
        }).catch(error => {
            dispatch({ type: IS_LOADING, isloading: false })
        }).then(response => {
            setDates(response.data.UpcomingPromotions)
            setDates(response.data.CurrentPromotions)
        });
    }
}

export function getCurrentPromotion(token) {
    return async dispatch => {
        axios({
            method: 'get',
            url: `${BASE_URL}GetCurrentPromotions`,
            headers: {
                "Authorization": token
            },
            validateStatus: (status) => {
                return true;
            },
        }).catch(error => {
            dispatch({ type: IS_LOADING, isloading: false })
        }).then(response => {
            setDates(response.data.CurrentPromotions)
            dispatch({ type: CURRENT_PROMOS, data: response.data.CurrentPromotions })
            dispatch({ type: IS_LOADING, isloading: false })

        });
    }
}

export function getUpcommingPromotion(token) {
    return async dispatch => {
        axios({
            method: 'get',
            url: `${BASE_URL}GetUpcomingPromotions`,
            headers: {
                "Authorization": token
            },
            validateStatus: (status) => {
                return true;
            },
        }).catch(error => {
            dispatch({ type: IS_LOADING, isloading: false })
        }).then(response => {
            setDates(response.data.UpcomingPromotions)
            dispatch({ type: UPCOMING_PROMOS, data: response.data.UpcomingPromotions })
        });
    }
}

function setDates(data) {
    data.forEach(function (element) {
        var currentDate = moment().format('YYYY-MM-DD');
        var discharge = moment(element.effectiveDate, 'YYYY-MM-DD');
        var result = discharge.diff(currentDate, 'days');
        if (result == 1) {
            element.message = "Today get"
        }
        else if (result == 2) {
            element.message = "Tomorrow get"
        }
        else {
            element.message = `On ${moment(element.effectiveDate).format("D/M/Y")} get`
        }
    });
}

export function VerifyCodeOtp(data, removeStates, navigate, navigate1, data2) {
    return async dispatch => {
        dispatch({ type: IS_LOADING, isloading: true })
        axios({
            method: "post",
            url: `${BASE_URL}verifyCode`,
            data: data,
            validateStatus: (status) => {
                return true
            }
        }).catch(error => {
           
            dispatch({ type: IS_LOADING, isloading: false })
        }).then(response => {
          
            dispatch({ type: IS_LOADING, isloading: false })

            if (response.data.Status == 200) {
                dispatch(RegisterUserFn(data2, navigate, navigate1))
                // dispatch({ type: IS_LOADING, isloading: false })
                removeStates()
            }
            else if (response.data.Status == 400) {
                // dispatch({ type: IS_LOADING, isloading: false })
                let errorText = "Something went wrong"
                errorText = response.data.Message
                Toast.show({
                    type: 'error',
                    text2: errorText,
                })
            }

            // dispatch({ type: IS_LOADING, isloading: false })


        })
    }
}
export function ResetPasswordConst(data, removeStates, navigate) {
    return async dispatch => {
        dispatch({ type: IS_LOADING, isloading: true })
        axios({
            method: "POST",
            url: `${BASE_URL}ResetPassword`,
            data: data,
            validateStatus: (status) => {
                return true
            }
        }).catch(error => {
            dispatch({ type: IS_LOADING, isloading: false })

        }).then(response => {
            dispatch({ type: IS_LOADING, isloading: false })
            if (response.data.Response.error == "EmailNotRegistered") {
                Toast.show({
                    type: 'error',
                    text1: 'Alert!',
                    text2: "Email is not registered",
                })
            }
            else if (response.data.Response.error == "undefined") {
                Toast.show({
                    type: 'error',
                    text1: 'Alert!',
                    text2: "Parameter is missing",
                })
            }
            else if (response.data.Response.error == "EmailNotConfirmed") {
                Toast.show({
                    type: 'error',
                    text1: 'Alert!',
                    text2: "Email is not confirmed",
                })
            }
            else {
                removeStates()
                navigate()
                dispatch({ type: IS_LOADING, isloading: false })
            }
        })
    }
}
export function MissingContactForm(data, token, removeStates, navigate) {
    return async dispatch => {
        dispatch({ type: IS_LOADING, isloading: true })
        axios({
            method: "post",
            url: `${BASE_URL}ContactFormMissingPoints`,
            headers: {
                "Authorization": token
            },
            data: data,
            validateStatus: (status) => {
                return true;
            },
        }).catch(error => {
            dispatch({ type: IS_LOADING, isloading: false })
        }).then(response => {
            // console.log("missing points res\n\n", response.data)
            // console.log("missing \n\n", response)
            if (response.data.Message == "Wrong number of segments") {
                Toast.show({
                    type: 'info',
                    text1: 'Alert!',
                    text2: "Something went wrong",
                })
                dispatch({ type: IS_LOADING, isloading: false })

            }
            else {
                dispatch({ type: IS_LOADING, isloading: false })
                removeStates()
                navigate()

            }
        })
    }
}
export function getLocation(token) {

    return async dispatch => {
        dispatch({ type: IS_LOADING, isloading: true })
        axios({
            method: 'get',
            url: `${BASE_URL}GetLocations`,
            headers: {
                "Authorization": token
            },
            validateStatus: (status) => {
                return true;
            },
        }).catch(error => {
        }).then(response => {
            console.log("GETTING LOCATION",)

            response.data.Markers.forEach(element => {
                element["color"] = false
            });
            dispatch({ type: LOCATIONPARAMS, data: response.data.Markers })
            dispatch({ type: IS_LOADING, isloading: false })
        });
    }
}




export async function getCancoLocations(token) {

    try {
        const res = await axios({
            method: 'get',
            url: `${BASE_URL}GetLocations`,
            headers: {
                "Authorization": token
            },
            validateStatus: (status) => {
                return true;
            },
        });

        return res.data.Markers;
    } catch (err) {

        console.log("error", err)
        return err;
    }
}

var splitArr = "";

export function GetSpecificLocation(token, locationId) {
    return async dispatch => {
        dispatch({ type: IS_LOADING, isloading: true })
        axios({
            method: 'get',
            url: `${BASE_URL}GetSpecificLocation/${locationId}`,
            headers: {
                "Authorization": token
            },
            validateStatus: (status) => {
                return true;
            },
        }).catch(error => {
        }).then(response => {
            var amenityStat = [
                {
                    name: '',
                    img: '',
                }
            ]
            splitArr = response.data.Location[0].amenityIds;
            var myArr = splitArr.split(",");
            for (let i = 0; i < myArr.length; i++) {
                var arrayTOpush = {}
                arrayTOpush['name'] = myArr[i]
                amenityStat.push(arrayTOpush);
            }
            amenityStat.splice(0, 1);
            splitArr = ""
            myArr = ""
            console.log("amenitystat", amenityStat)
            dispatch({ type: CUSTOMARR, data: amenityStat })
            response.data.StoreHours.forEach(element => {
                if (element.dayId == '1')
                    element.day = 'Monday'
                if (element.dayId == '2')
                    element.day = 'Tuesday'
                if (element.dayId == '3')
                    element.day = 'Wednesday'
                if (element.dayId == '4')
                    element.day = 'Thursday'
                if (element.dayId == '5')
                    element.day = 'Friday'
                if (element.dayId == '6')
                    element.day = 'Saturday'
                if (element.dayId == '7')
                    element.day = 'Sunday'
            });

            dispatch({ type: GETSPECIFICLOCATION, data: response.data })
            dispatch({ type: IS_LOADING, isloading: false })


        });
    }
}
export function AddCardCanco(data, token, navigate) {
    return async dispatch => {
        dispatch({ type: IS_LOADING, isloading: true })
        axios({
            method: "post",
            url: `${BASE_URL}AddNewCard`,
            headers: {
                "Authorization": token
            },
            data: data,
            validateStatus: (status) => {
                return true;
            },
        }).catch(error => {
            dispatch({ type: IS_LOADING, isloading: false })
        }).then(response => {

            console.log("add card response::", response.data)

            dispatch({ type: IS_LOADING, isloading: false })
            if (response.data.Response.error == "AckrIDInvalid") {
                Toast.show({
                    type: 'error',
                    text2: "Card is not valid",
                })
            }
            else if (response.data.Response.error == "CardAlreadyRegistered") {
                Toast.show({
                    type: 'error',
                    text2: "Card is already registered",
                })
            }
            else if (response.data.Response.error == "CardInvalid") {
                Toast.show({
                    type: 'error',
                    text2: "Card is invalid",
                })
            }
            else if (response.data.Response.error == "CardNotActive") {
                Toast.show({
                    type: 'error',
                    text2: "Card is not activated",
                })
            }
            else if (response.data.Response.error == "EmailInvalid") {
                Toast.show({
                    type: 'error',
                    text2: "Email is not valid",
                })
            }
            else if (response.data.Response.error == "CardInvalidForBusiness") {
                Toast.show({
                    type: 'error',
                    text2: "Card is invalid for business",
                })
            }
            else if (response.data.Response.error) {
                Toast.show({
                    type: 'error',
                    text2: "Something went wrong!",
                })
            }
            else {
                navigate()
                dispatch({ type: IS_LOADING, isloading: false })
            }
        })
    }
}

export function EditCardCanco(data, token, navigate) {
    return async dispatch => {
        console.log("should call api for edit", data, token)
        // dispatch({ type: IS_LOADING, isloading: true })       
    }
}

export function RemoveCancoCard(data, token, success, failure) {
    console.log(`${BASE_URL}RemoveCard/${data} - Remove card url`);
    return async dispatch => {
        // dispatch({ type: IS_LOADING, isloading: true })
        axios({
            method: "post",
            url: `${BASE_URL}RemoveCard/${data}`,
            headers: {
                "Authorization": token
            },
            validateStatus: (status) => {
                return true;
            },
        }).catch(error => {
            console.log(error)
            // dispatch({ type: IS_LOADING, isloading: false })
            failure()
        }).then(response => {
            // dispatch({ type: IS_LOADING, isloading: false })
            console.log(response.data)
            if (response.data.Status == 200) {
                success()
            }
            else {
                Toast.show({
                    type: 'error',
                    text2: response.data.Response.error,
                })
                failure()
            }
        })
    }
}

export function ContactUsMess(data, removeStates, token, navigate) {
    return async dispatch => {
        dispatch({ type: IS_LOADING, isloading: true })
        axios({
            method: "post",
            url: `${BASE_URL}ContactUs`,
            headers: {
                "Authorization": token
            },
            data: data,
            validateStatus: (status) => {
                return true;
            },
        }).catch(error => {
            dispatch({ type: IS_LOADING, isloading: false })
        }).then(response => {
            console.log("contact us Response::", response.data)
            dispatch({ type: IS_LOADING, isloading: false })
            console.log("contact", response.data)
            removeStates()
            navigate()
            Toast.show({
                type: 'info',
                text2: "We've recieved your message. Thank you!",
            })
            dispatch({ type: IS_LOADING, isloading: false })
        })
    }
}

export function TransferFundBalance(data, removeStates, token, navigate) {
    return async dispatch => {
        dispatch({ type: IS_LOADING, isloading: true })
        axios({
            method: "post",
            url: `${BASE_URL}TransferFunds`,
            headers: {
                "Authorization": token
            },
            data: data,
            validateStatus: (status) => {
                return true;
            },
        }).catch(error => {
            console.log(error)
            dispatch({ type: IS_LOADING, isloading: false })
        }).then(response => {
            console.log(response.data)
            dispatch({ type: IS_LOADING, isloading: false })
            if (response.data.Status == 201) {
                removeStates()
                dispatch({ type: TRANSFERFUNDS, data: response.data })
                navigate()
            }
            else {
                let errorText = "Something went wrong"
                if (response.data.Response.error == "CardInvalid")
                    errorText = "Card is invalid"
                else if (response.data.Response.error == "FailedFundTransfer")
                    errorText = "Failed to transfer funds"
                else if (response.data.Response.error == "CardNotActive")
                    errorText = "Card is not active"
                else if (response.data.Response.error == "CannotUseSameCards")
                    errorText = "Cannot use same cards"
                else if (response.data.Response.error == "CardsFromDifferentPrograms")
                    errorText = "Cards are from different programs"
                else if (response.data.Response.error == "CardNotRegistered")
                    errorText = "Card is not registered"
                else if (response.data.Response.error == "CardsRegisteredToDifferentUsers")
                    errorText = "Card is registered to a different user"
                else if (response.data.Response.error == "CardholderInvalid")
                    errorText = "Card holder is invalid"
                else if (response.data.Response.error == "PasswordInvalid")
                    errorText = "Password is invalid"
                else if (response.data.Response.error == "CardRestricted") {
                    errorText = "Card is restricted"
                }
                Toast.show({
                    type: 'error',
                    text2: errorText,
                })
            }
        })
    }
}
export function RecentTransaction(token, cardNumber, limit, callback) {
    return async dispatch => {
        dispatch({ type: IS_LOADING, isloading: true })
        axios({
            method: 'get',
            url: `${BASE_URL}GetRecentTransactions/${cardNumber}/${limit}`,
            headers: {
                "Authorization": token
            },
            validateStatus: (status) => {
                return true;
            },
        }).catch(error => {
            callback()
        }).then(response => {
            dispatch({ type: IS_LOADING, isloading: false })
            console.log(`${BASE_URL}GetRecentTransactions/${cardNumber}/${limit}`)
            dispatch({ type: RECENTTRANS, data: response.data.Response })
            callback()
        });
    }
}
export function UpdateUserProfile(data, token, navigate) {
    console.log("data", data)
    return async dispatch => {
        dispatch({ type: IS_LOADING, isloading: true })
        axios({
            method: 'post',
            url: `${BASE_URL}UpdateUserProfile`,
            headers: {
                "Authorization": token
            },
            data: data,
            validateStatus: (status) => {
                return true;
            },
        }).catch(error => {
            Toast.show({
                type: 'error',
                text2: error,
            })
        }).then(response => {
            dispatch({ type: IS_LOADING, isloading: false })
            dispatch({ type: CURRENT_USER, data: response.data.Response })
            navigate()
        });

    }
}
export function UpdatePasswordAC(data, token, navigation) {
    return async dispatch => {
        dispatch({ type: IS_LOADING, isloading: true })
        axios({
            method: 'post',
            url: `${BASE_URL}/UpdateUserPassword`,
            headers: {
                "Authorization": token
            },
            data: data
        }).catch(error => {
            dispatch({ type: IS_LOADING, isloading: false })
        })
            .then(response => {
                dispatch({ type: IS_LOADING, isloading: false })
                if (response.data.Status == 200) {
                    Toast.show({
                        type: 'success',
                        text2: "Password updated successfully",
                    })
                    navigation()
                }
                else if (response.data.Response.error == "PasswordInvalid") {
                    Toast.show({
                        type: 'error',
                        text2: "Incorrect password",
                    })
                }
                else if (response.data.Response.error == "EmailNotRegistered") {
                    Toast.show({
                        type: 'error',
                        text2: "Email is not registered",
                    })
                }
                else if (response.data.Response.error == "EmailNotConfirmed") {
                    Toast.show({
                        type: 'error',
                        text2: "Your email has not been confirmed yet",
                    })
                }
                else {
                    Toast.show({
                        type: 'error',
                        text2: "Something went wrong",
                    })
                }
            });

    }
}


export async function DeactivateAndRemoveCard(cardNumber, token) {
    console.log(`${BASE_URL}RemoveAndDeactivateCard/${cardNumber} - Deactivate card url`);
    try {
        const res = await axios({
            method: "get",
            url: `${BASE_URL}RemoveAndDeactivateCard/${cardNumber}`,
            headers: {
                "Authorization": token
            },
            validateStatus: (status) => {
                return true;
            },
        });
        return res.data;
    } catch (err) {
        return err;
    }

}

export async function SetDefaultCard(data, token) {
    console.log(`${BASE_URL}MarkAsDefaultCard/${data} - Mark Default card url`);
    try {
        const res = await axios({
            method: "post",
            url: `${BASE_URL}MarkAsDefaultCard`,
            headers: {
                "Authorization": token
            },
            data: data,
            validateStatus: (status) => {
                return true;
            },
        });
        return res.data;
    } catch (err) {
        return err;
    }

}


export async function GetDefaultCard(data, token) {
    try {
        const res = await axios({
            method: "post",
            url: `${BASE_URL}GetDefaultCard`,
            headers: {
                "Authorization": token
            },
            data: data,
            validateStatus: (status) => {
                return true;
            },
        });
        return res.data;
    } catch (err) {
        return err;
    }

}


export async function RemoveDefaultCard(data, token) {
    try {
        const res = await axios({
            method: "post",
            url: `${BASE_URL}RemoveDefaultCard`,
            headers: {
                "Authorization": token
            },
            data: data,
            validateStatus: (status) => {
                return true;
            },
        });
        return res.data;
    } catch (err) {
        return err;
    }

}