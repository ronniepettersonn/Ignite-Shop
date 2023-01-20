import { styled } from "..";

export const HeaderComponent = styled('header', {
    padding: '2rem 10px',
    width: '100%',
    maxWidth: 1180,
    margin: '0 auto',
    display: 'flex',
    justifyContent: 'space-between',

    'button': {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 6,
        padding: '0.75rem',
        height: 48,
        width: 48,
        background: '$gray800',
        border: 0,
        position: 'relative',

        '.count': {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'absolute',
            top: -6,
            right: -6,
            height: 24,
            width: 24,
            borderRadius: '50%',
            background: '$green500',
            color: '$white',

        }
    }
})