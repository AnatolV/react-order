import {createContext, type FC, type ReactNode, useCallback, useEffect, useState} from "react";
import type {IAddresses, IOperators, TLevel} from "../components/LocationMap/types.ts";

const EMULATION_MODE = true; // Установите false для использования реального API
interface IData {
    operators: IOperators | null;
    regions: IAddresses | null;
    cities: IAddresses | null;
    addresses: IAddresses | null;
}

export type TBooleanState = {
    operators: boolean;
    regions: boolean;
    cities: boolean;
    addresses: boolean;
}
export type TSelected = {
    operators: string | null;
    regions: string | null;
    cities: string | null;
    addresses: string | null;
}

export interface IAddressDataContext {
    data: IData;
    selected: TSelected;
    isLoading: TBooleanState;
    isOpened: TBooleanState;
    error: TLevel | "";
    handleSelect: (level: TLevel, value: string) => void;
    handleToggle: (level: TLevel) => void;
    fetchAddressData: <T extends keyof IData>(level: T, parentId?: string) => Promise<void>;
}

export const AddressDataContext = createContext<IAddressDataContext | null>(null);

interface IProps {
    children: ReactNode;
}

const AddressDataProvider: FC<IProps> = ({children}) => {
    /** храним полученные адреса */
    const [data, setData] = useState<IData>({operators: null, regions: null, cities: null, addresses: null});
    /** храним выбранные пользователем адреса */
    const [selected, setSelected] = useState<TSelected>(() => {
        const saved = localStorage.getItem("address-selection");
        // const saved = null;
        return saved ? JSON.parse(saved) : {operators: "", regions: "", cities: "", addresses: ""};
    });
    /** состояние получения адресов */
    const [isLoading, setIsLoading] = useState<TBooleanState>({
        operators: false,
        regions: false,
        cities: false,
        addresses: false
    });
    /** состояние открытия выпадающего списка */
    const [isOpened, setIsOpened] = useState<TBooleanState>({
        operators: false,
        regions: false,
        cities: false,
        addresses: false
    });
    /**
     * уровень на котором произошла ошибка*/
    const [error, setError] = useState<TLevel | "">("");
    const baseUrl = import.meta.env.BASE_URL;
    // State for raw operator data when emulating
    const [operatorRawData, setOperatorRawData] = useState<IAddresses | null>(null);

    /**
     * запись в localStorage выбранных адресов
     * */
    useEffect(() => {
        localStorage.setItem("address-selection", JSON.stringify(selected));
    }, [selected]);

    // Effect to load raw data for the selected operator in emulation mode
    useEffect(() => {
        if (EMULATION_MODE && selected.operators) {
            const operatorId = selected.operators;
            fetch(`${baseUrl}api/operators/${operatorId}/regions/index.json`)
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    }
                    return []; // Return empty array if data file not found
                })
                .then(raw => {
                    setOperatorRawData(raw);
                })
                .catch(() => {
                    setOperatorRawData(null); // Clear data on error
                });
        } else {
            setOperatorRawData(null); // Clear if not in emulation or no operator selected
        }
    }, [selected.operators]);

    const fetchAddressData = useCallback(async (level: TLevel) => {
        setIsLoading((prev: any) => ({...prev, [level]: true}));
        setError("");
        try {
            let responseData: any;
            if (level === 'operators') {
                const res = await fetch(`${baseUrl}api/operators/index.json`);
                const operatorData: any[] = await res.json();
                responseData = operatorData.reduce((acc, item) => {
                    if (item.id) {
                        acc[item.id] = {name: item.name}
                    }
                    return acc;
                }, {});
            } else if (level === 'regions') {
                const res = await fetch(`${baseUrl}api/operators/${selected.operators}/index.json`);
                const operatorData: any[] = await res.json();
                responseData = operatorData.reduce((acc, item) => {
                    if (item.id) {
                        acc[item.id] = {name: item.name}
                    }
                    return acc;
                }, {});
            } else if (level === 'cities') {
                if (EMULATION_MODE) {
                    // выберем из operatorRawData регионы
                    if (operatorRawData && Object.keys(operatorRawData).length > 0 && selected.regions) {
                        const regionKey = selected.regions;
                        responseData = operatorRawData[regionKey].list;
                    }
                } else {
                    const res = await fetch(`${baseUrl}api/operators/${selected.operators}/${selected.regions}/index.json`);
                    const operatorData: any[] = await res.json();
                    responseData = operatorData.reduce((acc, item) => {
                        if (item.id) {
                            acc[item.id] = {name: item.name}
                        }
                        return acc;
                    }, {});
                }
            } else if (level === 'addresses') {
                if (EMULATION_MODE) {
                    if (operatorRawData && Object.keys(operatorRawData).length > 0 && selected.regions && selected.cities) {
                        const regionKey = selected.regions;
                        const citiesKey = selected.cities;
                        const regions = operatorRawData[regionKey];
                        if (regions && regions.list) {
                            responseData = regions.list[citiesKey].list;
                        }
                    }
                } else {
                    const res = await fetch(`${baseUrl}api/operators/${selected.operators}/${selected.regions}/${selected.cities}/index.json`);
                    const operatorData: any[] = await res.json();
                    responseData = operatorData
                        .reduce((acc, item) => {
                            acc[item.id] = {
                                name: item.name,
                                location: item.location
                            };
                            return acc;
                        }, {});
                }

            }
            setData(prev => ({...prev, [level]: responseData}));

        } catch (e) {
            setError(level);
        } finally {
            setIsLoading(prev => ({...prev, [level]: false}));
        }
    }, [operatorRawData, selected.operators, selected.regions, selected.cities, baseUrl]);

    /**
     * загрузка данных, если ранее уже было выбрано и сохранено в localStorage
     * или при изменении выбора пользователя
     */
    useEffect(() => {
        if (!data.operators) {
            fetchAddressData('operators');
        }
        if (selected.operators) {
            fetchAddressData('regions');
        }
        if (selected.regions && operatorRawData) {
            fetchAddressData('cities');
        }
        if (selected.cities && operatorRawData) {
            fetchAddressData('addresses');
        }
    }, [operatorRawData, selected]);


    const handleSelect = (level: TLevel, value: string) => {
        // Reset dependent fields
        if (level === 'operators') {
            setSelected(prev => ({...prev, operators: value, regions: null, cities: null, addresses: null}));
            setData(prev => ({...prev, regions: null, cities: null, addresses: null}));
        } else if (level === 'regions') {
            setSelected(prev => ({...prev, regions: value, cities: null, addresses: null}));
            setData(prev => ({...prev, cities: null, addresses: null}));
        } else if (level === 'cities') {
            setSelected(prev => ({...prev, cities: value, addresses: null}));
            setData(prev => ({...prev, addresses: null}));
        }
        // setSelected(newSelected);
        setIsOpened(prev => ({...prev, [level]: false}));
    };

    const handleToggle = (level: TLevel) => {
        const currentLevelState = isOpened[level];
        const nextIsOpenedState = {...isOpened};

        for (const key in nextIsOpenedState) {
            if (Object.prototype.hasOwnProperty.call(nextIsOpenedState, key)) {
                nextIsOpenedState[key as TLevel] = false;
            }
        }

        if (!currentLevelState) {
            nextIsOpenedState[level] = true;
        }

        setIsOpened(nextIsOpenedState);
    };

    const value: IAddressDataContext = {
        data,
        selected,
        isLoading,
        isOpened,
        error,
        handleSelect,
        handleToggle,
        fetchAddressData
    };

    return (
        <AddressDataContext.Provider value={value}>
            {children}
        </AddressDataContext.Provider>
    );
};

export default AddressDataProvider;
