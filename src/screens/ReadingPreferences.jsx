import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { colors } from '../utils/colors'
import Slider from '@react-native-community/slider';

const ReadingPreferences = () => {

  const [fontSize,setFontSize] = useState(1);
  const steps = [0,0.25,0.5,0.75,1];

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Reading Preferences</Text>
      <Text style={styles.fieldText}>Page Color</Text>
      <View style={styles.colorContainer}>
        <View style={styles.colorRow}>
          <TouchableOpacity>
            <Text style={[styles.colorBox,{color:colors.white},{backgroundColor:colors.primary},{borderColor:colors.white}]}>Default</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={[styles.colorBox,{color:colors.white},{backgroundColor:colors.black},{borderColor:colors.black}]}>Black</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.colorRow}>
        <TouchableOpacity>
          <Text style={[styles.colorBox,{color:colors.black},{backgroundColor:colors.white},{borderColor:colors.white}]}>White</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={[styles.colorBox,{color:colors.black},{backgroundColor:colors.yellow},{borderColor:colors.yellow}]}>Yellow</Text>
        </TouchableOpacity>
        </View>
      </View>
      <Text style={styles.fieldText}>Font Size</Text>
      <View style={styles.sliderContainer}>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={1}
          step={0.25}
          value={fontSize}
          onValueChange={(value) => setFontSize(value)}
          minimumTrackTintColor={colors.white}
          maximumTrackTintColor={colors.white}
          thumbTintColor={colors.white}
        />
      </View>
      <Text style={styles.fieldText}>Font Type</Text>
      <View style={styles.fontTypesContainer}>
        <TouchableOpacity><Text style={[{fontFamily:'serif'},styles.fieldText]}>Serif</Text></TouchableOpacity>
        <TouchableOpacity><Text style={[{fontFamily:'sans-serif'},styles.fieldText]}>Sans-Serif</Text></TouchableOpacity>
        <TouchableOpacity><Text style={[{fontFamily:'monospace'},styles.fieldText]}>Mono-Space</Text></TouchableOpacity>
        <TouchableOpacity><Text style={[{fontFamily:'cursive'},styles.fieldText]}>Cursive</Text></TouchableOpacity>
      </View>
      <View style={styles.previewContainer}>
        <Text style={[styles.fieldText,{marginLeft:0}]}>Preview</Text>
        <Text style={[styles.fieldText,{marginLeft:0}]}>The quick brown fox jumps over the lazy dog</Text>
      </View>
    </View>
  )
}

export default ReadingPreferences

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:colors.primary,
  },
  heading:{
    fontSize:22,
    fontWeight:"bold",
    color:colors.white,
    marginLeft:50,
    marginBottom:40
},
fieldText:{
  fontSize:15,
  color:colors.white,
  fontWeight:"bold",
  marginLeft:50,
},
colorContainer:{
  flexDirection:'row',
  justifyContent:"center",
  marginVertical:20
},
colorRow:{
  flexDirection:'column'
},
colorBox:{
  width:140,
  height:70,
  borderWidth:2,
  textAlign:"center",
  paddingVertical:20,
  marginHorizontal:30,
  marginVertical:20,
  fontSize:15,
  fontWeight:"bold"
},
sliderContainer:{
 marginVertical:20,
 marginHorizontal:30
},
slider:{
  width: 350, 
  height: 40,
},
previewContainer:{
  borderWidth:2,
  borderColor:colors.white,
  marginHorizontal:30,
  height:100,
  justifyContent:"center",
  alignItems:'center',
  gap:10,
  marginVertical:20,
},
fontTypesContainer:{
  marginVertical:20,
  gap:10
}
})