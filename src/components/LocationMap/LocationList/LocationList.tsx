import type {TLocationListProps} from './LocationList.types';
import type {IAddresses} from "../LeafletMap/LeafletMap.types";
import {useTranslation} from "react-i18next";
import React, {useCallback} from "react";

const LocationList = (props: TLocationListProps) => {
    const {  i18n } = useTranslation();
    const {locations,  itemClickHandler, itemsRefs} = props;
    const tempItemRefs: { [key: string]: HTMLLIElement } = {};
    const renderItems = (items: IAddresses,level=0) => {
        if (!items) return null;
        level += 1;
        return Object.keys(items).map(id => {
            const item = items[id];
            let name = item.name[i18n.language as keyof typeof item.name] || item.name.uk;
            const children = item.list ;
            if (!children) {
                name = `Пункт ${id} ${name}`;
            }
            const handleClick = useCallback((event: React.MouseEvent<HTMLLIElement>) => {
                event.stopPropagation();
                event.preventDefault();
                itemClickHandler(id);
            }, [itemClickHandler, id]);

            const levelClassName = `level_${level}`;

            const nestedList = children ? (
                <ul className={`pl-2 list-none hidden h-0 ${level === 1 ? 'group-[.active]:block group-[.active]:h-auto' : ''} ${level === 2 ? 'group-[.active]:flex group-[.active]:h-auto' : ''}`}>
                    {renderItems(children,level)}
                </ul>
            ) : null;

            return (
                <li
                    onClick={handleClick}
                    key={id}
                    ref={el => {
                        if (el) {
                            tempItemRefs[id] = el
                        }
                    }}
                    className={`group text-sm leading-none pt-1 cursor-pointer ${levelClassName}`}>
                    <div className='flex items-center justify-between p-1  rounded-sm border-2 border-blue-700 bg-gray-100 text-gray-800 group-[.active]:border-red-600'>
                        <span className='text-xs'>{name}</span>
                        {children && (
                            <span className='relative inline-block w-8 h-5'>
                                <span className="absolute text-2xl top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">+</span>
                            </span>
                        )}
                    </div>
                    {nestedList}
                </li>
            );
        });
    };
    // об'єкт елементів для можливості розкриття списку
    itemsRefs.current = tempItemRefs;
    return <>{renderItems(locations)}</>;
};

export default LocationList;
