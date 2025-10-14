// src/app/map/_components/AddressSelection/AddressSelection.tsx
"use client";

import CustomSelect from "../CustomSelect/CustomSelect.tsx";
import {useTranslation} from "react-i18next";
import {LeafletMap} from "../LeafletMap/LeafletMap.tsx";
import {useContext} from "react";
import {AddressDataContext} from "../../../context/AddressDataContext.tsx";


const AddressSelection = () => {
    const context = useContext(AddressDataContext);
    if (!context) {
        throw new Error('useAddressSelection must be used within an AddressProvider');
    }

    const {data, isLoading, selected, isOpened, error, handleToggle, handleSelect} = context;
    const externalKeyChange = (id: string) => {
        handleSelect('addresses', id);
    }


    const { t } = useTranslation();

    const commonSelectProps = {
        searchPlaceholder: t('addressSelection.searchPlaceholder'),
        nothingFoundText: t('addressSelection.nothingFoundText'),
    };

    return (
        <>
            <div className='flex flex-col space-y-4'>
                <CustomSelect {...commonSelectProps}
                    options={data.operators}
                    level={'operators'}
                    placeholder={t('addressSelection.operator')}
                    onSelect={handleSelect}
                    onToggle={handleToggle}
                    isLoading={isLoading.operators}
                    isOpen={isOpened.operators}
                    isVisible={true}
                    value={selected.operators}
                    isSearchable={false}
                />
                <CustomSelect
                    options={data.regions}
                    level={'regions'}
                    placeholder={t('addressSelection.region')}
                    onSelect={handleSelect}
                    onToggle={handleToggle}
                    isLoading={isLoading.regions}
                    isOpen={isOpened.regions}
                    isVisible={!!data.regions || error === 'regions'}
                    value={selected.regions}
                    isSearchable={true}
                    searchPlaceholder={t('addressSelection.searchPlaceholder')}
                    nothingFoundText={t('addressSelection.nothingFoundText')}
                />
                <CustomSelect
                    options={data.cities}
                    level={'cities'}
                    placeholder={t('addressSelection.city')}
                    onSelect={handleSelect}
                    onToggle={handleToggle}
                    isLoading={isLoading.cities}
                    isOpen={isOpened.cities}
                    isVisible={!!data.cities || error === 'cities'}
                    value={selected.cities}
                    isSearchable={true}
                    searchPlaceholder={t('addressSelection.searchPlaceholder')}
                    nothingFoundText={t('addressSelection.nothingFoundText')}
                />
                <CustomSelect
                    options={data.addresses}
                    level={'addresses'}
                    placeholder={t('addressSelection.address')}
                    onSelect={handleSelect}
                    onToggle={handleToggle}
                    isLoading={isLoading.addresses}
                    isOpen={isOpened.addresses}
                    isVisible={!!data.addresses || error === 'addresses'}
                    value={selected.addresses}
                    isSearchable={true}
                    searchPlaceholder={t('addressSelection.searchPlaceholder')}
                    nothingFoundText={t('addressSelection.nothingFoundText')}
                />

            </div>
            {!isLoading.addresses && data.addresses && (
                <LeafletMap onKeyChange={externalKeyChange}  tileProvider={'visicom'}
                            addresses={data.addresses}/>
            )}
        </>
    );
};

export default AddressSelection;
