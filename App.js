/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import clone from 'lodash/clone';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  FlatList,
} from 'react-native';
import {Stopwatch} from 'react-native-stopwatch-timer';

const Item = ({item}) => {
  console.log('🚀 ~ file: App.js ~ line 14 ~ Item ~ item', item);
  return (
    <View style={styles.item}>
      <Text style={styles.textItem}>{`Lap #${item.id}`}</Text>
      <Text style={styles.textItem}>{`${item.time}`}</Text>
    </View>
  );
};

const App = () => {
  const [isStopwatchStart, setIsStopwatchStart] = useState(false);
  const [resetStopwatch, setResetStopwatch] = useState(false);
  const [lap, setLap] = useState([]);
  const [currentTime, setCurrentTime] = useState('');
  const renderItem = ({item}) => <Item item={item} />;
  return (
    <View style={styles.container}>
      <View style={styles.sectionStyle}>
        <Stopwatch
          laps
          secs
          start={isStopwatchStart}
          reset={resetStopwatch}
          options={options}
          getTime={time => {
            setCurrentTime(time);
            if (resetStopwatch === true && currentTime) {
              const oldLap = clone(lap);
              setLap([
                ...oldLap,
                {id: oldLap?.length ?? 0 + 1, time: currentTime},
              ]);
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
            style={styles.buttonView}>
            <Text style={styles.buttonText}>LAP</Text>
          </TouchableHighlight>
          <TouchableHighlight
            onPress={() => {
              setIsStopwatchStart(!isStopwatchStart);
              setResetStopwatch(false);
            }}
            style={[
              styles.buttonView,
              !isStopwatchStart ? styles.buttonStart : styles.buttonStop,
            ]}>
            <Text
              style={!isStopwatchStart ? styles.textStart : styles.textStop}>
              {!isStopwatchStart ? 'START' : 'STOP'}
            </Text>
          </TouchableHighlight>
        </View>
        <View>
          {!!lap.length && (
            <FlatList
              style={styles.list}
              data={lap}
              renderItem={renderItem}
              keyExtractor={item => item.id}
            />
          )}
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
  list: {
    marginTop: '40%',
  },
  item: {
    backgroundColor: 'silver',
    padding: 8,
    marginVertical: 2,
    marginHorizontal: 4,
    display: 'flex',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  textItem: {
    fontSize: 20,
  },
  title: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    padding: 20,
  },
  sectionStyle: {
    alignItems: 'center',
    marginTop: 200,
    height: '100%',
    width: '100%',
    position: 'relative',
  },
  buttonText: {
    fontSize: 16,
  },
  containerButton: {
    zIndex: 999,
    flexDirection: 'row',
    width: '100%',
    flex: 1,
    justifyContent: 'space-around',
    marginTop: 50,
  },
  buttonStop: {
    borderColor: 'red',
  },
  buttonStart: {
    borderColor: 'green',
  },
  textStop: {
    color: 'red',
    fontSize: 16,
  },
  textStart: {
    color: 'green',
    fontSize: 16,
  },
  buttonView: {
    height: 100,
    width: 100,
    padding: 20,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    color: 'violet',
  },
});

const options = {
  container: {
    padding: 5,
    zIndex: 999,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
  },
  text: {
    marginLeft: 7,
    fontSize: 70,
    color: 'black',
  },
};
export default App;
