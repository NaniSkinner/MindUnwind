import {
  Blur,
  Canvas,
  RadialGradient,
  Rect,
  vec,
} from "@shopify/react-native-skia";
import { useEffect } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import {
  useDerivedValue,
  useSharedValue,
  withRepeat,
  withSpring,
  withTiming,
} from "react-native-reanimated";

const { width, height } = Dimensions.get("window");

//Visual constants
const VISUAL_CONFIG = {
  colors: ["#98C693", "#C8B8C8", "#D8C8FF"],
  blur: 10,
  mode: "clamp",
  center: {
    x: width / 2,
    y: height / 2,
  },
} as const;

//Animation constants
const ANIMATION_CONFIG = {
  durations: {
    MOUNT: 2000,
    SPEAKING_TRANSITION: 600,
    QUIT_TRANSITION: 400,
    PULSE: 1000,
  },
  spring: {
    damping: 10,
    stiffness: 50,
  },
} as const;

//Radius scaling constants
const RADIUS_CONFIG = {
  minScale: 0.6,
  maxScale: 1.4,
  speakingScale: 4.0,
  quitScale: 0.6,
  baseRadius: {
    default: width,
    speaking: width / 4,
  },
} as const;

type GradientPosition = "top" | "bottom" | "center";

interface GradientProps {
  position: GradientPosition;
  isSpeaking: boolean;
}

const getTargetY = (position: GradientPosition): number => {
  switch (position) {
    case "top":
      return 0;
    case "center":
      return VISUAL_CONFIG.center.y;
    case "bottom":
      return height;
    default:
      return VISUAL_CONFIG.center.y;
  }
};

//Helper function to calculate the radius bounds
const calculateRadiusBounds = (baseRadius: number) => {
  "worklet";
  return {
    mini: baseRadius * RADIUS_CONFIG.minScale,
    max: baseRadius * RADIUS_CONFIG.maxScale,
  };
};

const calculateTargetRadius = (baseRadius: number, isSpeaking: boolean) => {
  "worklet";
  const { mini, max } = calculateRadiusBounds(baseRadius);
  const scale = isSpeaking
    ? RADIUS_CONFIG.speakingScale
    : RADIUS_CONFIG.quitScale;

  return mini + (max - mini) * scale;
};

export function Gradient({ position, isSpeaking }: GradientProps) {
  const animatedY = useSharedValue(0);
  const radiusScale = useSharedValue(1);
  const baseRadiusValue = useSharedValue(RADIUS_CONFIG.baseRadius.default);
  const mountRadius = useSharedValue(0);

  const center = useDerivedValue(() => {
    return vec(VISUAL_CONFIG.center.x, animatedY.value);
  });

  const animatedRadius = useDerivedValue(() => {
    const { mini, max } = calculateRadiusBounds(baseRadiusValue.value);
    const calculatedRadius = mini + (max - mini) * radiusScale.value;
    return mountRadius.value < calculatedRadius
      ? mountRadius.value
      : calculatedRadius;
  });

  useEffect(() => {
    const targetY = getTargetY(position);
    animatedY.value = withSpring(targetY, ANIMATION_CONFIG.spring);
  }, [position, animatedY]);

  useEffect(() => {
    animatedY.value = getTargetY(position);
  }, [position, animatedY]);

  useEffect(() => {
    const targetRadius = calculateTargetRadius(
      RADIUS_CONFIG.baseRadius.default,
      isSpeaking
    );
    mountRadius.value = withTiming(targetRadius, {
      duration: ANIMATION_CONFIG.durations.MOUNT,
    });
  }, [position, isSpeaking, mountRadius]);

  useEffect(() => {
    const duration = ANIMATION_CONFIG.durations.SPEAKING_TRANSITION;
    if (isSpeaking) {
      baseRadiusValue.value = withTiming(RADIUS_CONFIG.baseRadius.speaking);
      animatedY.value = withTiming(getTargetY(position), { duration });
    } else {
      baseRadiusValue.value = withTiming(RADIUS_CONFIG.baseRadius.default, {
        duration,
      });
      animatedY.value = withTiming(getTargetY(position), { duration });
    }
  }, [isSpeaking, radiusScale]);

  useEffect(() => {
    if (isSpeaking) {
      radiusScale.value = withRepeat(
        withTiming(RADIUS_CONFIG.speakingScale, {
          duration: ANIMATION_CONFIG.durations.PULSE,
        }),
        -1,
        true
      );
    } else {
      radiusScale.value = withTiming(RADIUS_CONFIG.quitScale, {
        duration: ANIMATION_CONFIG.durations.QUIT_TRANSITION,
      });
    }
  }, [isSpeaking, radiusScale]);

  return (
    <View style={StyleSheet.absoluteFill}>
      <Canvas style={{ flex: 1 }}>
        <Rect x={0} y={0} width={width} height={height}>
          <RadialGradient
            c={center}
            r={animatedRadius}
            colors={["#98C693", "#C8B8C8", "#D8C8FF"]}
          />
          <Blur blur={VISUAL_CONFIG.blur} mode={VISUAL_CONFIG.mode} />
        </Rect>
      </Canvas>
    </View>
  );
}
