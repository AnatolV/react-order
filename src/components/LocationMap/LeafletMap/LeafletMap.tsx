// src/lib/components/LeafletMap/LeafletMap.tsx
import ModalMap from "../ModalMap/ModalMap";
import Button from "../Button/Button";
import type {TLeafletMapProps} from "./LeafletMap.types";
import useLeafletMap from "./useLeafletMap";

export function LeafletMap(props: TLeafletMapProps) {

    const {handleClose, handleOpen, locations,opened,isLoading} = useLeafletMap(props);
    const {tileProvider,onKeyChange} = props;


    return (
        <>
            {opened && (
                <>
                    <div className='fixed top-0 left-0 z-10 w-[120%] h-[120%] bg-black opacity-70' onClick={handleClose}></div>
                    <div className='fixed top-[5%] left-[5%] z-[11] flex flex-col-reverse md:flex-row h-[90%] w-[90%] overflow-inherit rounded-[3px] bg-white text-sm shadow-[0_0_10px_rgba(35,31,32,.25)]'>
                        <div
                            className='absolute -top-5 -right-5 z-[401] h-10 w-10 cursor-pointer rounded-full border-2 border-white/40 bg-[#291733] box-border outline-none transition-all duration-300 rotate-45'
                            onClick={handleClose}>
                            <div className="absolute top-[16px] left-[5px] h-[3px] w-[26px] bg-white"></div>
                            <div className="absolute top-[16px] left-[5px] h-[3px] w-[26px] rotate-90 bg-white"></div>
                        </div>
                        <ModalMap onKeyChange={onKeyChange} tileProvider={tileProvider} locations={locations} handleClose={handleClose} isLoading={isLoading}/>
                    </div>
                </>
            )}
            {!opened &&(<Button handleOpen={handleOpen}/>)}

        </>
    );
}
