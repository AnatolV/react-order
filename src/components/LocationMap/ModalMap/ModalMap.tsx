// src/components/LocationMap/ModalMap/ModalMap.tsx
import useModalMap from "./useModalMap";
import type {TModalMapProps} from "./ModalMap.types";
import LocationList from "../LocationList/LocationList";
import {useTranslation} from "react-i18next";

const ModalMap  = (props:TModalMapProps) => {
    const { t } = useTranslation();

    const{itemClickHandler,itemRefs} = useModalMap(props);
    const {isLoading,locations} = props;
    return (
        <>
            <div className='p-2.5 h-[300px] md:w-[30%] md:h-full'>
                <p className='text-[#333] mb-2.5 text-sm'>{t('modalMap.list')}</p>
                <hr className='my-2'/>
                <ul className='list-none pt-1 pl-2 pr-1 h-[90%] overflow-y-auto'>
                    {isLoading && !locations &&(
                        <li className='p-2 text-gray-500'> Loading...</li>
                    )}
                    {!isLoading && locations &&(
                        <LocationList
                            locations={locations}
                            itemClickHandler={itemClickHandler}
                            itemsRefs={itemRefs}
                        />
                    )}
                    {!isLoading && !locations && (
                        <li className='p-2 text-gray-500'> Loading error</li>
                    )}
                </ul>
            </div>
            <div id="innermap" className='w-full h-full md:w-[70%]'></div>
        </>
    );
}

export default ModalMap;
