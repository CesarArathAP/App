import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import BluetoothSerial from 'react-native-bluetooth-serial';

const App = () => {
  const [qrData, setQrData] = useState('');
  const [deviceConnected, setDeviceConnected] = useState(false);
  const [bluetoothEnabled, setBluetoothEnabled] = useState(false);
  const [readListener, setReadListener] = useState(null);

  useEffect(() => {
    BluetoothSerial.isEnabled().then((enabled) => {
      setBluetoothEnabled(enabled);
      if (!enabled) {
        Alert.alert(
          'Bluetooth no activado',
          '¿Desea activar Bluetooth para usar el lector QR?',
          [
            {
              text: 'Cancelar',
              onPress: () => {},
              style: 'cancel',
            },
            {
              text: 'Activar',
              onPress: () => BluetoothSerial.requestEnable(),
            },
          ],
        );
      } else {
        setDeviceConnected(true);
      }
    });

    return () => {
      if (readListener) {
        readListener.remove();
      }
    };
  }, []);

  useEffect(() => {
    if (deviceConnected) {
      BluetoothSerial.connect('2D:C0:06:1E:25:B8')
        .then(() => console.log('Conexión establecida con el lector QR'))
        .catch((error) => {
          Alert.alert('Error al conectar con el lector QR', 'No se ha detectado el lector QR');
          setDeviceConnected(false);
        });
    }
  }, [deviceConnected]);

  useEffect(() => {
    if (deviceConnected) {
      const listener = BluetoothSerial.on('read', (data) => {
        console.log('Datos del lector QR:', data);
        setQrData(data); // Actualiza el estado con los datos del lector QR
      });
      setReadListener(listener);
    }

    return () => {
      if (readListener) {
        readListener.remove();
      }
    };
  }, [deviceConnected]);

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Lector QR</Text>
        {bluetoothEnabled ? (
          deviceConnected ? (
            <Text>{qrData}</Text>
          ) : (
            <Text style={styles.textqr}>Conectando con el lector QR...</Text>
          )
        ) : (
          <Text style={styles.textqr}>Lector QR no activado. Revise la conexión Bluetooth.</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 20,
    alignItems: 'center',
    //justifyContent: 'center',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    color: 'black',
    width: '100%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'black'
  },
  textqr: {
    color: 'black'
  },
});

export default App;