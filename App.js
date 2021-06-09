/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React,{useState,useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TouchableHighlight,
  FlatList,
} from 'react-native';
import {Stopwatch, Timer} from 'react-native-stopwatch-timer';


const App = () => {
  const [isTimerStart, setIsTimerStart] = useState(false);
  const [isStopwatchStart, setIsStopwatchStart] = useState(false);
  const [timerDuration, setTimerDuration] = useState(90000);
  const [resetTimer, setResetTimer] = useState(false);
  const [resetStopwatch, setResetStopwatch] = useState(false);
  const [data, setData] = useState([]);
  const [save, setSave] = useState([])


  const Item =()=>{
    return (
      <Text></Text>
    )
  }

  
  const renderItem =({item})=>{
    console.log(item.save)
      return <Item></Item>
  }
  return (
    
       <View style={styles.container}>
        <View style={styles.sectionStyle}>
          <Stopwatch
            laps
            secs
            start={isStopwatchStart}
            //To start
            reset={resetStopwatch}
            //To reset
            options={options}
            //options for the styling
            getTime={(time) => {
              const myArr =[];
              setSave(time);
              if(resetStopwatch === true){
                myArr.push({id:data.length + 1, save});
                setData(myArr.concat(data));
                setResetStopwatch(false);
              }
            }}
          />
         <View style={styles.containerButton}>
          <TouchableHighlight
            onPress={() => {
              setIsStopwatchStart(false);
              setResetStopwatch(true);
            }}
            style={styles.buttonView}
            >
            <Text style={styles.buttonText}>LAB</Text>
          </TouchableHighlight>
          <TouchableHighlight
            onPress={() => {
              setIsStopwatchStart(!isStopwatchStart);
              setResetStopwatch(false);
              
            }}
            style={[styles.buttonView, !isStopwatchStart ? styles.buttonStart : styles.buttonStop]}
            >
            <Text style={!isStopwatchStart ? styles.textStart : styles.textStop}>
              {!isStopwatchStart ? 'START' : 'STOP'}
            </Text>
          </TouchableHighlight>
         </View>
         <View style={{backgroundColor:"orange", height: "10%"}}>
         <FlatList
         data={save}
          renderItem={renderItem}
          
        ></FlatList>
         </View>
        </View>
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    padding: 20,
  },
  sectionStyle: {
    alignItems: 'center',
    marginTop:200,
    height:"100%",
    width:"100%",
    position: 'relative',

  },
  buttonText: {
    fontSize: 20,
    marginTop: 10,
    
  },
  containerButton:{
    flexDirection: 'row',
    width:'100%',
    flex: 0.5,
    justifyContent:'space-around',
    marginTop:50,
  },
  buttonStop: {
    borderColor:"red",
  },
  buttonStart:{
    borderColor:"green",
  },
  textStop:{
    color:'red',
    fontSize:15,
  },
  textStart:{
    color:'green',
    fontSize:15,
  },
  buttonView:{
    height:"30%",
    minWidth:100,
    padding:20,
    borderRadius:200,
    justifyContent:'center',
    alignItems: 'center',
    borderWidth:2,
    color:"violet"
  
  }

});

const options = {
  container: {
    padding: 5,
    borderRadius: 5,
    width: '100%',
    alignItems:'center',
    
  },
  text: {
    fontSize: 25,
    color: '#FFF',
    marginLeft: 7,
    fontSize:70,
    color:'black',
  },
};
export default App;
