
import Header from "../../components/ui/Header/index.tsx";   


import { Examples } from "../../components/ui/sections/Examples.tsx";
import { Reviews } from "../../components/ui/sections/Reviews.tsx";
import { Cta, Footer } from "../../components/ui/CtaFooter/index.tsx";
import Hero from "../../components/ui/sections/Hero.tsx";
import { HowItWorks } from "../../components/ui/sections/Howitworks.tsx";
import { BackgroundLight } from "../../components/ui/sections/Backgroundlight.tsx";





export default function HomePage() {
    
    return(
        <>
        <div className="relative z-10">
            <Header />
            <Hero />
            <HowItWorks />
            <Examples />
            <Reviews />
            <Cta />
            <Footer />
        </div>
        <BackgroundLight  />
        </>
    )
}
 