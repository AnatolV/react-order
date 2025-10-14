
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

export interface IOperator {
    name: IName
}

export interface IOperators {
    [key: string]: IOperator
}

export type TLevel = "operators" | "regions" | "cities" | "addresses";


