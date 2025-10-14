import React, {Suspense, useEffect, useReducer} from 'react';
import {I18nextProvider} from 'react-i18next';
import i18n from './i18n';
import ProductList from './components/ProductList';
import UserForm from './components/UserForm';
import LanguageSwitcher from './components/LanguageSwitcher';
import {StoreDataContext} from './context/StoreDataContext';
import {initialState, reducer} from './state/reducer';
import {SET_DATA} from './state/actions';
import type {StoreData} from './types';
import AddressDataProvider from "./context/AddressDataContext.tsx";
import "./App.css"
const App: React.FC = () => {
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        fetch('/api/order/products.json')
            .then(response => response.json())
            .then((data: StoreData) => {
                dispatch({type: SET_DATA, payload: data});
            })
            .catch(error => {
                console.error('Error fetching store data:', error);
            });
    }, []);

    if (state.loading) {
        return <div>Loading store data...</div>;
    }

    const products = state.data?.products || [];

    return (
        <Suspense fallback="Loading translations...">
            <I18nextProvider i18n={i18n}>
                <StoreDataContext.Provider value={{state, dispatch, products}}>
                    <div className="container mx-auto p-5">
                        <div className="w-full">
                            <LanguageSwitcher/>
                        </div>
                        <div className="flex flex-col md:flex-row">
                            <div className="flex-grow flex-col md:pr-6 lg:pr-12">
                                <ProductList/>
                            </div>
                            <div className="w-full md:w-xs xl:w-1/4 flex-col">
                                <AddressDataProvider>
                                    <UserForm/>
                                </AddressDataProvider>
                            </div>
                        </div>
                    </div>
                </StoreDataContext.Provider>
            </I18nextProvider>
        </Suspense>
    );
};

export default App;
