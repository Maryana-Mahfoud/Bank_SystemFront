import ButtonToUp from "../components/Home Components/ButtonToUp/ButtonToUp"
import FAQs from "../components/Home Components/FAQs/FAQs"
import FinancialCTA from "../components/Home Components/FinancialCTA/FinancialCTA"
import HomeHero from "../components/Home Components/Home Hero/HomeHero"
import OurProductSection from "../components/Home Components/Our Product/Components/Section/OurProductSection"
import OurFeatures from "../components/Home Components/OurFeatures/OurFeatures"
import UseCase from "../components/Home Components/UseCases/UseCase/UseCase"
import OurTestimonials from "../components/Home Components/OurTestimonials/OurTestimonials"



const Home = () => {
    
    return (
        <>
            <HomeHero/> 
            <OurProductSection />
            <UseCase />
            <OurFeatures />
            <FAQs/>
            <OurTestimonials/>
            <FinancialCTA />
            <ButtonToUp />
        </>
    )
}

export default Home
