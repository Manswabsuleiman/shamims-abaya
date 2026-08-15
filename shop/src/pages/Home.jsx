import React from 'react'
import Navbar from '../components/Navbar'
import LandingPage from '../components/LandingPage'
import Products from '../components/Products'
import Collection from '../components/Collection'
import FooterWithBanner from '../components/Footer'
import WhatsAppFloatingButton from '../components/Float'
import DeliveryCard from '../components/Delivery'
import VideoSection from '../components/Video'

const Home = () => {
  return (
    <div>
        <Navbar/>
        <LandingPage/>
        <Products/>
        <VideoSection/>
        <Collection/>
        <DeliveryCard/>
        <FooterWithBanner/>
        <WhatsAppFloatingButton/>
        
    </div>
  )
}

export default Home