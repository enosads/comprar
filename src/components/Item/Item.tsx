import { Trash2 } from "lucide-react-native";
import { Keyboard, Text, TouchableOpacity, View } from "react-native";
import { StatusIcon } from "@/components/StatusIcon";
import type { FilterStatus } from "@/types/FilterStatus";
import { styles } from "./styles";

type ItemData = {
  status: FilterStatus;
  description: string;
};

type ItemProps = {
  data: ItemData;
  onRemove: () => void;
  onChangeStatus: () => void;
};

export const Item = ({ data, onChangeStatus, onRemove }: ItemProps) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          Keyboard.dismiss();
          onChangeStatus();
        }}
      >
        <StatusIcon status={data.status} />
      </TouchableOpacity>
      <Text style={styles.description}>{data.description}</Text>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          Keyboard.dismiss();
          onRemove();
        }}
      >
        <Trash2 size={18} color="#828282" />
      </TouchableOpacity>
    </View>
  );
};
