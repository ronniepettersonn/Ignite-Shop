import { GetServerSideProps } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Stripe from "stripe";
import { stripe } from "../../lib/stripe";
import { ImageContainer, SuccessContainer } from "../../styles/pages/success";

interface SuccessProps {
    customerName: string
    product: {
        name: string
        imageUrl: string
    }
    data: any
}

export default function Success({ customerName, product, data }: SuccessProps) {
    return (
        <>

            <Head>
                <title>Compra efetuada | Ignite Shop</title>

                <meta name="robots" content="noindex" />
            </Head>

            <SuccessContainer>
                <h1>Compra efetuada!</h1>

                <div style={{ display: 'flex', gap: '-15px' }}>
                    {
                        data.map(item => {
                            return (
                                <ImageContainer key={item.id}>
                                    <Image src={item.price.product.images[0]} alt="" width={120} height={110} />
                                </ImageContainer>
                            )
                        })
                    }
                </div>

                <p>
                    Uhuul <strong>{customerName}</strong>, sua compra de {data.length} camisetas já está a caminho da sua casa.
                </p>

                <Link href={'/'}>
                    Voltar ao catálogo
                </Link>

            </SuccessContainer>
        </>

    )
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {

    if (!query.session_id) {
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    }

    const sessionId = String(query.session_id)

    const session = await stripe.checkout.sessions.retrieve(sessionId, {
        expand: ['line_items', 'line_items.data.price.product']
    })

    const customerName = session.customer_details?.name
    const data = session.line_items?.data
    const product = session.line_items?.data[0].price?.product as Stripe.Product

    console.log(data, "VENDO DATA")

    return {
        props: {
            customerName,
            product: {
                name: product.name,
                imageUrl: product.images[0]
            },
            data
        }
    }
}
