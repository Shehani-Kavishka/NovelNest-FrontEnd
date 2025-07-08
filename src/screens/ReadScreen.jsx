import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { colors } from '../utils/colors'
import Icon from 'react-native-vector-icons/FontAwesome';
import { Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import BookSettingsBar from '../components/BookReactionsBar';

const ReadScreen = () => {

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>

        <Text style={styles.headingText}>Chapter 01</Text>

        <View style={styles.statsContainer}>
            <View style={styles.statsSubContainer}>
                <Icon name="eye" size={15} color={colors.white}/>
                <Text style={styles.textStyle}>155K Reads</Text>
            </View>

            <View style={styles.statsSubContainer}>
                <Icon name="star" size={15} color={colors.white}/>
                <Text style={styles.textStyle}>4.58K Rates</Text>
            </View>

            <View style={styles.statsSubContainer}>
                <Icon name="list" size={15} color={colors.white}/>
                <Text style={styles.textStyle}>14 Parts</Text>
            </View>
        </View>

        <View>
        <Text style={styles.storyChapterPara}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris vestibulum massa sollicitudin lacus rutrum, ut vulputate tortor dictum. Suspendisse porta elementum pharetra. Vestibulum ornare auctor tortor, in auctor eros ornare eget. Nunc lobortis velit ut porttitor eleifend. Etiam ac odio sollicitudin, laoreet dolor sit amet, egestas ex. Nunc nec sodales sapien, ut tempus lectus. Aenean volutpat dictum dui, nec faucibus nisi imperdiet et. Nulla sed mollis odio. Aenean vitae faucibus eros. Proin ultricies malesuada ante, non suscipit justo eleifend faucibus. Morbi elementum quis ante quis consectetur. Sed non urna arcu. Duis mollis nisi sit amet nibh laoreet ultricies. Nunc quis ante metus.
        </Text>
        
        <Text style={styles.storyChapterPara}>
          Etiam turpis sem, dignissim ac magna sed, hendrerit placerat mi. Morbi et ex quis turpis egestas scelerisque. In tellus tellus, ultricies at velit ut, consectetur placerat eros. Integer sollicitudin vel nulla at tincidunt. Vivamus ornare varius tortor. Pellentesque vestibulum purus vel urna aliquet, sit amet viverra ex maximus. Vivamus dignissim tortor eget sollicitudin finibus. Nam eu vestibulum est. Praesent condimentum justo lorem. Quisque eu semper mi. Morbi cursus dolor sit amet turpis convallis, nec euismod purus cursus. Aliquam nibh lacus, dictum vel felis vitae, porttitor laoreet magna. Sed eget urna ipsum.
        </Text>
        
        <Text style={styles.storyChapterPara}>
          Donec et est volutpat, gravida diam sit amet, rhoncus dolor. Nunc id tempor ligula, quis bibendum eros. Nullam commodo tincidunt sodales. Donec quis augue molestie, sollicitudin neque a, euismod eros. Ut sit amet elementum urna, eget consequat orci. Quisque a mi eget ex convallis fringilla. Donec ut velit nec ligula rhoncus aliquet eu sed justo.
        </Text>
        
        <Text style={styles.storyChapterPara}>
          Proin nunc arcu, hendrerit eget varius semper, ornare non neque. Etiam imperdiet aliquam neque quis bibendum. Cras at venenatis odio, vitae vestibulum elit. Mauris dolor lorem, euismod et sapien laoreet, condimentum dictum lectus. Aliquam viverra eu tellus nec dictum. Donec ac congue eros. Vestibulum nec interdum nibh. Duis mollis lacus cursus erat laoreet tempus. Ut vitae lacinia erat. Sed ut leo eros. Pellentesque mollis consectetur laoreet. Sed nunc orci, faucibus in blandit vel, imperdiet ut tortor.
        </Text>
        
        <Text style={styles.storyChapterPara}>
          Phasellus gravida malesuada eleifend. Praesent consequat, orci eu laoreet porta, justo lectus maximus nisi, non fermentum ligula lacus nec massa. Sed maximus lorem nec orci convallis, ac luctus ex congue. Morbi lacinia iaculis quam vel pellentesque. Nam volutpat consequat erat facilisis feugiat. Morbi justo ipsum, aliquet tincidunt ipsum nec, sodales tempor dui. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum efficitur at leo id blandit. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nunc iaculis ut odio in gravida. Vivamus vulputate interdum dui ut suscipit. Duis tristique lacus eleifend mi viverra semper. Ut ac ultrices velit, non tempor massa. Curabitur in nisl iaculis orci scelerisque pellentesque. Sed molestie justo sed pellentesque sagittis. Proin non porta magna, vel consectetur urn.
        </Text>

        <Text style={styles.storyChapterPara}>
          Phasellus gravida malesuada eleifend. Praesent consequat, orci eu laoreet porta, justo lectus maximus nisi, non fermentum ligula lacus nec massa. Sed maximus lorem nec orci convallis, ac luctus ex congue. Morbi lacinia iaculis quam vel pellentesque. Nam volutpat consequat erat facilisis feugiat. Morbi justo ipsum, aliquet tincidunt ipsum nec, sodales tempor dui. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum efficitur at leo id blandit. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nunc iaculis ut odio in gravida. Vivamus vulputate interdum dui ut suscipit. Duis tristique lacus eleifend mi viverra semper. Ut ac ultrices velit, non tempor massa. Curabitur in nisl iaculis orci scelerisque pellentesque. Sed molestie justo sed pellentesque sagittis. Proin non porta magna, vel consectetur urn.
        </Text>

        <Text style={styles.storyChapterPara}>
          Phasellus gravida malesuada eleifend. Praesent consequat, orci eu laoreet porta, justo lectus maximus nisi, non fermentum ligula lacus nec massa. Sed maximus lorem nec orci convallis, ac luctus ex congue. Morbi lacinia iaculis quam vel pellentesque. Nam volutpat consequat erat facilisis feugiat. Morbi justo ipsum, aliquet tincidunt ipsum nec, sodales tempor dui. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum efficitur at leo id blandit. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nunc iaculis ut odio in gravida. Vivamus vulputate interdum dui ut suscipit. Duis tristique lacus eleifend mi viverra semper. Ut ac ultrices velit, non tempor massa. Curabitur in nisl iaculis orci scelerisque pellentesque. Sed molestie justo sed pellentesque sagittis. Proin non porta magna, vel consectetur urn.
        </Text>
        
        <Text style={styles.storyChapterPara}>
          Donec et est volutpat, gravida diam sit amet, rhoncus dolor. Nunc id tempor ligula, quis bibendum eros. Nullam commodo tincidunt sodales. Donec quis augue molestie, sollicitudin neque a, euismod eros. Ut sit amet elementum urna, eget consequat orci. Quisque a mi eget ex convallis fringilla. Donec ut velit nec ligula rhoncus aliquet eu sed justo.
        </Text>

        </View>

        <View style={styles.nextButtonContainer}>
        <TouchableOpacity style={styles.nextButton}>
          <Text style={styles.nextText}>Next Chapter </Text>
          <Icon name={'angle-right'} size={30} color={colors.white}/>
        </TouchableOpacity>
        </View>

      </ScrollView>

      <BookSettingsBar/>
    </View>
  )
}

export default ReadScreen

const styles = StyleSheet.create({
    container:
    {
        flex:1,
        backgroundColor:colors.primary,
        justifyContent:'center',
        alignItems:'center'
    },
    headingText:
    {
        fontSize:22,
        fontWeight:"bold",
        color:colors.white,
        textAlign:'center'
    },
    statsContainer:{
        flexDirection:'row',
        gap:30,
        marginVertical:25,
        justifyContent:'center'
      },
      statsSubContainer:{
        flexDirection:'row',
        alignItems:'center',
        gap:5
      },
      textStyle:{
        fontSize:13,
        fontWeight:'bold',
        color:colors.white,
        textAlign:'justify'
      },
      storyChapterPara:{
        width:350,
        color:colors.white,
        fontSize:13,
        textAlign:'justify',
        marginVertical:20,
        lineHeight:30
      },
      nextText:{
        color:colors.white,
        fontSize:20,
        fontWeight:'bold'
      },
      nextButtonContainer:{
        alignItems:'flex-end',
        marginTop:10,
        marginBottom:100
      },
      nextButton:{
        gap:20,
        flexDirection:'row',
      },
      
})