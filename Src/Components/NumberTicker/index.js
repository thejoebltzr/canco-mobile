import React, { Component } from "react";
import { Animated, Dimensions, Easing, Platform, StyleSheet, Text, View } from "react-native";
import PropTypes from "prop-types";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


/*Fix for CNCO-46*/
const NumberTicker = ({ style, textSize = 35, textStyle, number, duration }) => {
     const mapToDigits = () => {
        return (number + '').split('').map((data) => {
            if (data === '.' || data === ',') {
                return (
                    <Text key={data} style={[textStyle, { fontSize: textSize }]}>{data}</Text>
                );
            }
            return (
                <View style={{height: textSize + 5,   alignItems:'center',borderWidth: 1, borderColor: '#fff',  marginRight: 4, borderRadius: 8, }}>
                    <TextTicker
                    key={data}
                    textSize={textSize}
                    textStyle={textStyle}
                    targetNumber={parseFloat(data, 10)}
                    duration={duration}
                />
                </View>
            );
        })
    };

    return (
        <View style={style}>
            <View style={{ flexDirection: 'row' }}>
                {mapToDigits()}
            </View>
        </View>
    );
};

class TextTicker extends Component {


    constructor(props) {
        super(props);
        this.state = {
            animatedValue: new Animated.Value(0),
            isAnimating: true,
            delay: 800,
            number: 1
        };
        const { targetNumber } = this.props;

        if (this.props.targetNumber > 5) {
            for (let i = 0; i <= targetNumber; i++) {
                this.numberList.push({ id: i });
            }
        } else {
            for (let i = 9; i >= targetNumber; i--) {
                this.numberList.push({ id: i });
            }
        }
    }

    componentDidMount() {
        this.startAnimation();
    }

    numberList = [];

    startAnimation = () => {
        const { animatedValue } = this.state;
        Animated.timing(animatedValue, {
            toValue: 1,
            duration: this.props.duration,
            easing: Easing.out(Easing.cubic),
            useNativeDriver: true,
        }).start(() => {
            // on finish..
        });
    };

    getInterpolatedVal = (val) => {
        return val.interpolate({
            inputRange: [0, 1],
            outputRange: [this.props.textSize * this.numberList.length, this.props.textSize * 0.2],
            extrapolate: 'clamp',
        });
    };


    renderNumbers = (styles) => {
        return this.numberList.map((data) => {
            return (
                <Text key={data.id} style={[this.props.textStyle, styles.text]}>{data.id}</Text>
            )
        });
    };

    render() {
        const { animatedValue } = this.state;
        const styles = generateStyles(this.props.textSize);

        return (
            <View style={styles.container}>
                <Animated.View style={{
                    transform: [{
                        translateY: this.getInterpolatedVal(animatedValue)
                    }]
                }}>
                    {this.renderNumbers(styles)}
                </Animated.View>
            </View>
        );
    }
}

TextTicker.defaultProps = {
    duration: 1800,
    targetNumber: 7,
    movingDown: true,
    textSize: 35,
};

TextTicker.propTypes = {
    duration: PropTypes.number,
    targetNumber: PropTypes.number,
    movingDown: PropTypes.bool,
    textSize: PropTypes.number,
    textStyle: PropTypes.any,
};

const generateStyles = (textSize) => StyleSheet.create({
    container: {
        width: textSize * 0.68,
        height: textSize,
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'flex-end',
        borderColor: '#fff',
    },
    text: {
        fontSize: textSize ,      
        lineHeight: textSize ,
        top: -6
    },

  
});

export default NumberTicker;