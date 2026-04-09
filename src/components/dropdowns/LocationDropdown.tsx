import React, { type Dispatch, type SetStateAction } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const locations = [
  "Moscow",
  "Madrid",
  "Barcelona",
  "Astana",
  "Seoul",
  "Tokyo",
  "Dubai",
  "Paris",
  "Berlin",
  "New York",
  "Mumbai",
  "Bangkok",
  "Lisbon",
] as const;

interface Props {
  location: string;
  setLocation: Dispatch<SetStateAction<string>>;
}

const LocationDropdown = ({ location, setLocation }: Props) => {
  return (
    <Select
      value={location}
      onValueChange={(value) => {
        if (value) setLocation(value);
      }}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="City" />
      </SelectTrigger>
      <SelectContent className="z-11">
        <SelectGroup>
          {locations.map((city) => (
            <SelectItem key={city} value={city}>
              {city}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default LocationDropdown;
