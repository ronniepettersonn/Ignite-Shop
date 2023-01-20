import { createContext, ReactNode, useEffect, useState } from "react";

interface BagShopContextProps {
    bag: any
    setBag: any
    setCountBag: any
    countBag: number
    total: number
    setTotal: any
    sendBag: any
    setSendBag: any
}

export const BagShopContext = createContext({} as BagShopContextProps)

interface BagShopContextProviderProps {
    children: ReactNode
}

export function BagShopContextProvider({ children }: BagShopContextProviderProps) {
    const [bag, setBag] = useState([])
    const [countBag, setCountBag] = useState(0)
    const [total, setTotal] = useState(0)

    const [sendBag, setSendBag] = useState([])

    return (
        <BagShopContext.Provider value={{ bag, setBag, setCountBag, countBag, setTotal, total, sendBag, setSendBag }}>
            {children}
        </BagShopContext.Provider>
    )
}