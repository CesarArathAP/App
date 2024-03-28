# SafeCheckMovil

## Descripción
SafeCheckMovil es una aplicación móvil desarrollada con React Native para facilitar el seguimiento y la gestión de visitas y actividades en una institución educativa.

## Problema
Al ejecutar la aplicación SafeCheckMovil, algunos usuarios han experimentado errores relacionados con la falta de módulos nativos y la duplicación de módulos en la inicialización de la aplicación.

### Errores específicos:
1. **Error de módulo nativo:** Algunos usuarios han reportado un error relacionado con la falta de un módulo nativo llamado "RNGestureHandlerModule".
2. **Error de duplicación de módulos:** Otros usuarios han recibido un mensaje sobre la duplicación del módulo "RNSModule".

## Soluciones Propuestas
Para abordar estos problemas, aquí hay algunas soluciones sugeridas:

1. **Instalación de dependencias faltantes:** Asegúrate de haber instalado todas las dependencias necesarias ejecutando el siguiente comando en la terminal:
    ```bash
    npm install
    ```

2. **Verificación del archivo MainApplication:** Confirma que el archivo `MainApplication.kt` está correctamente configurado y no está duplicando ningún módulo nativo. Asegúrate de que el archivo incluya todas las importaciones necesarias y que la lista de paquetes en el método `getPackages()` no tenga duplicados ni falten módulos necesarios.

3. **Reinstalación de paquetes nativos:** Si los problemas persisten, intenta reinstalar los paquetes nativos necesarios ejecutando los siguientes comandos:
    ```bash
    npm install react-native-safe-area-context
    ```

4. **Revisión de dependencias:** Verifica que todas las dependencias necesarias estén listadas y correctamente especificadas en el archivo `package.json`. A continuación, se muestra un listado de las dependencias actuales del proyecto:

    ```json
    Inserta aquí el listado de dependencias del archivo package.json
    ```

Si los problemas persisten después de seguir estas soluciones, considera buscar ayuda adicional en la documentación oficial de las bibliotecas utilizadas, los foros de desarrollo de React Native o comunidades en línea.

## Dependencias
A continuación se muestra un listado de las dependencias del proyecto:

```json
Inserta aquí el listado de dependencias del archivo package.json

## Dependencias
A continuación se muestra un listado de las dependencias del proyecto:

```json
{
  "dependencies": {
    "@react-native-community/datetimepicker": "^7.6.3",
    "@react-navigation/stack": "^6.3.29",
    "axios": "^1.6.8",
    "link": "^2.1.0",
    "react": "18.2.0",
    "react-native": "^0.73.6",
    "react-native-elements": "^3.4.3",
    "react-native-gesture-handler": "^2.16.0",
    "react-native-image-picker": "^7.1.2",
    "react-native-safe-area-context": "^4.9.0",
    "react-native-screens": "^3.30.1"
  },
  "devDependencies": {
    "@babel/core": "^7.20.0",
    "@babel/preset-env": "^7.20.0",
    "@babel/runtime": "^7.20.0",
    "@react-native/babel-preset": "0.73.21",
    "@react-native/eslint-config": "0.73.2",
    "@react-native/metro-config": "0.73.5",
    "@react-native/typescript-config": "0.73.1",
    "@types/react": "^18.2.6",
    "@types/react-test-renderer": "^18.0.0",
    "babel-jest": "^29.6.3",
    "eslint": "^8.19.0",
    "jest": "^29.6.3",
    "prettier": "2.8.8",
    "react-test-renderer": "18.2.0",
    "typescript": "5.0.4"
  },
  "engines": {
    "node": ">=18"
  }
}

#No dudes en modificar o agregar más información según sea necesario para adaptar este README.md a las necesidades de tu proyecto. Recuerda mantenerlo actualizado con cualquier cambio importante en tu aplicación. Si tienes más preguntas o necesitas ayuda adicional, ¡no dudes en preguntar!.