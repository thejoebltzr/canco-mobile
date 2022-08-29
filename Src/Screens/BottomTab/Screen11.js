import React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import SegmentedControl from 'rn-segmented-control';

const AppRoot = () => {
  const [tabIndex, setTabIndex] = React.useState(1);
  
  const handleTabsChange = index => {
    setTabIndex(index);
    // tabIndex = tabIndex +1
  };
  const navigate =()=>{
navigation.navigate("Screen12")
  }
  return (
    <View style={styles.container}>
      {/* <Text style={styles.textStyle}>Hello,World !</Text> */}
      {/* <Text style={styles.textStyle}>Segmented Control with 2 labels</Text> */}
      {/* Default Segmented Control */}
      <SegmentedControl
        tabs={['Label', 'Label']}
        currentIndex={tabIndex}
        onChange={handleTabsChange}
        segmentedControlBackgroundColor='white'
        activeSegmentBackgroundColor='orange'
        activeTextColor='white'
        textColor='black'
        // width={Screen.Dimensions}
        
        paddingVertical={10}
        // onChange={() => { }}
        paddingVertical={6}
        containerStyle={{
          marginVertical: 20,
          borderRadius:30,
        }}
      />
     
      {/* <SegmentedControl
        tabs={['Shop', 'Explore']}
        currentIndex={tabIndex}
        onChange={handleTabsChange}
        segmentedControlBackgroundColor='#86c4fd'
        activeSegmentBackgroundColor='#0482f7'
        activeTextColor='white'
        textColor='black'
        paddingVertical={10}
        width={Dimensions.get('screen').width - 100}
        containerStyle={{
          marginVertical: 20,
        }}
        textStyle={{
          fontWeight: '300',
        }}
      /> */}
    </View >
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 16,
  },
  textStyle: {
    fontSize: 24,
    textAlign: 'center',
    paddingVertical: 10
  }
})


export default AppRoot;