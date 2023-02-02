/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import React, { useState } from 'react';
import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import {
  accelerometer,
  gyroscope,
  setUpdateIntervalForType,
  SensorTypes,
  magnetometer,
  barometer
} from "react-native-sensors";
import { map, filter } from "rxjs/operators";
const SCREEN_WIDTH=Dimensions.get('window').width
function App() {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  const [speed,setSpeed]=useState(null);
  const [isSpeed,setisSpeed]=useState(false)
  const [angle,setAngle]=useState(null);
  const [isAngle,setisAngle]=useState(false);
  const [magnet,setMagnet]=useState(null);
  const [isMagnet,setisMagnet]=useState(false);
  const [pressure,setPressure]=useState(null);
  const [isPressure,setisPressure]=useState(false)
  setUpdateIntervalForType(SensorTypes.accelerometer, 1000); // defaults to 100ms
  const subscriptionSpeed = accelerometer
    .pipe(map(({ x, y, z }) => x + y + z), filter(speed => speed > 0))
    .subscribe(
      speed => {
        setSpeed(speed);
      },
      error => {
        console.log("The sensor is not available");
      }
    );
    const subscriptionAngle = gyroscope
    .pipe(map(({ x, y, z }) => x + y + z), filter(angle=>angle!==null))
    .subscribe(
      angle => {
        setAngle(angle);
      },
      error => {
        console.log("🚀 ~ file: App.js:61 ~ App ~ error", error)
      }
    );
    const subscriptionMagnet = magnetometer
    .pipe(map(({ x, y, z }) => x + y + z), filter(magnet=>magnet!==null))
    .subscribe(
      magnet => {
        setMagnet(magnet);
      },
      error => {
        console.log("🚀 ~ file: App.js:61 ~ App ~ error", error)
      }
    );
    const subscriptionPressure = barometer
    .pipe(map(({pressure }) =>pressure), filter(pressure=>pressure!==null))
    .subscribe(
      pressure => {
        setPressure(pressure);
      },
      error => {
        console.log("🚀 ~ file: App.js:61 ~ App ~ error", error)
      }
    );
  setTimeout(() => {
    subscriptionSpeed.unsubscribe();
    subscriptionAngle.unsubscribe();
    subscriptionMagnet.unsubscribe();
    subscriptionPressure.unsubscribe();
  }, 1000);

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
            <View style={{
              width:SCREEN_WIDTH,
              padding:10,
              justifyContent:'center',
              alignItems:'center',
              backgroundColor:'#582cfc'
            }}>
              <Text style={{
                color:'#FFFFFF',
                fontSize:20,
                fontWeight:'600'
              }}>Sensors</Text>
            </View>
            <View style={{
              // backgroundColor:'red',
              padding:20,
            }}>
              <View style={{
                flexDirection:'row',
                justifyContent:'space-between'
              }}>
                <TouchableOpacity
                onPress={()=>{
                  setisSpeed(true);
                  setisAngle(false);
                  setisMagnet(false);
                  setisPressure(false);
                }}
                 style={styles.btn}>
                  <Text style={styles.btnText}>Accelerometer</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                onPress={()=>{
                  setisSpeed(false);
                  setisAngle(true);
                  setisMagnet(false);
                  setisPressure(false);
                }}
                style={styles.btn}>
                  <Text style={styles.btnText}>Gyroscope</Text>
                </TouchableOpacity>
              </View>
              <View style={{
                flexDirection:'row',
                justifyContent:'space-between',
                marginVertical:20
              }}>
                <TouchableOpacity 
                  onPress={()=>{
                    setisSpeed(false);
                    setisAngle(false);
                    setisMagnet(true);
                    setisPressure(false);
                  }}
                style={styles.btn}>
                  <Text style={styles.btnText}>magnetometer</Text>
                </TouchableOpacity>
                <TouchableOpacity
                 onPress={()=>{
                  setisSpeed(false);
                  setisAngle(false);
                  setisMagnet(false);
                  setisPressure(true);
                }}
                style={styles.btn}>
                  <Text style={styles.btnText}>barometer</Text>
                </TouchableOpacity>
              </View>
             {isSpeed==true&& 
              <View>
                {speed!==null?
                <Text style={styles.btnText}>Your device speed is {speed}</Text>:
                <Text style={styles.errorText}>Accelerometer Sensor is not available in your device</Text>}
              </View>
            }
            {isAngle==true&& <View>
              {angle!==null?
              <Text style={styles.btnText}>Angular measurement is {angle}</Text>:
              <Text style={styles.errorText}>Gyroscope Sensor is not available in your device</Text>}
              </View>}
              {isMagnet==true&& 
              <View>
                {magnet!==null?
                <Text style={styles.btnText}>Your magnetic field measurement is {magnet}</Text>:
                <Text style={styles.errorText}>magnetometer Sensor is not available in your device</Text>}
              </View>
            }
            {isPressure==true&& 
              <View>
                {pressure!==null?
                <Text style={styles.btnText}>Air pressure is {pressure}</Text>:
                <Text style={styles.errorText}>barometer Sensor is not available in your device</Text>}
              </View>
            }
            </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  btn: {
    padding:10,
    width:(SCREEN_WIDTH-50)/2,
    borderColor:'#582cfc',
    borderWidth:1,
    borderRadius:20,
    justifyContent:'center',
    alignItems:'center'
  },
  btnText: {
    color:'#582cfc',
    fontSize:12,
    fontWeight:'600',
    textTransform:'uppercase'
  },
  errorText: {
    color:'red',
    fontSize:12,
    fontWeight:'600',
    textTransform:'uppercase'
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});
export default App;
