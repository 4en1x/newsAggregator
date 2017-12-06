import React, { Component } from 'react';
import { TouchableOpacity, Image } from 'react-native';

import config from '../../../config.json';

export default class LikeButton extends Component {
  constructor(props) {
    super(props);

    this.state = {
      liked: props.liked || false
    };
  }

  async likeNews() {
    try {
      const response = await fetch(
        `${config.web.backendOrigin}/articles/like/${this.props.id}`,
        {
          method: 'PUT',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          }
        }
      );

      const res = await response.text();

      if (response.status !== 200) {
        throw res;
      }
    } catch (error) {
      this.setState({ error });
      console.log(`error ${error}`);
    }
  }

  _handlePress() {
    this.setState({
      liked: !this.state.liked
    });
    this.likeNews();
  }

  render() {
    if (this.state.liked) {
      return (
        <TouchableOpacity onPress={this._handlePress.bind(this)}>
          <Image
            source={{
              uri:
                'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Heart_coraz%C3%B3n.svg/220px-Heart_coraz%C3%B3n.svg.png'
            }}
            style={{ width: 40, height: 40 }}
          />
        </TouchableOpacity>
      );
    }
    return (
      <TouchableOpacity onPress={this._handlePress.bind(this)}>
        <Image
          source={require('../../images/Heart_empty.svg.png')}
          style={{ width: 40, height: 40 }}
        />
      </TouchableOpacity>
    );
  }
}
