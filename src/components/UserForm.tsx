
import React, {useContext} from 'react';
import {useTranslation} from 'react-i18next';
import {StoreDataContext} from '../context/StoreDataContext';
import {AddressDataContext} from '../context/AddressDataContext'; // Import the new context hook
import useLocalStorageState from '../hooks/useLocalStorageState';
import AddressSelection from "./LocationMap/AddressSelection/AddressSelection.tsx";

interface UserData {
    name: string;
    phone: string;
    email: string;
}

const UserForm: React.FC = () => {
    const {t} = useTranslation();

    // Get data from contexts
    const storeContext = useContext(StoreDataContext);
    const addressContext = useContext(AddressDataContext);

    // State for user data with localStorage persistence
    const [user, setUser] = useLocalStorageState<UserData>('orderUserData', {
        name: '',
        phone: '',
        email: '',
    });

    // Validate contexts
    if (!storeContext) {
        throw new Error('UserForm must be used within a StoreDataContext.Provider');
    }

    const {state, products} = storeContext;
    const {data: storeData} = state;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setUser((prev) => ({...prev, [name]: value}));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        let fullAddress={};
        // --- Assemble Final Order Data ---
        if(addressContext){
            const {selected, data} = addressContext;

            // Helper to find name by ID
            const findNameById = (level: keyof typeof data, id: string | null) => {
                if (!id || !data[level]) return null;
                const items = data[level] as { id: string, name: any }[] | Record<string, { name: any }>;
                if (Array.isArray(items)) {
                    return items.find(item => item.id === id)?.name || null;
                }
                return items[id]?.name || null;
            };

            fullAddress = {
                operator: findNameById('operators', selected.operators),
                region: findNameById('regions', selected.regions),
                city: findNameById('cities', selected.cities),
                address: findNameById('addresses', selected.addresses),
            };
        }


        const subtotal = products.reduce((acc, product) => acc + product.current_price * product.quantity, 0);

        const orderData = {
            user,
            address: fullAddress,
            cart: {
                items: products,
                subtotal: subtotal.toFixed(2),
                deliveryPrice: (storeData?.delivery?.price || 0).toFixed(2),
                total: (subtotal + (storeData?.delivery?.price || 0)).toFixed(2),
            },
        };

        console.log("--- FINAL ORDER DATA ---", orderData);
        alert(t('userForm.alert', {name: user.name}));
    };

    const deliveryPrice = storeData?.delivery?.price || 0;
    const subtotal = products.reduce((acc, product) => acc + product.current_price * product.quantity, 0);
    const total = subtotal + deliveryPrice;

    return (
        <div className="mt-4 rounded-lg bg-white shadow-lg">
            {/* Summary Section */}
            <div className="p-6">
                <div className="space-y-3">
                    <div className="flex items-center justify-between text-gray-600">
                        <span>{t('userForm.subtotal')}</span>
                        <span className="font-medium text-gray-900">{subtotal.toFixed(2)} {t('currency')}</span>
                    </div>
                    <div className="flex items-center justify-between text-gray-600">
                        <span>{t('userForm.deliveryInfo')}</span>
                        <span className="font-medium text-gray-900">{deliveryPrice.toFixed(2)} {t('currency')}</span>
                    </div>
                </div>
                <div
                    className="mt-4 flex items-center justify-between border-t border-gray-200 pt-4 text-xl font-bold text-gray-900">
                    <span>{t('userForm.total')}</span>
                    <span>{total.toFixed(2)} {t('currency')}</span>
                </div>
            </div>

            {/* Form Section */}
            <div className="border-t border-gray-200 bg-gray-50 p-6">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="relative">
                        <input type="text" id="name"
                               className="block bg-white px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                               placeholder=" "
                               name="name"
                               autoComplete="on"
                               value={user.name}
                               onChange={handleChange}
                               required/>
                        <label htmlFor="name"
                               className="absolute text-sm text-gray-500  duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1 rounded-sm">{t('userForm.name')}</label>
                    </div>
                    <div className="relative">
                        <input type="tel" id="phone"
                               className="block bg-white px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                               placeholder=" "
                               name="phone"
                               autoComplete="on"
                               value={user.phone}
                               onChange={handleChange}
                               required/>
                        <label htmlFor="phone"
                               className="absolute text-sm text-gray-500  duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1 rounded-sm">{t('userForm.phone')}</label>

                    </div>
                    <div className="relative">
                        <input type="email" id="email"
                               className="block bg-white px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                               placeholder=" "
                               name="email"
                               autoComplete="on"
                               value={user.email}
                               onChange={handleChange}
                               required/>
                        <label htmlFor="email"
                               className="absolute text-sm text-gray-500  duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1 rounded-sm">{t('userForm.email')}</label>

                    </div>
                    <div>
                        <AddressSelection/>
                    </div>
                    <button type="submit"
                            className="cursor-pointer w-full rounded-md bg-gray-500 bg-gradient-to-b px-4 py-2 font-semibold text-white transition duration-150 ease-in-out hover:from-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2">
                        {t('userForm.submit')}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UserForm;
