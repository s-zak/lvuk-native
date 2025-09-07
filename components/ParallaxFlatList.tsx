import type { PropsWithChildren, ReactElement } from 'react';
import {FlatListProps, View } from 'react-native';
import { StyleSheet } from 'react-native';
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';

import { useBottomTabOverflow } from '@/components/ui/TabBarBackground';
import { useColorScheme } from '@/hooks/useColorScheme';

export const HEADER_HEIGHT = 170;

type Props<T> = FlatListProps<T> & PropsWithChildren<{
  headerImage: ReactElement;
  headerBackgroundColor: { dark: string; light: string };
}>;

export default function ParallaxFlatList<T>({
  children,
  headerImage,
  headerBackgroundColor,
  ...flatListProps
}: Props<T>) {
  const colorScheme = useColorScheme() ?? 'light';

  const scrollOffset = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollOffset.value = event.contentOffset.y;
    },
  });

  const bottom = useBottomTabOverflow();
  const headerAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            scrollOffset.value,
            [0, HEADER_HEIGHT * 2],
            [0, -HEADER_HEIGHT],
            Extrapolation.CLAMP
          ),
        },
        {
          scale: interpolate(
            scrollOffset.value,
            [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
            [1.5, 1, 1],
            Extrapolation.CLAMP
          ),
        },
      ],
    };
  });

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Animated.View
          style={[
            styles.header,
            { backgroundColor: headerBackgroundColor[colorScheme] },
            headerAnimatedStyle,
          ]}>
          {headerImage}
        </Animated.View>
      </View>
      <View style={styles.content}>
        <Animated.FlatList
          onScroll={scrollHandler}
          scrollIndicatorInsets={{ bottom }}
          contentContainerStyle={{ paddingTop: HEADER_HEIGHT, paddingBottom: bottom }}
          scrollEventThrottle={16}
          {...flatListProps}
          CellRendererComponent={undefined}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageContainer: {
    position: 'absolute',
    top: 0,
    width: '100%',
  },
  header: {
    height: HEADER_HEIGHT,
    overflow: 'hidden',
  },
  content: {
    flex: 1,
    padding: 32,
    gap: 16,
    overflow: 'hidden',
  },
});
