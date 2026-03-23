
import Header from "../../components/ui/Header/index.tsx";   

import  PS3Background  from "../../components/ui/BackgroundAnimated/index.tsx";
import { Examples } from "../../components/ui/sections/Examples.tsx";
import { Reviews } from "../../components/ui/sections/Reviews.tsx";
import { Cta } from "../../components/ui/CtaFooter/index.tsx";
import Hero from "../../components/ui/sections/Hero.tsx";




export default function HomePage() {
    
    return(
        <>
            <Header />
            <Hero />
            <Examples />
            <Reviews />
            <Cta />
            <PS3Background />
        </>
    )
}