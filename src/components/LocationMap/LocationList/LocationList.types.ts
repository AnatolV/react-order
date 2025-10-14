// src/lib/components/LocationList/LocationList.types.ts
import React from "react";
import type {IAddresses } from "../LeafletMap/LeafletMap.types.ts";

export type TLocationListStateProps = {
    locations: IAddresses;
    itemClickHandler: (key: string) => void;
    itemsRefs: React.RefObject<object>
};
export type TLocationListDispatchProps = object;
export type TLocationListProps = TLocationListStateProps & TLocationListDispatchProps;
