import { styled } from '@mui/material/styles'
import { Stack } from '@mui/material'

export const FormInputWrapper = styled(Stack)(({ theme }) => ({
    justifyContent: 'space-between',
    padding: '20px',
    [theme.breakpoints.only('sm')]: {
        flexDirection: 'column',
        alignItems: 'normal',
    },
    [theme.breakpoints.only('md')]: {
        flexDirection: 'column',
        alignItems: 'normal',
    },
    [theme.breakpoints.up('lg')]: {
        flexDirection: 'column',
        alignItems: 'normal',
    },
}))
