import {
  ActivityIndicator,
  Image,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Card from '../components/Card';

// Assets
import ProfileImg from '../assets/profileimg.jpeg';
import LightOn from '../assets/lightbulbon.png';
import LightOff from '../assets/lightbulboff.png';
import DoorClose from '../assets/doorclose.png';
import DoorOpen from '../assets/dooropen.png';
import PowerSocket from '../assets/powersocket.png';
import PowerSocketOff from '../assets/powersocketoff.png';
import useGadgets from '../hooks/useGadgets';

const DashboardScreen = () => {
  const {
    gadgetsLoading,
    setGadgetsLoading,
    allGadgets,
    setAllGadgets,
    groundLight,
    setGroundLight,
    level1Light,
    setLevel1Light,
    door,
    setDoor,
    powerSocket,
    setPowerSocket,
    allLights,
    setAllLights,
    ws,
    groundLoading,
    setGroundLoading,
    level1Loading,
    setLevel1Loading,
    doorLoading,
    setDoorLoading,
    powerLoading,
    setPowerLoading,
    allLoading,
    setAllLoading,
    refresh,
    setRefresh,
    setRefreshing,
    refreshing,
  } = useGadgets();

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#f1f1f1'}}>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => {
              setRefresh(!refresh);
              setRefreshing(true);
            }}
          />
        }>
        <View style={styles.container}>
          <View
            style={{
              ...styles.flexRowContainer,
              justifyContent: 'flex-start',
              gap: 20,
            }}>
            <Image
              style={{
                width: 70,
                height: 70,
                borderRadius: 75,
                backgroundColor: '#A4DDF6',
              }}
              source={ProfileImg}
            />
            <View>
              <Text style={styles.h3}>Welcome, Memby!</Text>
              <Text>Your Autochalit dashboard</Text>
            </View>
          </View>
          <View style={{marginBottom: 40}}></View>
          <View style={{...styles.flexRowContainer, marginBottom: 10}}>
            <Text style={styles.h4}>Main Controls</Text>
            {Boolean(
              (groundLoading && allLoading) ||
                level1Loading & allLoading ||
                (groundLoading && level1Loading) ||
                allLoading ||
                doorLoading,
            ) && <ActivityIndicator size={'small'} />}
          </View>
          <View style={styles.flexRowContainer}>
            <Card
              title={'Lights'}
              subtitle={allLights.state ? 'on' : 'off'}
              indicator
              indicatorHigh={allLights.state}
              imgSrc={allLights.state ? LightOn : LightOff}
              pressDisabled={
                (groundLoading && allLoading) ||
                level1Loading & allLoading ||
                (groundLoading && level1Loading) ||
                allLoading
              }
              onPress={() => {
                // setAllLights({ ...allLights, state: !allLights.state })
                try {
                  setAllLoading(true);
                  ws.send(
                    JSON.stringify({
                      message: allLights.state ? 'off' : 'on',
                      name: 'allLights',
                    }),
                  );
                  if (!allLights.state) {
                    ws.send(
                      JSON.stringify({message: 'on', name: 'groundLight'}),
                    );
                    ws.send(
                      JSON.stringify({message: 'on', name: 'level1Light'}),
                    );
                    setGroundLoading(true);
                    setLevel1Loading(true);
                  } else {
                    ws.send(
                      JSON.stringify({message: 'off', name: 'groundLight'}),
                    );
                    ws.send(
                      JSON.stringify({message: 'off', name: 'level1Light'}),
                    );
                    setGroundLoading(true);
                    setLevel1Loading(true);
                  }
                } catch (error) {
                  console.log(error.message);
                  setAllLoading(false);
                  setGroundLoading(false);
                  setLevel1Loading(false);
                }
              }}
            />
            <Card
              backgroundColor={'#FFBCBC'}
              title={'Door'}
              subtitle={door.state ? 'open' : 'close'}
              indicator
              indicatorHigh={door.state}
              imgSrc={door.state ? DoorOpen : DoorClose}
              pressDisabled={doorLoading}
              onPress={() => {
                // setDoor({ ...door, state: !door.state })
                try {
                  setDoorLoading(true);
                  ws.send(
                    JSON.stringify({
                      message: door.state ? 'off' : 'on',
                      name: 'door',
                    }),
                  );
                } catch (error) {
                  console.log(error.message);
                  setDoorLoading(false);
                }
              }}
            />
          </View>
          <View style={{marginBottom: 40}}></View>
          <View style={{...styles.flexRowContainer, marginBottom: 10}}>
            <Text style={styles.h4}>Ground Floor</Text>
            {Boolean(groundLoading || allLoading) && (
              <ActivityIndicator size={'small'} />
            )}
          </View>

          <Card
            backgroundColor={groundLight.state ? '#B8F5C5' : '#d1d1d1'}
            height={75}
            width={'100%'}
            pressDisabled={groundLoading}
            onPress={() => {
              // setGroundLight({ ...groundLight, state: !groundLight.state })
              try {
                setGroundLoading(true);
                ws.send(
                  JSON.stringify({
                    message: groundLight.state ? 'off' : 'on',
                    name: 'groundLight',
                  }),
                );

                if (!groundLight.state && level1Light.state) {
                  // setAllLights({ ...allLights, state: true });
                  ws.send(JSON.stringify({message: 'on', name: 'allLights'}));
                } else {
                  // setAllLights({ ...allLights, state: false });
                  ws.send(JSON.stringify({message: 'off', name: 'allLights'}));
                }
              } catch (error) {
                console.log(error.message);
                setGroundLoading(false);
              }
            }}
            containerStyle={{
              flexDirection: 'row-reverse',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Image
              style={{
                width: 40,
                height: 40,
              }}
              source={groundLight.state ? LightOn : LightOff}
            />

            <View>
              <Text
                style={{
                  ...styles.title,
                  color: '#1a1a1a',
                }}>
                Light
              </Text>
              <Text
                style={{
                  ...styles.subtitle,
                  color: '#1a1a1a',
                }}>
                {groundLight.state ? 'on' : 'off'}
              </Text>
            </View>
          </Card>
          <View style={{marginBottom: 40}}></View>
          <View style={{...styles.flexRowContainer, marginBottom: 10}}>
            <Text style={styles.h4}>Level 1</Text>
            {Boolean(level1Loading || powerLoading || allLoading) && (
              <ActivityIndicator size={'small'} />
            )}
          </View>
          <View style={styles.flexRowContainer}>
            <Card
              title={'Light'}
              subtitle={level1Light.state ? 'on' : 'off'}
              indicator
              indicatorHigh={level1Light.state}
              imgSrc={level1Light.state ? LightOn : LightOff}
              backgroundColor={level1Light.state ? '#B8F5C5' : '#d1d1d1'}
              titleColor={'#1a1a1a'}
              subtitleColor={'#1a1a1a'}
              pressDisabled={level1Loading}
              onPress={() => {
                // setLevel1Light({ ...level1Light, state: !level1Light.state })
                try {
                  setLevel1Loading(true);
                  ws.send(
                    JSON.stringify({
                      message: level1Light.state ? 'off' : 'on',
                      name: 'level1Light',
                    }),
                  );
                  if (groundLight.state && !level1Light.state) {
                    // setAllLights({ ...allLights, state: true });
                    ws.send(JSON.stringify({message: 'on', name: 'allLights'}));
                  } else {
                    // setAllLights({ ...allLights, state: false });
                    ws.send(
                      JSON.stringify({message: 'off', name: 'allLights'}),
                    );
                  }
                } catch (error) {
                  console.log(error.message);
                  setLevel1Loading(false);
                }
              }}
            />
            <Card
              backgroundColor={powerSocket.state ? '#B8F5C5' : '#d1d1d1'}
              title={'Socket'}
              subtitle={powerSocket.state ? 'on' : 'off'}
              indicator
              imgSrc={powerSocket.state ? PowerSocket : PowerSocketOff}
              indicatorHigh={powerSocket.state}
              titleColor={'#1a1a1a'}
              subtitleColor={'#1a1a1a'}
              pressDisabled={powerLoading}
              onPress={() => {
                // setPowerSocket({ ...powerSocket, state: !powerSocket.state })
                try {
                  setPowerLoading(true);
                  ws.send(
                    JSON.stringify({
                      message: powerSocket.state ? 'off' : 'on',
                      name: 'powerSocket',
                    }),
                  );
                } catch (error) {
                  console.log(error.message);
                  setPowerLoading(false);
                }
              }}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DashboardScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f1f1',
    padding: 20,
  },
  h3: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  h4: {
    fontSize: 25,
    fontWeight: 'semi-bold',
    // marginBottom: 10,
  },
  flexRowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    marginBottom: 4,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 14,
  },
});
