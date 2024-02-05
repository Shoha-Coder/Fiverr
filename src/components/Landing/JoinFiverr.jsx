import React from 'react';
import Image from 'next/image';

const JoinFiverr = () => {
    return (
        <div className='mx-32 my-16 relative'>
            <div className="absolute z-10 top-1/3 left-10">
                <h4 className="text-white-text-5xl mb-10 text-white">
                    Suddently it&apos;s all so <i>doable.</i>
                </h4>
                <button
                    className='border text-base font-medium px-5 py-5 border-[#1dbf73] bg-[#1dbf73] text-white'
                    type='button'
                >
                    Join Fiverr
                </button>
            </div>
            <div className="w-full h-96">
                <Image src="/bg-signup.webp" fill alt='signup' className='rounded-sm' />
            </div>
        </div>
    )
}

export default JoinFiverr