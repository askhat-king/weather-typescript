import React, { type Dispatch, type SetStateAction } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const types = ["none", "wind", "precipcomposite", "alerts", "temp"] as const;

interface Props {
  mapType: string;
  setMapType: Dispatch<SetStateAction<string>>;
}

const MapTypeDropdown = ({ mapType, setMapType }: Props) => {
  return (
    <Select
      value={mapType}
      onValueChange={(value) => {
        if (value) setMapType(value);
      }}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="City" />
      </SelectTrigger>
      <SelectContent className="z-11">
        <SelectGroup>
          {types.map((type) => (
            <SelectItem key={type} value={type} className="capitalize">
              {type === "none" ? "none" : type}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default MapTypeDropdown;
