/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { Platform } from "react-native";

// Lavender with green matcha theme
const tintColorLight = "#9370DB"; // Medium lavender
const tintColorDark = "#DDA0DD"; // Light lavender for dark mode
const matchaGreen = "#7FB069"; // Soft matcha green
const matchaGreenDark = "#6B8E23"; // Darker matcha for dark mode

export const Colors = {
  light: {
    text: "#2D2D2D", // Dark gray for better readability
    background: "#FAFAFA", // Very light gray with subtle warmth
    tint: tintColorLight,
    icon: "#8A7CA8", // Muted lavender for icons
    tabIconDefault: "#B19CD9", // Light lavender for inactive tabs
    tabIconSelected: tintColorLight,
    accent: matchaGreen, // Green matcha accent color
    surface: "#F5F3FF", // Very light lavender background
    border: "#E6E1F5", // Soft lavender border
  },
  dark: {
    text: "#F0F0F0", // Light gray text
    background: "#1A1625", // Dark purple-tinted background
    tint: tintColorDark,
    icon: "#9B8FB5", // Muted lavender for dark mode icons
    tabIconDefault: "#7A6F9A", // Darker lavender for inactive tabs
    tabIconSelected: tintColorDark,
    accent: matchaGreenDark, // Darker green matcha accent
    surface: "#252035", // Slightly lighter dark surface
    border: "#3D3454", // Dark lavender border
  },
};

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: "system-ui",
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: "ui-serif",
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: "ui-rounded",
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: "ui-monospace",
  },
  default: {
    sans: "normal",
    serif: "serif",
    rounded: "normal",
    mono: "monospace",
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded:
      "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
