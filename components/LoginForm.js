import React, { Component } from "react";
import {
  Container,
  Header,
  Content,
  Form,
  Item,
  Input,
  Button,
  Text,
  View,
  H2
} from "native-base";

import { connect } from "react-redux";
import { login, signup, checkForExpiredToken, logout } from "../redux/actions";
// Actions
// import { login } from "./redux/actions";

class LoginForm extends Component {
  state = {
    username: "",
    password: ""
  };
  componentDidMount = () => {
    this.props.checkForToken();
  };
  renderButtons() {
    if (this.props.user) {
      return (
        <Button onPress={() => this.props.logout()}>
          <Text>Logout</Text>
        </Button>
      );
    } else {
      return (
        <View>
          <Button
            onPress={() => this.props.login(this.state, this.props.navigation)}
          >
            <Text>Login</Text>
          </Button>
          <Button
            onPress={() => this.props.signup(this.state, this.props.navigation)}
          >
            <Text>Signup</Text>
          </Button>
        </View>
      );
    }
  }
  renderFields() {
    const { username, password } = this.state;
    if (this.props.user) {
      return (
        <H2 style={{ marginTop: 20, marginBottom: 20 }}>You are logged in!</H2>
      );
    } else {
      return (
        <View>
          <Item>
            <Input
              name="username"
              value={username}
              placeholder="Username"
              onChangeText={username => this.setState({ username })}
            />
          </Item>
          <Item last>
            <Input
              value={password}
              placeholder="Password"
              secureTextEntry
              name="password"
              onChangeText={password => this.setState({ password })}
            />
          </Item>
        </View>
      );
    }
  }
  render() {
    console.log(this.state);
    return (
      <Container>
        <Header />
        <Content>
          <Form>
            {this.renderFields()}
            {this.renderButtons()}
          </Form>
        </Content>
      </Container>
    );
  }
}
const mapStateToProps = state => ({
  user: state.rootAuth.user
});
const mapDispatchToProps = dispatch => {
  return {
    login: (userData, navigation) => dispatch(login(userData, navigation)),
    logout: () => dispatch(logout()),
    signup: (userData, navigation) => dispatch(signup(userData, navigation)),
    checkForToken: navigation => dispatch(checkForExpiredToken(navigation))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
