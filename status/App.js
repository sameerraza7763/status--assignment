import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  Platform,
  ScrollView,
} from "react-native";
import React, { useState, useEffect } from "react";
import * as ImagePicker from "expo-image-picker";

export default function App() {
  const [image, setImage] = useState(null);
  let [imageArray, setImageArray] = useState([]);
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      setImageArray((image) => [...image, result.assets[0].uri]);
    }
  };

  let [itemImage, setItemImage] = useState("");

  const ImagesToDisplay = imageArray.map((item, index) => {
    setItemImage(item);
    // setTimeout(() => {
    //   imageArray[index] = null
    // }, 3000);
    return (
      <Image source={{ uri: itemImage }} style={{ width: 100, height: 100 }} />
    );
  });

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        overflow: "scroll",
      }}
    >
      <Button title="choose a image" onPress={pickImage} />
      {/* {image && (
        <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
      )} */}
      {ImagesToDisplay}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
