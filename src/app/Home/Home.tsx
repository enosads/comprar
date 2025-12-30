import { useCallback, useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { v7 as uuidv7 } from "uuid";
import { Button } from "@/components/Button";
import { Filter } from "@/components/Filter";
import { Input } from "@/components/Input";
import { Item } from "@/components/Item";
import { type ItemsStorage, itemsStorage } from "@/storage/itemsStorage";
import { FilterStatus } from "@/types/FilterStatus";
import { styles } from "./styles";

const FILTER_STATUS: FilterStatus[] = [FilterStatus.PENDING, FilterStatus.DONE];

export function Home() {
  const [filter, setFilter] = useState(FilterStatus.PENDING);
  const [description, setDescription] = useState("");
  const [items, setItems] = useState<ItemsStorage[]>([]);

  async function handleAddItem() {
    if (!description.trim()) {
      return Alert.alert("Adicionar", "Informe a descrição para adicionar");
    }

    try {
      const newItem = {
        id: uuidv7(),
        description,
        status: FilterStatus.PENDING,
      };

      await itemsStorage.add(newItem);
      setDescription("");

      if (filter === FilterStatus.DONE) {
        setFilter(FilterStatus.PENDING);
      } else {
        await getItemsByStatus();
      }
    } catch (_) {
      Alert.alert("Erro", "Não foi possível adicionar o item.");
    }
  }

  const getItemsByStatus = useCallback(async () => {
    try {
      const response = await itemsStorage.getByStatus(filter);
      setItems(response);
    } catch (_) {
      Alert.alert("Erro", "Não foi possível filtrar os itens.");
    }
  }, [filter]);

  const handleRemove = useCallback(
    async (itemId: string) => {
      try {
        await itemsStorage.remove(itemId);
        await getItemsByStatus();
      } catch (_) {
        Alert.alert("Erro", "Não foi possível remover o item.");
      }
    },
    [getItemsByStatus],
  );

  function handleClear() {
    Alert.alert("Limpar", "Deseja remover todos?", [
      { text: "Não", style: "cancel" },
      { text: "Sim", onPress: () => onClear() },
    ]);
  }

  async function onClear() {
    try {
      await itemsStorage.clear();
      setItems([]);
    } catch (error) {
      console.log(error);
      Alert.alert("Limpar", "Não foi possível remover todos os itens.");
    }
  }

  async function handleToggleItemStatus(id: string) {
    try {
      await itemsStorage.toggleStatus(id);
      await getItemsByStatus();
    } catch (error) {
      console.log(error);
      Alert.alert("Erro", "Não foi possível atualizar o status.");
    }
  }

  useEffect(() => {
    void getItemsByStatus();
  }, [getItemsByStatus]);

  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require("@/assets/logo.png")} />
      <View style={styles.form}>
        <Input
          placeholder="O que você precisa comprar?"
          value={description}
          onChangeText={setDescription}
        />
        <Button title={"Adicionar"} onPress={handleAddItem} />
      </View>
      <View style={styles.content}>
        <View style={styles.header}>
          {FILTER_STATUS.map((status) => (
            <Filter
              key={status}
              status={status}
              isActive={filter === status}
              onPress={() => setFilter(status)}
            />
          ))}
          <TouchableOpacity style={styles.clearButton} onPress={handleClear}>
            <Text style={styles.clearButtonText}>Limpar</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={items}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Item
              data={item}
              onChangeStatus={() => handleToggleItemStatus(item.id)}
              onRemove={() => handleRemove(item.id)}
            />
          )}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={() => (
            <Text style={styles.empty}>Nenhum item aqui.</Text>
          )}
        />
      </View>
    </View>
  );
}
