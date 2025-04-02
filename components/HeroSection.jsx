import Link from 'next/link'
import Image from 'next/image'
import React from 'react'
import { Button } from './ui/button'

const HeroSection = () => {
    return (
        <section className='w-full pt-36 md:pt-48 pb-10'>
            <div className='space-y-6 text-center'>
                <div className='space-y-6 mx-auto'>
                    <h1 className='text-5xl font-bold md:text-6xl lg:text-7xl xl:text-8xl gradient-title animate-gradient'>
                        Your AI Career Coach for
                        <br />
                        Professional Success
                    </h1>
                    <p className='mx-auto max-w-[600px] text-muted-foreground md:text-xl'>
                        Advance your career with personalized guidance, interview prep, Advance AI -powered tools for job success.
                    </p>
                </div>
                <div className='flex justify-center space-x-4'>
                    <Link href='/dashboard' passHref>
                        <Button size="lg" className="px-8 cursor-pointer">Get Started</Button>
                    </Link>
                    <Link href='/dashboard'>
                        <Button size="lg" className="px-8 cursor-pointer" variant="outline">Watch Demo</Button>
                    </Link>
                </div>
                <div>
                    <div>
                        <Image
                            src="/banner.jpeg"
                            width={1280}
                            height={720}
                            alt="Banner AI Coach"
                            className='rounded-lg shadow-2xl border mx-auto'
                            priority
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default HeroSection