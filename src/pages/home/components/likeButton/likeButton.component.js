import React, { Component } from 'react';
import { TouchableOpacity, Image } from 'react-native';

import config from '@/config/config.json';

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

  handlePress() {
    this.setState({
      liked: !this.state.liked
    });

    this.likeNews();
  }

  render() {
    const iconFull = require('@/images/Heart_full.png');
    const iconEmpty = require('@/images/Heart_empty.png');

    if (this.state.liked) {
      return (
        <TouchableOpacity onPress={() => this.handlePress()}>
          <Image source={iconFull} style={{ width: 40, height: 40 }} />
        </TouchableOpacity>
      );
    }
    return (
      <TouchableOpacity onPress={() => this.handlePress()}>
        <Image source={iconEmpty} style={{ width: 40, height: 40 }} />
      </TouchableOpacity>
    );
  }
}
