import React from 'react'
import { Navbar } from './navbar'
import { FooterComponent } from './footer'

interface IHomeLayoutProps {
    children: React.ReactNode
}

export const HomeLayout: React.FC<IHomeLayoutProps> = ({ children }) => {
    return (

        <>
            <Navbar />
            {
                children
            }
            <FooterComponent />
        </>
    )
}
