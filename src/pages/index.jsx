import React from 'react';
import HeroBanner from '@/components/Landing/HeroBanner';
import Companies from '@/components/Landing/Companies';
import PopularServices from '@/components/Landing/PopularServices';
import Everything from '@/components/Landing/Everything';
import Services from '@/components/Landing/Services';
import FiverrBusiness from '@/components/Landing/FiverrBussines';
import JoinFiverr from '@/components/Landing/JoinFiverr';
import AuthWrapper from '@/components/AuthWrapper';
import { useStateProvider } from "@/context/StateContext"

const Index = () => {
  const [{ showLoginModal, showSignupModal }] = useStateProvider()
  return (
    <div className='p200:min-w-[800px]'>
      <HeroBanner />
      <Companies />
      <PopularServices />
      <Everything />
      <Services />
      <FiverrBusiness />
      {(showLoginModal || showSignupModal) && (
        <AuthWrapper type={showLoginModal ? "login" : "signup"} />
      )}
    </div>
  )
}

export default Index;