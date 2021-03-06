import { Button, Text } from '@rneui/base';
import { Image } from '@rneui/themed';
import { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { AuthContext } from '../components/Auth';
import Styles from '../constants/Styles';
import AlertException from '../exceptions/AlertException';
import GeoLocationService from '../services/GeoLocationService';

export default class ProfileScreen extends Component<any, any> {
  static contextType = AuthContext;

  private readonly geoLocationService = new GeoLocationService();

  componentDidMount() {
    this.props.navigation.addListener('focus', async () => {
      this.context.refreshState().catch(console.error);
    });
  }

  render() {
    return (
        <View style={Styles.container}>
          <View style={styles.header}>
            <Text style={styles.headerText}>Profile</Text>
          </View>

          <View style={styles.body}>
            <Image
                style={styles.image}
                source={{ uri: this.context.user.picture64FromApi }}
            />

            <View style={styles.bodyTitle}>
              <Text style={styles.bodyText}>
                {this.context.user.name}
              </Text>

              <Text style={styles.bodyText}>
                {this.context.user.email}
              </Text>

              <Text style={styles.bodyText}>
                {this.context.user.phone}
              </Text>
            </View>
          </View>
          <View style={styles.footer}>
            <Button
                title={'Edit Profile'}
                buttonStyle={styles.button}
                onPress={() => this.props.navigation.navigate('EditProfile')}
            />

            <Button
                title={'Delete all locations'}
                buttonStyle={styles.deleteButton}
                onPress={() => this.geoLocationService.deleteAllPositions()
                                   .then(response => alert(`${response}\nAll locations deleted`))
                                   .catch(e => {throw new AlertException(e.message, 'Error deleting locations');})}
            />
          </View>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  headerText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#000'
  },
  body: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 150
  },
  bodyTitle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  bodyText: {
    fontWeight: 'bold'
  },
  footer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  button: {
    width: 200,
    height: 50,
    backgroundColor: '#000',
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center'
  },
  deleteButton: {}
});

styles.deleteButton = {
  ...styles.button,
  backgroundColor: 'firebrick',
  marginTop: 10
};
