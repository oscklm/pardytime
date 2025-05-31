import { View } from "react-native";

interface Props {
  color: string;
  percent: number;
}
const ColorPreview = ({ color, percent }: Props) => {
  return (
    <View
      style={{
        flex: percent / 100,
        height: 100,
        backgroundColor: color,
      }}
    />
  );
};

export default ColorPreview;
