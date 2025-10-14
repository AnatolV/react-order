//src/lib/components/ModalMap/ModalMap.types.ts


import type {IAddresses,  TProvider} from "../LeafletMap/LeafletMap.types";
import React from "react";
import type {LatLngTuple} from "leaflet";

export type TModalMapStateProps = {
    tileProvider: TProvider
    locations: IAddresses | null;
    isLoading:boolean
};
export type TModalMapDispatchProps = {
    onKeyChange?: (id:string) => void;
    handleClose: () => void;
};
export type TModalMapProps = TModalMapStateProps & TModalMapDispatchProps;


// Типи для даних, які повертає хук
export type TModalMapHook = {
    itemClickHandler:(key: string)=>void
    itemRefs:React.RefObject<object>
};
export type TBounds = {
    southWest: LatLngTuple;
    northEast: LatLngTuple;
};
