import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { themes } from '../../Constant/theme';
import { CheckBox } from 'react-native-elements';
import { TERMS_ACCEPTED } from '../../Redux/constant';
import { useDispatch, useSelector } from 'react-redux';

export default function TermsCondition({ navigation }) {
    const dispatch = useDispatch()
    const { termsAccepted } = useSelector(({ authRed }) => authRed)
    const [checked, setChecked] = useState(termsAccepted)
    function updateCheckBox() {
        setChecked(!termsAccepted)
        dispatch({ type: TERMS_ACCEPTED, data: !termsAccepted })
    }

    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>

            <View style={styles.container}>
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={{ height: 36, width: 36, justifyContent: "center", alignItems: "center" }} >
                        <Image style={{ height: 15, width: 20, tintColor: '#000' }} resizeMode="contain" source={require("../../Images/backArrow.png")} />
                    </TouchableOpacity>
                    <Text style={styles.heading}>Terms and Conditions</Text>
                </View>
            </View>

            <ScrollView>
                <View style={styles.termsContainer}>
                    <Text style={styles.Contentheading}>Personal Information Protection Policy</Text>
                    <Text style={styles.content}>At Canco Petroleum Ltd. we are committed to providing our customers with exceptional service. One of our services is providing a customer loyalty program. As providing this service involves the collection, use and disclosure of some personal information about our customers, protecting their personal information is one of our highest priorities.

                        While we have always respected our customers privacy and safeguarded their personal information, we have strengthened our commitment to protecting personal information as a result of BC and Alberta’s Personal Information Protection Act (PIPA) and Canada’s Personal Information Protection and Electronic Documents Act (PIPEDA), which set out the ground rules for how businesses may collect, use and disclose personal information in the provinces we do business including BC, Alberta, Saskatchewan and Ontario.

                        We will inform our customers of why and how we collect, use and disclose their personal information, obtain their consent where required, and only handle their personal information in a manner that a reasonable person would consider appropriate in the circumstances.

                        This Personal Information Protection Policy, in compliance with the privacy laws, outlines the principles and practices we will follow in protecting customers’ personal information. Our privacy commitment includes ensuring the accuracy, confidentiality, and security of our customers’ personal information and allowing our customers to request access to, and correction of, their personal information.</Text>
                    <Text style={styles.Contentheading}>Scope of this Policy</Text>
                    <Text style={styles.content}>This Personal Information Protection Policy applies to Canco as well as to any service providers collecting, using or disclosing personal information on behalf of Canco.</Text>

                    <Text style={styles.Contentheading}>Definitions</Text>
                    <Text style={styles.content}>Personal Information – means information about an identifiable individual including name, home address, phone number, email address and date of birth. Personal information does not include contact information (described below).

                        Contact information – means information that would enable an individual to be contacted at a place of business and includes name, position name or title, business telephone number, business address, business email or business fax number. Contact information is not covered by this policy or PIPA / PIPEDA.

                        Privacy Officer – means the individual designated responsibility for ensuring that Canco complies with this policy and PIPA / PIPEDA.</Text>

                    <Text style={styles.Contentheading}>Policy 1 – Collecting Personal Information</Text>
                    <View style={styles.contentContainer}>
                        <Text style={styles.number} >1.1 </Text>
                        <Text style={styles.content}>Unless the purposes for collecting personal information are obvious and the customer voluntarily provides his or her personal information for those purposes, we will communicate the purposes for which personal information is being collected, in writing, before or at the time of collection.</Text>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                        <Text style={styles.number} >1.2 </Text>
                        <Text style={styles.content}>We will only collect customers information that is necessary to fulfill the following purposes:</Text>
                    </View>
                    <View style={styles.contentContainer}>
                        <Image style={styles.arrowIcon} resizeMode="contain" source={require("../../Images/arrow.png")} />
                        <Text style={styles.content}>To Enrol The Customer In A Loyalty Program;</Text>
                    </View>
                    <View style={styles.contentContainer}>
                        <Image style={styles.arrowIcon} resizeMode="contain" source={require("../../Images/arrow.png")} />
                        <Text style={styles.content}>To Verify Identity;</Text>
                    </View>
                    <View style={styles.contentContainer}>
                        <Image style={styles.arrowIcon} resizeMode="contain" source={require("../../Images/arrow.png")} />
                        <Text style={styles.content}>To Send Out Membership Information;</Text>
                    </View>
                    <View style={styles.contentContainer}>
                        <Image style={styles.arrowIcon} resizeMode="contain" source={require("../../Images/arrow.png")} />
                        <Text style={styles.content}>To Provide Information To Companies That Provide Support Services To Us (such As Our Loyal Program Vendor, Ackroo Canada Inc.) And That Help Us Communicate To You. These Companies May Use Information About You To Perform Their Functions On Our Behalf. Customers Can Review Ackroo’s Personal Information Privacy Policy Here;</Text>
                    </View>
                    <View style={styles.contentContainer}>
                        <Image style={styles.arrowIcon} resizeMode="contain" source={require("../../Images/arrow.png")} />
                        <Text style={styles.content}>Details About Your Internet Service Provider, Your Operating System, Browser Type, Domain Name, Internet Protocol (IP) Address, The Website That Referred You To Us, The Web Pages You Request, And The Date And Time Of Those Requests;</Text>
                    </View>
                    <View style={styles.contentContainer}>
                        <Image style={styles.arrowIcon} resizeMode="contain" source={require("../../Images/arrow.png")} />
                        <Text style={styles.content}>Our Collection Of Website Usage Information May Involve The Use Of Cookies.</Text>
                    </View>

                    <Text style={styles.Contentheading}>Policy 2 – Consent</Text>
                    <View style={styles.contentContainer}>
                        <Text style={styles.number} >2.1 </Text>
                        <Text style={styles.content}>We will obtain customers’ consent to collect, use or disclose personal information (except where, as noted below, we are authorized to do so without consent).</Text>
                    </View>
                    <View style={styles.contentContainer}>
                        <Text style={styles.number} >2.2 </Text>
                        <Text style={styles.content}>Consent can be provided in writing, electronically, through an authorized representative or it can be implied where the purpose for collecting using or disclosing the personal information would be considered obvious and the customer voluntarily provides personal information for that purpose.</Text>
                    </View>
                    <View style={styles.contentContainer}>
                        <Text style={styles.number} >2.3 </Text>
                        <Text style={styles.content}>Consent may also be implied where a customer is given notice and a reasonable opportunity to opt-out of his or her personal information being used for the marketing of new services or products, and the customer does not opt-out.</Text>
                    </View>
                    <View style={styles.contentContainer}>
                        <Text style={styles.number} >2.4 </Text>
                        <Text style={styles.content}>Subject to certain exceptions (e.g., the personal information is necessary to provide the service or product, or the withdrawal of consent would frustrate the performance of a legal obligation) customers can withhold or withdraw their consent for Canco to use their personal information in certain ways. A customer’s decision to withhold or withdraw their consent to certain uses of personal information may restrict our ability to provide a particular service or product.
                            If so, we will explain the situation to assist the customer in making the decision.</Text>
                    </View>
                    <View style={styles.contentContainer}>
                        <Text style={styles.number} >2.5 </Text>
                        <Text style={styles.content}>We may collect, use or disclose personal information without the customer’s knowledge or consent in the following limited circumstances:
                            When the collection, use or disclosure of personal information is permitted or required by law.</Text>
                    </View>
                    <Text style={styles.Contentheading}>Policy 3 – Using and Disclosing Personal Information</Text>
                    <View style={styles.contentContainer}>
                        <Text style={styles.number} >3.1 </Text>
                        <Text style={styles.content}>We will only use or disclose customer personal information where necessary to fulfill the purposes identified at the time of collection or for a purpose reasonably related to those purposes such as:</Text>
                    </View>
                    <View style={styles.contentContainer}>
                        <Image style={styles.arrowIcon} resizeMode="contain" source={require("../../Images/arrow.png")} />
                        <Text style={styles.content}>In The Event Of A Merger, Acquisition, Financing, Or Sale Of Assets Or Any Other Situation Involving The Transfer Of Some Or All Of Our Business Assets, Canco May Disclose Personal Information To Those Involved In The Negotiation Or Transfer;</Text>
                    </View>
                    <View style={styles.contentContainer}>
                        <Image style={styles.arrowIcon} resizeMode="contain" source={require("../../Images/arrow.png")} />
                        <Text style={styles.content}>To Share Aggregated Or Anonymized Information That Does Not Directly Identify You For Third-party Support Services Purposes;</Text>
                    </View>
                    <View style={styles.contentContainer}>
                        <Image style={styles.arrowIcon} resizeMode="contain" source={require("../../Images/arrow.png")} />
                        <Text style={styles.content}>To Provide Information To Companies That Provide Support Services To Us (such As Our Loyal Program Vendor, Ackroo Canada Inc.) And That Help Us Communicate To You. These Companies May Use Information About You To Perform Their Functions On Our Behalf. Customers Can Review Ackroo’s Personal Information Privacy Policy Here.</Text>
                    </View>
                    <View style={styles.contentContainer}>
                        <Text style={styles.number} >3.2 </Text>

                        <Text style={styles.content}>Cookies – When an individual visitor accesses our website to signup for our membership program, we may use a browser feature called a ‘cookie’ to collect information such as the type of Internet browser and operating system the visitor uses, the domain name of the website from which the visitor came, date and duration of the visit, number of visits, average time spent on our website, pages viewed and number of cookies accumulated. A cookie is a small text file containing a unique identification number that identifies the visitor’s browser, but not necessarily the visitor, to our computers each time our website is visited. Unless a visitor specifically informs us, we will not know who the individual visitors are. In addition to the identified purposes described in this policy, we may use this website information and share it with other organizations with whom we have a commercial relationship to measure the use of our website, to improve the functionality and content of the website and to facilitate usage by a visitor. Visitors can reset their browsers either to notify them when they have received a cookie or refuse to accept cookies. However, if a visitor refuses to accept cookies, he or she may not be able to use some of the features available on our website.</Text>
                    </View>
                    <View style={styles.contentContainer}>
                        <Text style={styles.number} >3.3 </Text>
                        <Text style={styles.content}>We will only use or disclose customer personal information where necessary to fulfill the purposes identified at the time of collection or for a purpose reasonably related to those purposes such as:</Text>
                    </View>
                    <View style={styles.contentContainer}>
                        <Text style={styles.number} >3.4 </Text>
                        <Text style={styles.content}>We will not sell customer lists or personal information to other parties.</Text>
                    </View>

                    <Text style={styles.Contentheading}>Policy 4 – Retaining Personal Information</Text>
                    <View style={styles.contentContainer}>
                        <Text style={styles.number} >4.1 </Text>
                        <Text style={styles.content}>If we use customer personal information to make a decision that directly affects the customer we will retain that personal information for at least one year so that the customer has a reasonable opportunity to request access to it.</Text>
                    </View>
                    <View style={styles.contentContainer}>
                        <Text style={styles.number} >4.2 </Text>
                        <Text style={styles.content}>Subject to policy 4.1, we will retain customer personal information only as long as necessary to fulfill the identified purposes or a legal or business purpose.</Text>
                    </View>
                    <Text style={styles.Contentheading}>Policy 5 - Access Personal Information</Text>
                    <View style={styles.contentContainer}>
                        <Text style={styles.number} >5.1 </Text>
                        <Text style={styles.content}>We will make reasonable efforts to ensure that customer personal information is accurate and complete where it may be used to make a decision about the customer or disclosed to another organization.</Text>
                    </View>
                    <View style={styles.contentContainer}>
                        <Text style={styles.number} >5.2 </Text>
                        <Text style={styles.content}>Customers may request correction to their personal information in order to ensure its accuracy and completeness. A request to correct personal information must be made in writing and provide sufficient detail to identify the personal information and the correction being sought. A request to correct personal information should be forwarded to the Privacy Officer.</Text>
                    </View>
                    <View style={styles.contentContainer}>
                        <Text style={styles.number} >5.3 </Text>
                        <Text style={styles.content}>If the personal information is demonstrated to be inaccurate or incomplete, we will correct the information as required and send the corrected information to any organization to which we disclosed the personal information in the previous year. If the correction is not made, we will note the customers’ correction request in the file.</Text>
                    </View>
                    <Text style={styles.Contentheading}>Policy 6 – Securing Personal Information</Text>
                    <View style={styles.contentContainer}>
                        <Text style={styles.number} >6.1 </Text>
                        <Text style={styles.content}>We are committed to ensuring the security of customer personal information in order to protect it from unauthorized access, collection, use, disclosure, copying, modification or disposal or similar risks.</Text>
                    </View>
                    <View style={styles.contentContainer}>
                        <Text style={styles.number} >6.2 </Text>
                        <Text style={styles.content}>The following security measures will be followed to ensure that customer personal information is appropriately protected such as:</Text>
                    </View>
                    <View style={styles.contentContainer}>
                        <Image style={styles.arrowIcon} resizeMode="contain" source={require("../../Images/arrow.png")} />
                        <Text style={styles.content}>Physically Securing Offices Where Personal Information Is Held;</Text>
                    </View>
                    <View style={styles.contentContainer}>
                        <Image style={styles.arrowIcon} resizeMode="contain" source={require("../../Images/arrow.png")} />
                        <Text style={styles.content}>The Use Of User IDs, Passwords, Encryption, Firewalls;</Text>
                    </View>
                    <View style={styles.contentContainer}>
                        <Image style={styles.arrowIcon} resizeMode="contain" source={require("../../Images/arrow.png")} />
                        <Text style={styles.content}>Restricting Employee Access To Personal Information As Appropriate (i.e., Only Those That Need To Know Will Have Access); And</Text>
                    </View>
                    <View style={styles.contentContainer}>
                        <Image style={styles.arrowIcon} resizeMode="contain" source={require("../../Images/arrow.png")} />
                        <Text style={styles.content}>Contractually Requiring Any Service Providers To Provide Comparable Security Measures.</Text>
                    </View>
                    <View style={styles.contentContainer}>
                        <Text style={styles.number} >6.3 </Text>
                        <Text style={styles.content}> We will use appropriate security measures when destroying customer’s personal information such as:</Text>
                    </View>
                    <View style={styles.contentContainer}>
                        <Image style={styles.arrowIcon} resizeMode="contain" source={require("../../Images/arrow.png")} />
                        <Text style={styles.content}>Shredding Documents; And</Text>
                    </View>
                    <View style={styles.contentContainer}>
                        <Image style={styles.arrowIcon} resizeMode="contain" source={require("../../Images/arrow.png")} />
                        <Text style={styles.content}>Deleting Electronically Stored Information.</Text>
                    </View>
                    <View style={styles.contentContainer}>
                        <Text style={styles.number} >6.4 </Text>
                        <Text style={styles.content}> We will continually review and update our security policies and controls as technology changes to ensure ongoing personal information security.</Text>
                    </View>
                    <Text style={styles.Contentheading}>Policy 7 – Providing Customers Access to Personal Information</Text>
                    <View style={styles.contentContainer}>
                        <Text style={styles.number} >7.1 </Text>
                        <Text style={styles.content}>Customers have a right to access their personal information, subject to limited exceptions.</Text>
                    </View>
                    <View style={styles.contentContainer}>
                        <Text style={styles.number} >7.2 </Text>
                        <Text style={styles.content}>A request to access personal information must be made in writing and provide sufficient detail to identify the personal information being sought. A request to access personal information should be forwarded to the Privacy Officer.</Text>
                    </View>
                    <View style={styles.contentContainer}>
                        <Text style={styles.number} >7.3 </Text>
                        <Text style={styles.content}>Upon request, we will also tell customers how we use their personal information and to whom it has been disclosed if applicable.</Text>
                    </View>
                    <View style={styles.contentContainer}>
                        <Text style={styles.number} >7.4 </Text>
                        <Text style={styles.content}>We will make the requested information available within 30 business days, or provide written notice of an extension where additional time is required to fulfill the request.</Text>
                    </View>
                    <View style={styles.contentContainer}>
                        <Text style={styles.number} >7.5 </Text>
                        <Text style={styles.content}>A minimal fee may be charged for providing access to personal information. Where a fee may apply, we will inform the customer of the cost and request further direction from the customer on whether or not we should proceed with the request.</Text>
                    </View>
                    <View style={styles.contentContainer}>
                        <Text style={styles.number} >7.6 </Text>
                        <Text style={styles.content}>If a request is refused in full or in part, we will notify the customer in writing, providing the reasons for refusal and the recourse available to the customer.</Text>
                    </View>
                    <Text style={styles.Contentheading}>Policy 8 – Questions and Complaints: The Role of the Privacy Officer or designated individual</Text>
                    <View style={styles.contentContainer}>
                        <Text style={styles.number} >8.1 </Text>
                        <Text style={styles.content}>The Privacy Officer is responsible for ensuring Canco’s compliance with this policy and the applicable privacy acts.</Text>
                    </View>
                    <View style={styles.contentContainer}>
                        <Text style={styles.number} >8.2 </Text>
                        <Text style={styles.content}>Customers should direct any complaints, concerns or questions regarding Canco’s compliance in writing to the Privacy Officer. If the Privacy Officer is unable to resolve the concern, the customer may also write to the provincial or federal Information and Privacy Commissioners.</Text>
                    </View>
                    <Text style={styles.Contentheading}>Contact information for Canco’s Privacy Officer:</Text>
                    <Text style={styles.content}>Satvir Panesar</Text>
                    <Text style={styles.content}>inquiry@cancopetroleum.ca</Text>
                    <View style={styles.cheboxContainer}>
                        <View style={styles.checkbox}>
                            <CheckBox
                                checkedIcon={<Image source={require('../../Images/checked.png')} style={styles.checkimg} resizeMode="contain" />}
                                uncheckedIcon={<Image source={require('../../Images/unchecked.png')} style={styles.checkimg} />}
                                checked={checked}
                                onPress={() => updateCheckBox()}
                            />
                        </View>
                       
                        <Text style={[styles.acceptTermsText, { color: termsAccepted === true ? themes.BlueColor1 : "#929292" }]}>I agree with Terms & Conditions </Text>
                    </View>
                </View>
            </ScrollView>
        </View>


    );
}
const styles = StyleSheet.create({
    container: {
        marginVertical: 40,
        marginHorizontal: 30,
    },
    termsContainer: {
        marginHorizontal: 25,
    },
    heading: {
        fontFamily: themes.F2_Family2,
        color: themes.BlueColor1,
        fontSize: 22,
        paddingLeft: "4%",
        paddingTop: ".5%"
    },
    checkbox: {
        height: 30,
        width: 30,
        backgroundColor: '#f3f3f3',
        borderRadius: 10
    },
    cheboxContainer: {
        flexDirection: 'row',
        marginHorizontal: 10,
        alignItems: 'center',
        marginVertical: 15
    },
    checkimg: {
        height: 20,
        width: 20,
        marginLeft: -15
    },
    content: {
        color: "#000",
        fontFamily: themes.F2_Family1,
        fontSize: 16,
        lineHeight: 25,
        opacity: .5,
        textAlign: 'justify',
        paddingTop: 5
    },
    subheading: {
        color: "#000",
        fontFamily: themes.F2_Family1,
        fontSize: 18,
        textAlign: 'justify',
    },
    Contentheading: {
        color: "#000",
        fontFamily: themes.F2_Family2,
        fontSize: 20,
        paddingTop: 10

    },
    number: {
        fontFamily: themes.F2_Family2,
        paddingTop: 7,
        fontSize: 16
    },
    contentContainer: {
        flexDirection: "row",
        paddingRight: 17
    },
    arrowIcon: {
        height: 25,
        width: 25,
        marginTop: "2%"
    },
    acceptTermsText: {
        paddingLeft: 10,
        fontSize: 16,
        fontWeight: '700',
        fontFamily: themes.F2_Family1
    },
})
