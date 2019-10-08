import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Spinner } from "native-base";
//Redux
import store from "./redux/reducers";
import { Provider } from "react-redux";

//Components
import LoginForm from "./components/LoginForm";

export default class App extends Component {
  state = {
    loading: true
  };
  async componentDidMount() {
    await Expo.Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf")
    });
    this.setState({ loading: false });
  }

  render() {
    if (this.state.loading) {
      return <Spinner color="white" />;
    }
    return (
      <Provider store={store}>
        <LoginForm />
      </Provider>
    );
  }
}
