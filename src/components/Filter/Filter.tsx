import {
  Text,
  TouchableOpacity,
  type TouchableOpacityProps,
  Keyboard,
} from "react-native";
import { StatusIcon } from "@/components/StatusIcon";
import { FilterStatus } from "@/types/FilterStatus";
import { styles } from "./styles";

type FilterProps = TouchableOpacityProps & {
  status: FilterStatus;
  isActive: boolean;
};

export const Filter = ({ status, isActive, onPress, ...rest }: FilterProps) => {
  return (
    <TouchableOpacity
      style={[styles.container, { opacity: isActive ? 1 : 0.5 }]}
      activeOpacity={0.8}
      onPress={(event) => {
        Keyboard.dismiss();
        if (onPress) {
          onPress(event);
        }
      }}
      {...rest}
    >
      <StatusIcon status={status} />
      <Text style={styles.title}>
        {status === FilterStatus.DONE ? "Comprados" : "Pendentes"}
      </Text>
    </TouchableOpacity>
  );
};
