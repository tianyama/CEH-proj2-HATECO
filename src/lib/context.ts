import { Dispatch, SetStateAction, createContext } from "react";

interface NavContextProp {
  open: [boolean, Dispatch<SetStateAction<boolean>>]
  category: [string, Dispatch<SetStateAction<string>>]
}

export type FilterContextProp = [any, Dispatch<SetStateAction<any>>]

export const NavContext = createContext<NavContextProp>({open: [true, () => {}], category: ["", () => {}]});

export const FilterContext = createContext<FilterContextProp>([undefined, () => {}]);