import {
  Text,
  TouchableOpacity,
  type TouchableOpacityProps,
  Keyboard,
} from "react-native";
import { styles } from "@/components/Button/styles";

type ButtonProps = TouchableOpacityProps & {
  title: string;
};

export const Button = ({ title, onPress, ...rest }: ButtonProps) => {
  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.8}
      onPress={(event) => {
        Keyboard.dismiss();
        if (onPress) {
          onPress(event);
        }
      }}
      {...rest}
    >
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
};
