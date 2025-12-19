import { Image, View } from "react-native";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { styles } from "./styles";

export function Home() {
  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require("@/assets/logo.png")} />
      <View style={styles.form}>
        <Input placeholder="O que você precisa comprar?" />
        <Button title={"Adicionar"} />
      </View>
      <View style={styles.content}></View>
    </View>
  );
}
