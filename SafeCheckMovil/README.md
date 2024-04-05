# SafeCheckMovil

## Descripción
Este es un archivo `package.json` que describe las dependencias del proyecto SafeCheckMovil.

## Dependencias

### Dependencias de Producción

| Dependencia                                     | Comando para Descargar        |
|-------------------------------------------------|-------------------------------|
| @notifee/react-native                           | `npm install @notifee/react-native` |
| @react-native-async-storage/async-storage       | `npm install @react-native-async-storage/async-storage` |
| @react-native-community/datetimepicker           | `npm install @react-native-community/datetimepicker` |
| @react-native-firebase/app                       | `npm install @react-native-firebase/app` |
| @react-native-firebase/messaging                 | `npm install @react-native-firebase/messaging` |
| @react-navigation/stack                         | `npm install @react-navigation/stack` |
| axios                                           | `npm install axios` |
| notifee                                         | `npm install notifee` |
| react                                           | `npm install react` |
| react-native                                    | `npm install react-native` |
| react-native-chart-kit                          | `npm install react-native-chart-kit` |
| react-native-elements                           | `npm install react-native-elements` |
| react-native-fs                                 | `npm install react-native-fs` |
| react-native-gesture-handler                    | `npm install react-native-gesture-handler` |
| react-native-image-picker                       | `npm install react-native-image-picker` |
| react-native-push-notification                  | `npm install react-native-push-notification` |
| react-native-safe-area-context                  | `npm install react-native-safe-area-context` |
| react-native-screens                            | `npm install react-native-screens` |
| react-native-svg                                | `npm install react-native-svg` |
| vector-icons                                    | `npm install vector-icons` |
| bluetooth-serial|`npm install react-native-bluetooth-serial`|

### Dependencias de Desarrollo

Nota: Las Depencias de desarrollo no hacen falta que las decargue por que se instalan cuando ejecutas el comando npm install.

| Dependencia                                     | Comando para Descargar        |
|-------------------------------------------------|-------------------------------|
| @babel/core                                     | `npm install @babel/core` |
| @babel/preset-env                               | `npm install @babel/preset-env` |
| @babel/runtime                                  | `npm install @babel/runtime` |
| @react-native/babel-preset                      | `npm install @react-native/babel-preset` |
| @react-native/eslint-config                     | `npm install @react-native/eslint-config` |
| @react-native/metro-config                      | `npm install @react-native/metro-config` |
| @react-native/typescript-config                 | `npm install @react-native/typescript-config` |
| @types/react                                    | `npm install @types/react` |
| @types/react-test-renderer                      | `npm install @types/react-test-renderer` |
| babel-jest                                      | `npm install babel-jest` |
| eslint                                          | `npm install eslint` |
| jest                                            | `npm install jest` |
| metro                                           | `npm install metro` |
| prettier                                        | `npm install prettier` |
| react-test-renderer                            | `npm install react-test-renderer` |
| typescript                                     | `npm install typescript` |

## Comando para Descargar Todas las Dependencias
Para instalar todas las dependencias del proyecto, ejecuta el siguiente comando en la terminal:

```bash
npm install

```

## Configuración Bluetooth para conecetar el Lector QR con la aplicación

# Paso 1

Descargar la depencia de bluetooth-serial en el proyecto

```bash
npm install react-native-bluetooth-serial
```

### Dirigete a tu carpeta node_modules en la dirección:

`node_modules/react-native-bluetooth-serial/android/app/build.gradle`

asegurandote de que el archivo se vea de esta forma

```bash
buildscript {
    repositories {
        jcenter()
    }

    dependencies {
        classpath 'com.android.tools.build:gradle:2.1.0'
    }
}

apply plugin: 'com.android.library'
// !IMPORTANTE¡
android {
    compileSdkVersion 31  // Asegúrate de que la versión del SDK de compilación sea al menos 30
    buildToolsVersion "33.0.1"  // Actualiza la versión de Android SDK Build Tools a una compatible

    defaultConfig {
        minSdkVersion 16
        targetSdkVersion 31  // Asegúrate de que la versión de destino del SDK sea al menos 30
        versionCode 1
        versionName "1.0"
        ndk {
            abiFilters "armeabi-v7a", "x86"
        }
    }
}

repositories {
    mavenCentral()
    maven {
        // All of React Native (JS, Obj-C sources, Android binaries) is installed from npm
        url "$rootDir/../node_modules/react-native/android"
    }
}

dependencies {
    implementation 'com.facebook.react:react-native:+'
}

```

# Paso 2

En la dirección `node_modules/react-native-bluetooth-serial/android/src/main/java/RCTBluetoothSerialPackage.java`

asegurate de tener el archvio RCTBluetoothSerialPackage.java de esta froma

```bash
package com.rusel.RCTBluetoothSerial;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;
import com.facebook.react.bridge.JavaScriptModule;

public class RCTBluetoothSerialPackage implements ReactPackage {
    static final String TAG = "BluetoothSerial";

    @Override
    public List<NativeModule> createNativeModules(ReactApplicationContext reactContext) {
        List<NativeModule> modules = new ArrayList<>();
        modules.add(new RCTBluetoothSerialModule(reactContext));
        return modules;
    }

    @Override
    public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
        return Collections.emptyList();
    }
}
```

ESTO TE EVITARA PROBLEMAS A LA HORA DE CORRER LA APLICACIÓN EN TU DISPOSITIVO ANDROID