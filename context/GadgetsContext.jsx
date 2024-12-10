import {View, Text, Touchable, TouchableOpacity} from 'react-native';
import React, {createContext, useEffect, useState} from 'react';

export const GadgetsContext = createContext();

const GadgetsProvider = ({children}) => {
  const ws = new WebSocket('wss://autochalitbackend.onrender.com');
  const [allGadgets, setAllGadgets] = useState(null);
  const [gadgetsLoading, setGadgetsLoading] = useState(true);
  const [groundLight, setGroundLight] = useState({
    name: 'groundLight',
    state: false,
  });
  const [level1Light, setLevel1Light] = useState({
    name: 'Level1Light',
    state: false,
  });
  const [door, setDoor] = useState({name: 'door', state: false});
  const [powerSocket, setPowerSocket] = useState({
    name: 'powerSocket',
    state: false,
  });
  const [allLights, setAllLights] = useState({
    name: 'allLights',
    state: false,
  });
  const [groundLoading, setGroundLoading] = useState(false);
  const [level1Loading, setLevel1Loading] = useState(false);
  const [doorLoading, setDoorLoading] = useState(false);
  const [powerLoading, setPowerLoading] = useState(false);
  const [allLoading, setAllLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    // fetch all gadgets from the server
    fetch('https://autochalitbackend.onrender.com/appliances')
      .then(res => res.json())
      .then(data => {
        setAllGadgets(data?.appliances);
        // console.log(data?.appliances);
        setGadgetsLoading(false);
        setGroundLight(prev => getServerState(data, prev));
        setLevel1Light(prev => getServerState(data, prev));
        setDoor(prev => getServerState(data, prev));
        setPowerSocket(prev => getServerState(data, prev));
        setAllLights(prev => getServerState(data, prev));
        setAllLoading(false);
        setGroundLoading(false);
        setLevel1Loading(false);
        setDoorLoading(false);
        setPowerLoading(false);
        setRefreshing(false);
      })
      .catch(err => {
        console.log(err);
        setGadgetsLoading(false);
        setRefreshing(false);
      });
  }, [refresh]);

  useEffect(() => {
    const connect = () => {
      ws.onopen = () => {
        console.log('Connected to the server');
      };

      ws.onerror = err => {
        console.log(err, 'error');
      };

      ws.onclose = e => {
        console.log('Disconnected from the server', `${e.reason}`);
        // setTimeout(connect, 1000);
      };
    };

    connect();

    return () => {
      ws.close();
    };
  }, []);

  useEffect(() => {
    console.log(allGadgets, 'allGadgets1');
    ws.onmessage = message => {
      const data = JSON.parse(message.data);
      console.log(data);
      if (data.success) {
        switch (data.name) {
          case 'groundLight':
            setGroundLight(prev => ({...prev, state: data.state}));
            setGroundLoading(false);
            break;
          case 'level1Light':
            setLevel1Light(prev => ({...prev, state: data.state}));
            setLevel1Loading(false);
            break;
          case 'door':
            setDoor(prev => ({...prev, state: data.state}));
            setDoorLoading(false);
            break;
          case 'powerSocket':
            setPowerSocket(prev => ({...prev, state: data.state}));
            setPowerLoading(false);
            break;
          case 'allLights':
            setAllLights(prev => ({...prev, state: data.state}));
            setAllLoading(false);
            break;
          default:
            break;
        }
      }
    };

    return () => {
      ws.close();
    };
  }, []);

  const getServerState = (data, gadget) => {
    const foundGadget = data?.appliances?.find(app => app.name === gadget.name);
    if (foundGadget) {
      return {...gadget, state: foundGadget.state};
    }
    return gadget; // return the original gadget state if not found in the data
  };

  return (
    <GadgetsContext.Provider
      value={{
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
        refreshing,
        setRefreshing,
      }}>
      {children}
    </GadgetsContext.Provider>
  );
};

export default GadgetsProvider;
