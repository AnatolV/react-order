// src/app/map/_components/CustomSelect/CustomSelect.types.ts
import type {IAddresses, TLevel} from "../types.ts";

export type TCustomSelectStateProps = object;

export type TCustomSelectDispatchProps = {
    level: TLevel;
    options: IAddresses | null;
    onSelect: (level: TLevel, id: string) => void;
    placeholder: string;
    isLoading: boolean;
    isVisible: boolean;
    isOpen: boolean;
    value: string|null;
    onToggle?: (level: TLevel) => void;
    isSearchable?: boolean;
    searchPlaceholder?: string;
    nothingFoundText?: string;
};

export type TCustomSelectProps = TCustomSelectStateProps & TCustomSelectDispatchProps;


