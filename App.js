/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import { Platform, StyleSheet, Text, View, Image } from "react-native";
import { Button } from "react-native";
//import ImagePicker from "react-native-image-picker";

var ImagePicker = require("react-native-image-picker");

const instructions = Platform.select({
  ios: "Press Cmd+R to reload,\n" + "Cmd+D or shake for dev menu",
  android:
    "Double tap R on your keyboard to reload,\n" +
    "Shake or press menu button for dev menu"
});

type Props = {};
const options = {
  title: "Select Avatar",
  customButtons: [{ name: "fb", title: "Choose Photo from Facebook" }],
  storageOptions: {
    skipBackup: true,
    path: "images"
  }
};
export default class App extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      filePath: {},
      image: require("./nophoto.png")
    };
  }

  render() {
    console.log(this.state);

    return (
      <View style={styles.container}>
        <View style={styles.container}>
          <Text>Pick a Button</Text>
          <Button
            onPress={this.onPressTakePhoto.bind(this)}
            title="Take a photo"
            color="#841584"
            accessibilityLabel="Take a photo with the camera"
          />
          <Button
            onPress={this.onPressGetPicture.bind(this)}
            title="Pick a picture"
            color="#841584"
            accessibilityLabel="Pick a picture from the gallery"
          />
          <Image
            source={require("./nophoto.png")}
            //source = {require(this.state.image)}
            style={{ width: 100, height: 100}}
          />
         
          
          
          <Image
            source={{ uri: this.state.filePath.uri }}
            style={{ width: 100, height: 100 }}
          />
        </View>
      </View>
    );
  }

  onPressTakePhoto() {
    ImagePicker.launchCamera(options, response => {
      console.log("Response = ", response);

      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
      } else if (response.customButton) {
        console.log("User tapped custom button: ", response.customButton);
      } else {
        const source = { uri: response.uri };

        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };

        this.setState({
          image: source
        });
        this.setState({
          filePath: source
        });
        //console.log("State");
        console.log(this.state);
      }
    });
  }

  onPressGetPicture() {
    ImagePicker.showImagePicker(options, response => {
      //ImagePicker.launchCamera(options, response => {
      console.log("Response = ", response);

      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
      } else if (response.customButton) {
        console.log("User tapped custom button: ", response.customButton);
      } else {
        const source = { uri: response.uri };

        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };
        this.setState({
          image: source
        });
        this.setState({
          filePath: source
        });
        console.log("State");
        console.log(this.state);
      }
    });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  }
});
