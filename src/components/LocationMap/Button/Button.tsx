import {useTranslation} from "react-i18next";
interface IButton {
    handleOpen:()=>void
}
const Button=(props:IButton)=> {
    const { t } = useTranslation();
    return (
        <button type="button" className='cursor-pointer text-gray-950 border border-gray-700 text-left bg-gradient-to-b from-gray-50 to-gray-300 rounded-md w-full h-10 py-[5px] pl-2.5 pr-[45px] text-[15px] font-semibold leading-loose relative mt-2.5  hover:text-gray-800 hover:border-gray-600 hover:from-gray-100 hover:to-gray-400' onClick={props.handleOpen}>
            {t('buttonMap.open')}
        </button>
    );
}
export default Button;
