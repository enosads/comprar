import { Image, View } from "react-native";
import { Button } from "@/components/Button";
import { styles } from "./styles";

export function Home() {
  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require("@/assets/logo.png")} />
      <Button title={"Adicionar"} />
    </View>
  );
}
