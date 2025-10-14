// src/app/map/_components/CustomSelect/useCustomSelect.ts
import React, {useEffect, useMemo, useState} from "react";
import type { TCustomSelectProps} from "./CustomSelect.types";
import type { IAddress } from "../types";
import {useTranslation} from "react-i18next";

const useCustomSelect = (props: TCustomSelectProps): {
    displayValue: string;
    handleSelect: (id: string) => void;
    isOpen: boolean;
    searchTerm: string;
    childrenLi: null | { name: string; id: string }[];
    handleToggle: () => void;
    handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void
} => {
    const {placeholder, options, onSelect, level, value, onToggle} = props;
    const [selectedItemName, setSelectedItemName] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState("");
    const displayValue = selectedItemName || placeholder;
    const { i18n } = useTranslation();

    useEffect(() => {
        if (options && value && options[value]) {
            const item = options[value];
            const name = item.name[i18n.language as keyof typeof item.name] || item.name.uk;
            setSelectedItemName(name);
        } else {
            setSelectedItemName(null);
        }
    }, [options, value, i18n.language]);

    const handleSelect = (id: string) => {
        if (options) {
            const item = options[id];
            const name = item.name[i18n.language as keyof typeof item.name] || item.name.uk;
            if (name) {
                setSelectedItemName(name);
            }
            onSelect(level, id);
            setSearchTerm(""); // Reset search on select
        }
    };

    const handleToggle = () => {
        if (onToggle) {
            onToggle(level);
        }
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    const childrenLi = useMemo(() => {
        if (!options) return null;

        const allChildren = Object.keys(options).map(
            (id) => {
                const item: IAddress = options[id];
                return {
                    id,
                    name: item.name[i18n.language as keyof typeof item.name] || item.name.uk
                }
            }
        );

        allChildren.sort((a, b) => a.name.localeCompare(b.name));

        if (!searchTerm) {
            return allChildren;
        }

        return allChildren.filter(child =>
            child.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [options, i18n.language, searchTerm]);


    return {
        isOpen: props.isOpen,
        displayValue,
        handleSelect,
        handleToggle,
        childrenLi,
        searchTerm,
        handleSearchChange,
    };
};

export default useCustomSelect;
