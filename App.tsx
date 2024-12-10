import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import DashboardScreen from './screens/DashboardScreen'
import GadgetsProvider from './context/GadgetsContext'

const App = () => {
  return (
    <GadgetsProvider>

      <DashboardScreen />
    </GadgetsProvider>
  )
}

export default App

const styles = StyleSheet.create({})