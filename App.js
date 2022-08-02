import Svg, {Path, Text} from 'react-native-svg';
import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';

const App = () => {
  let [size, setSize] = useState(400);
  let [onPressIndication, setOnpressIndication] = useState(-1);
  const slice = () => {
    let slices = [];
    // slices.push({percent: 0.9, color: 'blue'});
    slices.push({percent: 0.08, color: 'red'});
    slices.push({percent: 0.08, color: 'green'});
    slices.push({percent: 0.08, color: 'yellow'});
    slices.push({percent: 0.08, color: 'black'});
    slices.push({percent: 0.08, color: 'blue'});
    slices.push({percent: 0.08, color: 'red'});
    slices.push({percent: 0.08, color: 'green'});
    slices.push({percent: 0.08, color: 'yellow'});
    slices.push({percent: 0.2, color: 'white'});

    let cumulativePercent = 0;
    function getCoordinatesForPercent(percent) {
      const x = Math.cos(2 * Math.PI * percent);
      const y = Math.sin(2 * Math.PI * percent);
      return [x, y];
    }

    let arr = [];
    arr = slices.map((slice, index) => {
      const [startX, startY] = getCoordinatesForPercent(cumulativePercent);
      cumulativePercent += slice.percent;
      const [endX, endY] = getCoordinatesForPercent(cumulativePercent);
      const largeArcFlag = slice.percent > 0.5 ? 1 : 0;
      const pathData = [
        `M ${startX} ${startY}`, // Move
        `A 1 1 0 ${largeArcFlag} 1 ${endX} ${endY}`, // Arc
        'L 0 0', // Line
      ].join(' ');
      return (
        <Path
          d={pathData}
          fill={slice.color}
          opacity={onPressIndication == index ? 0.3 : 1}
          stroke={'white'}
          strokeWidth={0.05}
          borderRadius={10}
          key={pathData}
          onPress={() => {
            setOnpressIndication(index);
            setTimeout(() => {
              setOnpressIndication(-1);
            }, 200);
            console.log('dsd', index);
          }}
        />
      );
    });
    // console.log('tet', arr);
    return arr;
  };

  return (
    <View style={{flex: 1, justifyContent: 'center'}}>
      <View
        style={[
          styles.outerCircle,
          {
            width: size,
            height: size,
            borderRadius: size / 2,
          },
        ]}>
        <View style={styles.halfCircle}>
          <Svg
            height={size}
            width={size}
            viewBox="-1 -1 2 2"
            style={{transform: [{rotate: '160deg'}]}}>
            <Text
              fontSize="20"
              fontWeight="bold"
              x={size / 2}
              y={size / 2}
              fill={'black'}
              textAnchor="start">
              {'test'}
            </Text>
            {slice()}
          </Svg>
        </View>
        <View
          style={[
            styles.innerCircle,
            {
              width: parseInt((70 / 100) * size),
              height: parseInt((70 / 100) * size),
              borderRadius: size,
            },
          ]}></View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  outerCircle: {
    alignItems: 'center',
    backgroundColor: 'white',
    justifyContent: 'center',
    overflow: 'hidden',
    // borderColor: 'black',
    // borderWidth: 1,
    alignSelf: 'center',
    // transform: [{rotate: `180deg`}],
    // borderColor: 'black',
    // borderWidth: 1,
  },
  halfCircle: {
    alignItems: 'center',
    // justifyContent: 'flex-end',
    // backgroundColor: '#ff0000',
    borderBottomRightRadius: 0,
    borderTopRightRadius: 0,
    borderColor: 'white',
    // borderWidth: 5,
    // overflow: 'hidden',
    // left: 0,
    alignSelf: 'center',
    position: 'absolute',
    // top: 0,
  },
  innerCircle: {
    alignItems: 'center',
    backgroundColor: 'white',
    // borderTopLeftRadius: 200,
    // borderTopRightRadius: 200,
    height: 75,
    // justifyContent: 'flex-end',
    overflow: 'hidden',
    paddingLeft: 3,
    paddingRight: 3,
    width: 150,
    // borderColor: 'black',
    // borderWidth: 1,
  },
});

export default App;
