import {
  Blur,
  Canvas,
  RadialGradient,
  Rect,
  vec,
} from "@shopify/react-native-skia";
import { useEffect } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { useDerivedValue, useSharedValue } from "react-native-reanimated";

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

type GradientPosition = "top" | "bottom";

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

export function Gradient({ position }: GradientProps) {
  const animatedY = useSharedValue(0);
  const center = useDerivedValue(() => {
    return vec(VISUAL_CONFIG.center.x, animatedY.value);
  });

  useEffect(() => {
    animatedY.value = getTargetY(position);
  }, [position, animatedY]);

  return (
    <View style={StyleSheet.absoluteFill}>
      <Canvas style={{ flex: 1 }}>
        <Rect x={0} y={0} width={width} height={height}>
          <RadialGradient
            c={center}
            r={128}
            colors={["#98C693", "#C8B8C8", "#D8C8FF"]}
          />
          <Blur blur={VISUAL_CONFIG.blur} mode={VISUAL_CONFIG.mode} />
        </Rect>
      </Canvas>
    </View>
  );
}
