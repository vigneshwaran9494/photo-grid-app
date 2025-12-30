import { Text, View } from "react-native";

const topics = [
  { id: 1, name: "forest" },
  { id: 2, name: "mountains" },
  { id: 3, name: "ocean" },
  { id: 4, name: "city" },
  { id: 5, name: "river" },
  { id: 6, name: "nature" },
  { id: 7, name: "animals" },
  { id: 8, name: "flowers" },
  { id: 9, name: "food" },
  { id: 10, name: "travel" },
];

export function TopicsList() {
  return (
    <View>
      <Text>Topics List</Text>
    </View>
  );
}