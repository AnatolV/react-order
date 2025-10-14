// src/app/map/_components/CustomSelect/CustomSelect.tsx
"use client";
import type {TCustomSelectProps} from "./CustomSelect.types.ts";
import useCustomSelect from "./useCustomSelect";
import {ScrollArea} from '@base-ui-components/react/scroll-area';
import { Field } from '@base-ui-components/react/field';

const CustomSelect = (props: TCustomSelectProps) => {
    const {
        displayValue,
        handleSelect,
        handleToggle,
        childrenLi,
        searchTerm,
        handleSearchChange
    } = useCustomSelect(props);
    const {isLoading, level, isVisible, isOpen, isSearchable, searchPlaceholder, nothingFoundText} = props;

    return (
        <div className={`font-normal relative w-full  mt-[5px] cursor-pointer align-middle text-gray-50 ${isVisible ? 'inline-block z-1' : 'hidden'} ${isOpen ? 'z-10' : ''}`}>
            <button type="button"
                className="text-[15px] font-bold leading-loose relative w-full h-[40px] py-[5px] pr-[45px] pl-[10px] cursor-pointer text-left align-baseline text-gray-950 border border-solid border-gray-700 rounded-md bg-gradient-to-b from-gray-50 to-gray-300 [text-shadow:1px_1px_var(--color-gray-50)]"
                onClick={handleToggle}
                disabled={isLoading}
            >
                <div className="leading-loose block overflow-hidden w-full cursor-pointer select-none align-baseline whitespace-nowrap truncate text-gray-950 [text-shadow:1px_1px_var(--color-gray-50)]">
                    {isLoading ? 'Завантаження...' : displayValue}
                </div>
                <div className="font-semibold leading-loose absolute top-0 right-0 w-[34px] h-full cursor-pointer align-baseline text-gray-950 border-l border-gray-700 [text-shadow:1px_1px_var(--color-gray-50)]">
                    <div className="absolute top-[18px] right-[12px] w-0 h-0 border-t-[5px] border-t-gray-600 border-r-[5px] border-r-transparent border-l-[5px] border-l-transparent"></div>
                </div>
            </button>
            {isOpen && (
                <div className="w-full bg-gray-50 absolute mt-[5px] rounded-md border border-gray-700 z-10">
                    {isSearchable && (
                        <Field.Root>
                            <Field.Control
                                type="text"
                                name={level + "_search"}
                                className="box-border border border-gray-200 w-[calc(100%-20px)] h-8 text-gray-900 bg-transparent rounded-[0.1rem] px-2 font-sans text-base my-[6px] mx-[10px] focus:outline-2 focus:outline-solid focus:outline-gray-600 focus:outline-offset-[-1px]"
                                placeholder={searchPlaceholder}
                                value={searchTerm}
                                onChange={handleSearchChange}
                            />
                        </Field.Root>
                    )}
                    <ScrollArea.Root className="box-border w-full h-32">
                        <ScrollArea.Viewport className="h-full rounded-md outline-offset-[-1px] overscroll-contain focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-gray-600">
                            <ScrollArea.Content className="flex flex-col gap-4 py-3 px-2">
                                <ul className="list-none">
                                    {childrenLi && childrenLi.length > 0 ? (
                                        childrenLi.map(item => (
                                            <li
                                                key={item.id}
                                                className="min-h-[18px] pt-[5px] pb-[6px] px-[10px] whitespace-normal text-gray-950 bg-gray-50 hover:text-gray-50 hover:bg-gray-950 cursor-pointer"
                                                onClick={() => handleSelect(item.id)}
                                            >
                                                {item.name}
                                            </li>
                                        ))
                                    ) : (
                                        <li className="min-h-[18px] pt-[5px] pb-[6px] px-[10px] whitespace-normal text-gray-950 bg-gray-50">{nothingFoundText || 'Nothing found'}</li>
                                    )}
                                </ul>
                            </ScrollArea.Content>
                        </ScrollArea.Viewport>
                        <ScrollArea.Scrollbar className="flex justify-center bg-gray-200 w-1 rounded-md m-2 opacity-0 transition-opacity duration-150 delay-300 data-[hovering]:opacity-100 data-[scrolling]:opacity-100 data-[hovering]:duration-75 data-[scrolling]:duration-75 data-[hovering]:delay-0 data-[scrolling]:delay-0">
                            <ScrollArea.Thumb className="w-full rounded-inherit bg-gray-500"/>
                        </ScrollArea.Scrollbar>
                    </ScrollArea.Root>

                </div>
            )}
        </div>
    );
};

export default CustomSelect;
