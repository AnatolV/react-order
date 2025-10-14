// src/lib/components/LeafletMap/LeafletMap.types.ts

// never допомагає створити помилку, якщо ви випадково спробуєте передати
// Обидва пропси (addresses і addressesUrl) одночасно.


/* два варіанти мови 'uk' | 'ru' */
/*  */
export type TProvider = "wikimedia" | "visicom";

export interface IName {
    ru?: string;
    uk: string;
}

export interface ILocation {
    lat: string;
    lng: string;
}

export interface IAddresses {
    [key: string]: IAddress
}

export interface IAddress {
    name: IName;
    location?: ILocation;
    list?: IAddresses
}

type LocaleProps = {
    tileProvider: TProvider
    onKeyChange?: (id:string) => void;
}
type UrlSourceProps = {
    addressesUrl: string;
    addresses?: never;     // Вказуємо, що `addresses` бути не повинно
};

type DataSourceProps = {
    addresses: IAddresses;
    addressesUrl?: never;  // Вказуємо, що `addressesUrl` бути не повинно
};
export type TLeafletMapStateProps = LocaleProps & (UrlSourceProps | DataSourceProps);


export type TLeafletMapDispatchProps = {
    onKeyChange?: (id:string) => void;
};
export type TLeafletMapProps = TLeafletMapStateProps & TLeafletMapDispatchProps;

export interface ILeafletMapHook {
    handleClose: () => void
    handleOpen: () => void
    locations: IAddresses | null
    opened: boolean
    isLoading: boolean
    error: string | null
}
