import { CircleCheck, CircleDashed } from "lucide-react-native";
import { FilterStatus } from "@/types/FilterStatus";

type StatusIconProps = {
  status: FilterStatus;
};

export const StatusIcon = ({ status }: StatusIconProps) => {
  return status === FilterStatus.DONE ? (
    <CircleCheck size={18} color="#2c46b1" />
  ) : (
    <CircleDashed size={18} color="#000" />
  );
};
