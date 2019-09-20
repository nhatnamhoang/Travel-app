import React, { Component } from 'react'
import {
  Text,
  StyleSheet,
  View,
  Dimensions,
  ImageBackground,
  FlatList,
  Image,
  ScrollView,
  Animated
} from 'react-native'

import mocks from '../constants/mock';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    flex: {
        flex: 1,
    },
    column: {
        flexDirection: 'column',
    },
    row: {
        flexDirection: 'row',
    },
    header: {
        backgroundColor: 'white',
        paddingHorizontal: 36,
        paddingTop: 48,
        paddingBottom: 24,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    article: {},
    destinations: {
      flex: 1,
      justifyContent: 'space-between',
    },
    destination: {
      width: width - (36 * 2),
      // height: width * 0.6,
      marginHorizontal: 36,
      paddingHorizontal: 26,
      paddingVertical: 24,
      borderRadius: 12,
      position: 'relative'
    },
    destinationInfo: {
      position: 'absolute',
      bottom: -36,
      left: 36,
      right: 36,
      paddingHorizontal: 26,
      paddingVertical: 14,
      borderRadius: 12,
      backgroundColor: 'white',
      justifyContent: 'space-between'
    },
    recommended: {},
    recommendedHeader: {
      paddingHorizontal: 36,
      marginTop: 20,
    },
    recommendation: {
      width: (width - (36 * 2)) / 2,
      height: 'auto',
      marginRight: 18,
      backgroundColor: 'white',
      overflow: 'hidden',
      borderTopRightRadius: 16,
      borderTopLeftRadius: 16,
    },
    recommendationImage: {
      width: ( width - (36 * 2)) /2,
      height: ( width - (36 * 2)) /2,
      justifyContent: 'space-between',
      paddingHorizontal: 16,
    },
    recommendedList: {
      // paddingHorizontal: 36
    },
    avatar: {
      width: 36,
      height: 36,
      borderRadius: 18,
    },
    rating: {
      fontSize: 28,
      color: 'white',
      fontWeight: 'bold'
    },
    shadow: {
      shadowColor: 'black',
      shadowOffset: {
        width: 0,
        height: 6,
      },
      shadowOpacity: 0.1,
      shadowRadius: 11,
      elevation: 5,
    },
    dots: {
      width: 10,
      height: 10,
      borderWidth: 2.5,
      borderRadius: 5,
      marginHorizontal: 6,
      backgroundColor: '#Dce0e9',
      borderColor: 'transparent',
    },
    activeDots: {
      width: 12.5,
      height: 12.5,
      borderRadius: 6.25,
      borderColor: '#0078fa',
    }
})


 class List extends Component {
    scrollX = new Animated.Value(0);
    static navigationOptions = {
        header: (
            <View style={
              [
                styles.flex, styles.row, styles.header,
              ]
            }>
                <View>
                    <Text>Search for place</Text>
                    <Text style={{ fontSize: 24 }}>Destination</Text>
                </View>
                <View>
                  <Image style={styles.avatar} source={{ uri: 'https://randomuser.me/api/portraits/women/32.jpg'}} />
                </View>
            </View>
        )
    }

    renderDots = () => {
      const { destinations } = this.props;
      const dotPosition = Animated.divide(this.scrollX, width);
      return (
        <View style={[styles.flex, styles.row, { justifyContent: 'center', marginTop: (36 * 2)  }]}>
          { destinations.map((item, index) => {
            const borderWidth = dotPosition.interpolate({
              inputRange: [ index - 1, index, index + 1],
              outputRange: [0, 3 , 0],
              extrapolate: 'clamp'
            })
          return (
            <Animated.View
              key={`step-${item.id}`}
              style={[styles.dots, styles.activeDots, {borderWidth: borderWidth} ]}
            />
          )
        })}
        </View>
      )
    }

    renderDestinations = () => {
        return (
          <View style={[ styles.column, styles.destinations ]}>
            <FlatList
              horizontal
              pagingEnabled
              scrollEnabled
              showsHorizontalScrollIndicator={false}
              scrollEventThrottle={16}
              snapToAlignment="center"
              style={{ overflow:'visible', height: 280 }}
              data={this.props.destinations}
              keyExtractor={(item, index) => `${item.id}`}
              renderItem={({ item }) => this.renderDestination(item)}
           />
           {this.renderDots()}
          </View>
        )
    }

    renderDestination = (item) => {
      return (
        <ImageBackground
           style={[ styles.flex, styles.destination, styles.shadow ]}
           imageStyle={{ borderRadius: 12 }}
           source={{ uri: item.preview}}
        >
         <View style={[ styles.row, {  justifyContent: 'space-between' } ]}>
            <View style={{ flex: 0 }}>
              <Image
                source={{ uri: item.user.avatar }}
                style={styles.avatar}
              />
            </View>
            <View style={[  styles.column, { flex: 2,  paddingHorizontal: 16 } ]}>
              <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 13 }}>{item.user.name}</Text>
              <Text style={{ color: 'white', fontSize: 10 }}>{item.location}</Text>
            </View>
            <View style={[ { flex: 0,  justifyContent: 'center', alignItems: 'flex-end' } ]}>
              <Text style={styles.rating}>{item.rating}</Text>
            </View>
        </View>
        <View style={[styles.column, styles.destinationInfo, styles.shadow ]}>
          <Text style={{ fontWeight: '600' , paddingVertical: 8 }}>{item.title}</Text>
          <Text numberOfLines={2} style={{ color: 'gray' }} >{item.description}</Text>
        </View>
        </ImageBackground>
      )
  }

    renderRecommended = () => {
        return (
            <View style={[ styles.flex, styles.column, styles.recommended ]}>
                <View style={[styles.row, styles.recommendedHeader, { justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 36 }]}>
                  <Text style={{ fontSize: 18}}>Recommended</Text>
                  <Text style={{ color: '#bcccd4'}}>More</Text>
                </View>
                <View style={[ styles.column, styles.recommendedList ]}>
                  <FlatList
                    horizontal
                    pagingEnabled
                    scrollEnabled
                    showsHorizontalScrollIndicator={false}
                    decelerationRate={0}
                    scrollEventThrottle={16}
                    snapToAlignment="center"
                    data={this.props.destinations}
                    keyExtractor={(item, index) => `${item.id}`}
                    onScroll={Animated.event([{
                      nativeEvent: {
                        contentOffset: { x : this.scrollX }
                      }
                    }])}
                    renderItem={({ item, index }) => this.renderRecommendation(item, index)}
                />
                {this.renderDots()}
                </View>
            </View>
        )
    }

    renderRecommendation = (item, index) => {
      const { destinations } = this.props;
      const isLastItem = index === destinations.length - 1;
      return (
        <View style={
          [styles.flex, styles.column, styles.recommendation, styles.shadow,
            index ===0 ? {marginLeft: 36} : null,
            isLastItem ? { marginRight: 18 } : null
          ]
          }>
          <View style={styles.flex, { overflow: 'hidden', borderTopRightRadius: 16, borderTopLeftRadius: 16 }}>
          <Image style={[styles.recommendationImage]} source={{ uri: item.preview }} />
             <View style={[styles.row, { justifyContent: 'space-evenly', padding: 18, position: 'absolute', top: 0 }]}>
              <Text style={{color: 'white'}}>{item.temperature}℃</Text>
              <Text style={{color: 'white'}}>|_|</Text>
             </View>
          </View>
          <View style={[styles.flex, styles.column, { justifyContent: 'space-evenly' }]}>
            <Text style={{ fontSize: 18, fontWeight: '500', paddingBottom: 0}}>{item.title}</Text>
            <Text style={{ color: '#bcccd4' }}>{item.location}</Text>
            <Text style={{ color: '#0078fa' }}>{item.rating}</Text>
          </View>
        </View>
      )
    }

    render() {
        return (
            <ScrollView
              contentStyle={[ styles.flex, styles.article ]}
              contentContainerStyle={{ paddingVertical: 36 }}
            >
                {this.renderDestinations()}
                {this.renderRecommended()}
            </ScrollView>
        )
    }
}

List.defaultProps = {
  destinations: mocks
};

export default List;
