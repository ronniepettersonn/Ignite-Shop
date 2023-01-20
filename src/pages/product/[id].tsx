import axios from "axios";
import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import Stripe from "stripe";
import { BagShopContext } from "../../contexts/BagShopContext";

import { stripe } from "../../lib/stripe";
import { Imagecontainer, ProductContainer, ProductDetails } from "../../styles/pages/product";

interface ProductProps {
    product: {
        id: string
        name: string
        imageUrl: string
        price: number
        description: string
        defaultPriceId: string
    }
}

export default function Product({ product }: ProductProps) {
    const [isCreatingCheckoutSession, setIsCreateCheckoutSession] = useState(false)

    const { setBag, bag, setCountBag, setTotal } = useContext(BagShopContext)

    useEffect(() => {
        setCountBag(bag.length)
    }, [bag])

    function handleAddProductToBag() {
        setBag(state => {
            const newState = [...state, product]

            const setNewState = new Set()

            const filtered = newState.filter(item => {
                const duplicateItem = setNewState.has(item.id)
                setNewState.add(item.id)
                return !duplicateItem
            })

            return filtered
        })
    }


    /* async function handleBuyProduct() {
        try {
            setIsCreateCheckoutSession(true)

            const response = await axios.post('/api/checkout', {
                priceId: product.defaultPriceId,
            })

            const { checkoutUrl } = response.data

            window.location.href = checkoutUrl

        } catch (error) {

            setIsCreateCheckoutSession(false)

            alert('Falha ao redirecionar ao checkout')
        }
    } */

    return (
        <>

            <Head>
                <title>{product.name} | Ignite Shop</title>
            </Head>

            <ProductContainer>
                <Imagecontainer>
                    <Image src={product.imageUrl} alt='' width={520} height={480} />
                </Imagecontainer>

                <ProductDetails>
                    <h1>{product.name}</h1>
                    <span>{Intl.NumberFormat('pt-BR', {
                        style: 'currency',
                        currency: 'BRL'
                    }).format(product.price / 100)}</span>

                    <p>{product.description}</p>

                    <button disabled={isCreatingCheckoutSession} onClick={handleAddProductToBag}>Colocar na sacola</button>
                </ProductDetails>
            </ProductContainer>
        </>
    )
}

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: [
            { params: { id: 'prod_N9r7R6rK7E9XvV' } }
        ],
        fallback: 'blocking',
    }
}

export const getStaticProps: GetStaticProps<any, { id: string }> = async ({ params }) => {
    const productId = params!.id

    const product = await stripe.products.retrieve(productId, {
        expand: ['default_price'],
    })

    const price = product.default_price as Stripe.Price

    return {
        props: {
            product: {
                id: product.id,
                name: product.name,
                imageUrl: product.images[0],
                price: price.unit_amount!,
                description: product.description,
                defaultPriceId: price.id
            }
        },
        revalidate: 60 * 60 * 1 // 1 hour
    }
}