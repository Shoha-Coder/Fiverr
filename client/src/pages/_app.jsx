import Footer from "@/components/Footer"
import Navbar from "@/components/Navbar"
import {StateProvider} from "@/context/StateContext"
import reducer, {initialState} from "@/context/StateReducers"
import '@/styles/globals.css'
import Head from "next/head"
import {useRouter} from "next/router"

export default function App({Component, pageProps}) {
    const router = useRouter()
    let hidden
    return (
        <StateProvider initialState={initialState} reducer={reducer}>
            <Head>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <div className="relative flex flex-col h-screen min-w-[320px]">
                <Navbar/>
                <div className={`mb-auto mx-auto ${router.pathname !== "/" ? "mt-36" : ""} p200:min-w-[320px] ${hidden}`}>
                    <Component {...pageProps} />
                </div>
                <Footer/>
            </div>
        </StateProvider>
    )
}