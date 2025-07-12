import { Image } from "./ui/Image";
import JTLogo from "@/assets/images/JT.png";

export const Logo = () => {
  return <Image source={JTLogo} style={{ width: 225, height: 225 }} />;
};
