import Head from 'next/head'
import Footer from '../components/Footer'

export default function About(){

    return(
        <div className="container">
        <Head>
            <title>About</title>
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <h1>About</h1>
        <p>Love giphys? So do we. use our app <b>giphy search</b> to find the perfect giphy for any occasion.</p>

<h2>Why do people love giphys?</h2>

<p>Some people may work better with words, others with numbers, but everyone gets pictures. 90% of information transmitted to the human brain is visual.</p>

<p>Images are stronger than words. However, the fast-moving nature of GIFs make them stronger than images and their shorter length make them more digestible than video.</p>

<Footer/>
    </div>
    )
}