import Image from 'next/image'
import Link from 'next/link'
import { HeaderComponent } from '../styles/components/header'

import axios from "axios";

import Logo from '../assets/logo.svg'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { BagShopContext } from '../contexts/BagShopContext'

import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    useDisclosure,
} from '@chakra-ui/react'

export function Header() {
    const { countBag, bag, setBag, setTotal, total, setSendBag, sendBag } = useContext(BagShopContext)

    const [isCreatingCheckoutSession, setIsCreateCheckoutSession] = useState(false)

    const { isOpen, onOpen, onClose } = useDisclosure()

    function handleDelete(id: string) {

        const filtered = bag.filter(item => item.id !== id)

        setBag(filtered)
    }


    setTotal(state => {
        let vlrAcc = 0
        if (bag.length !== 0) {
            const total = bag.reduce((acc, vlr) => {
                return acc + vlr.price
            }, vlrAcc)

            return total
        } else {
            return 0
        }

    })

    useEffect(() => {
        const tratado = bag.map(item => {

            return {
                price: item.defaultPriceId,
                quantity: 1
            }
        })

        setSendBag(tratado)
    }, [bag])

    async function handleBuyProduct() {
        try {
            setIsCreateCheckoutSession(true)

            /* const tratado = bag.map(item => {

                return {
                    price: item.defaultPriceId,
                    quantity: 1
                }
            })

            await setSendBag(tratado) */

            const response = await axios.post('/api/checkout', {
                priceId: sendBag
            })

            const { checkoutUrl } = response.data

            window.location.href = checkoutUrl

        } catch (error) {
            console.log(error)

            setIsCreateCheckoutSession(false)

            alert('Falha ao redirecionar ao checkout')
        }
    }

    return (
        <HeaderComponent>
            <Link href={'/'}>
                <Image src={Logo} alt='' />
            </Link>

            <button onClick={onOpen} >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M4.425 5.625H19.575V6.75L19.5803 5.62501C20.0382 5.62716 20.4797 5.79601 20.8223 6.1C21.1648 6.40398 21.3849 6.82229 21.4414 7.27675L21.4431 7.29158L22.7741 19.289C22.7742 19.2896 22.7742 19.2901 22.7743 19.2906C22.8036 19.5515 22.7778 19.8156 22.6986 20.0659C22.6192 20.3167 22.4879 20.548 22.3133 20.7447C22.1386 20.9415 21.9246 21.0992 21.685 21.2078C21.4454 21.3164 21.1856 21.3734 20.9225 21.375L20.9156 21.375H3.07746C2.8144 21.3734 2.55463 21.3164 2.31503 21.2078C2.07543 21.0992 1.86136 20.9415 1.68673 20.7447C1.5121 20.548 1.38082 20.3167 1.30143 20.0659C1.2222 19.8157 1.19641 19.5516 1.22571 19.2907C1.22577 19.2902 1.22583 19.2896 1.2259 19.289L2.55686 7.29158L2.55861 7.27675C2.61514 6.82229 2.83523 6.40398 3.17775 6.1C3.52027 5.79601 3.96177 5.62716 4.41972 5.62501L4.425 5.625ZM19.2441 7.875H4.75594L3.5079 19.125H20.4921L19.2441 7.875Z" fill={bag.length === 0 ? '#8D8D99' : 'white'} />
                    <path fillRule="evenodd" clipRule="evenodd" d="M12 4.125C11.3038 4.125 10.6361 4.40156 10.1438 4.89384C9.65156 5.38613 9.375 6.05381 9.375 6.75V9.75C9.375 10.3713 8.87132 10.875 8.25 10.875C7.62868 10.875 7.125 10.3713 7.125 9.75V6.75C7.125 5.45707 7.63861 4.21709 8.55285 3.30285C9.46709 2.38861 10.7071 1.875 12 1.875C13.2929 1.875 14.5329 2.38861 15.4471 3.30285C16.3614 4.21709 16.875 5.45707 16.875 6.75V9.75C16.875 10.3713 16.3713 10.875 15.75 10.875C15.1287 10.875 14.625 10.3713 14.625 9.75V6.75C14.625 6.05381 14.3484 5.38613 13.8562 4.89384C13.3639 4.40156 12.6962 4.125 12 4.125Z" fill={bag.length === 0 ? '#8D8D99' : 'white'} />
                </svg>
                {countBag !== 0 ? <div className='count'>{countBag}</div> : null}
            </button>


            <Drawer
                isOpen={isOpen}
                placement='right'
                onClose={onClose}
                size={'sm'}
                isFullHeight
            >
                <DrawerOverlay onClick={onClose} />
                <DrawerContent
                    maxWidth={'480px'}
                    background='#202024'
                    padding={'48px'}
                    display='flex'
                    justifyContent={'space-between'}
                    boxShadow='-4px 0px 30px rgba(0, 0, 0, 0.8)'
                    position={'relative'}
                >
                    <DrawerCloseButton position={'absolute'} height='24px' width='24px' right='24px' top='24px' border={0} background='transparent' color={'#8d8d99'} />

                    <DrawerBody marginTop={'24px'}>
                        <DrawerHeader fontSize={'20px'} fontWeight='bold' marginBottom={'32px'}>Sacola de compras</DrawerHeader>
                        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', flex: '1' }}>
                            <div style={{ maxHeight: '490px', overflow: 'scroll' }}>
                                {bag.map(item => {
                                    return (
                                        <div style={{ display: 'flex', gap: '20px', marginBottom: '24.5px' }} key={item.id}>
                                            <div style={{ display: 'flex', alignItems: 'center', borderRadius: '8px', height: '93px', width: '101.94px', background: 'linear-gradient(180deg, #1ea483 0%, #7465d4 100%)' }}>
                                                <Image src={item.imageUrl} alt='' width={100} height={100} />
                                            </div>
                                            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                                                <div>
                                                    <div style={{ fontSize: '18px', lineHeight: '160%' }}>{item.name}</div>
                                                    <div style={{ fontSize: '18px', fontWeight: 'bold', lineHeight: '160%' }}>
                                                        {Intl.NumberFormat('pt-BR', {
                                                            style: 'currency',
                                                            currency: 'BRL'
                                                        }).format(item.price / 100)}
                                                    </div>
                                                </div>

                                                <button
                                                    style={{ background: 'transparent', border: 0, fontSize: '16px', color: '#00875F', fontWeight: 'bold', textAlign: 'left' }}
                                                    onClick={() => handleDelete(item.id)}
                                                >
                                                    Remover
                                                </button>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>

                        </div>
                    </DrawerBody>

                    <DrawerFooter display={'flex'} flexDirection='column'>
                        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '3px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span style={{ fontSize: '16px' }} >Quantidade</span>
                                <span style={{ fontSize: '18px' }}>{countBag} itens</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                                <strong style={{ fontSize: '18px' }}>Valor total</strong>
                                <strong style={{ fontSize: '24px' }}>{Intl.NumberFormat('pt-BR', {
                                    style: 'currency',
                                    currency: 'BRL'
                                }).format(total / 100)}</strong>
                            </div>
                        </div>

                        <button disabled={isCreatingCheckoutSession} onClick={handleBuyProduct} style={{ marginTop: '57px', border: 0, width: '100%', padding: '20px', borderRadius: '8px', background: '#00875F', color: 'white', fontWeight: 'bold', fontSize: '18px' }}>
                            Finalizar compra
                        </button>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>




        </HeaderComponent >
    )
}