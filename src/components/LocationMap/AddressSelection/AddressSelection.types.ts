import type {IAddressDataContext} from "../../../context/AddressDataContext.tsx";

export type TAddressSelectionStateProps = object; // Можна залишити порожнім, якщо нічого не передаєш
export type TAddressSelectionDispatchProps = object;
export type TAddressSelectionProps = TAddressSelectionStateProps & TAddressSelectionDispatchProps;
export type TAddressSelectionStateHook = {
    externalKeyChange: (id: string) => void;
}
// Типи для даних, які повертає хук
export type TAddressSelectionHook = IAddressDataContext & TAddressSelectionStateHook;


