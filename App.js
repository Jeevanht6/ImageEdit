import React, { useState, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import Canvas from 'react-native-canvas';
import ColorPicker from 'react-native-color-picker';
import 

const ImageEditorApp = () => {
  const [imageUri, setImageUri] = useState(null);
  const [brushColor, setBrushColor] = useState('#000000');
  const canvasRef = useRef(null);

  const pickImage = () => {
    ImagePicker.launchImageLibrary({}, (response) => {
      if (response?.uri) {
        setImageUri(response.uri);
      } else {
        Alert.alert('Error', 'Failed to pick an image');
      }
    });
  };

  const handleCanvas = (canvas) => {
    if (canvas) {
      canvasRef.current = canvas;
    }
  };

  const handleColorChange = (color) => {
    setBrushColor(color);
  };

  const clearCanvas = () => {
    if (canvasRef.current) {
      const context = canvasRef.current.getContext('2d');
      context.clearRect(0, 0, 300, 300);
    }
  };

  return (
    <View style={styles.container}>
      {imageUri ? (
        <Image source={{ uri: imageUri }} style={styles.image} />
      ) : (
        <Text style={styles.placeholderText}>Pick an image to edit</Text>
      )}

      <TouchableOpacity style={styles.button} onPress={pickImage}>
        <Text style={styles.buttonText}>Pick Image</Text>
      </TouchableOpacity>

      <ColorPicker
        onColorSelected={handleColorChange}
        style={{ flex: 1 }}
        hideSliders
      />

      <Canvas
        ref={handleCanvas}
        style={styles.canvas}
        drawColor={brushColor}
        strokeWidth={5}
        strokeColor={brushColor}
      />

      <TouchableOpacity style={styles.button} onPress={clearCanvas}>
        <Text style={styles.buttonText}>Clear Canvas</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 300,
    height: 300,
    marginBottom: 20,
  },
  placeholderText: {
    fontSize: 18,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#3498db',
    padding: 10,
    margin: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  canvas: {
    width: 300,
    height: 300,
    borderWidth: 1,
    borderColor: '#000',
  },
});

export default ImageEditorApp;