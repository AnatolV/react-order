
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
                    <div>
                        <label htmlFor="name"
                               className="mb-1 block text-sm font-medium text-gray-700">{t('userForm.name')}</label>
                        <input
                            type="text"
                            className="block w-full rounded-md border-gray-300 p-2 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm"
                            id="name"
                            name="name"
                            autoComplete="name"
                            value={user.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="phone"
                               className="mb-1 block text-sm font-medium text-gray-700">{t('userForm.phone')}</label>
                        <input
                            type="tel"
                            className="block w-full rounded-md border-gray-300 p-2 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm"
                            id="phone"
                            name="phone"
                            autoComplete="tel"
                            value={user.phone}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="email"
                               className="mb-1 block text-sm font-medium text-gray-700">{t('userForm.email')}</label>
                        <input
                            type="email"
                            className="block w-full rounded-md border-gray-300 p-2 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm"
                            id="email"
                            name="email"
                            autoComplete="on"
                            value={user.email}
                            onChange={handleChange}
                            required
                        />
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
