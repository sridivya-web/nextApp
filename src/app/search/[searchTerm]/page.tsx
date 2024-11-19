'use client'
import Footer from '@/app/components/Footer';
import Head from 'next/head'
import Link from 'next/link';
import { useRouter } from 'next/navigation'
import { use,useEffect,useState } from "react";

type urlString= {
    urls: string
  }
   async function getData(url:any) {
    let catGiphys = await fetch(url)
    catGiphys = await catGiphys.json()
    return catGiphys  
  }

export default function Search ({ params }: { params: Promise<{ searchTerm: string }> }){
    const { searchTerm } = use(params);
    const router = useRouter();
    const [giphyData, setGiphyData]= useState<any>([]);

    useEffect(()=>{
        const url = `https://api.giphy.com/v1/gifs/search?q=${searchTerm}&api_key=fZJJ67egxjN9CJN6QeZ2Dbg8Ls4LKF1W&limit=10`
        getData(url).then((resp) => {
          setGiphyData(resp);
        }); 
    
      },[])

    return(
        <>
            <Head>
                <title>Search resulst for : {searchTerm}</title>
                <link rel="icon" href="/favicon.ico" />
                <meta name="description" content={giphyData?.data?.map((res : any, index: number) => res.titile+ ' ')}></meta>   
            </Head>
            <p>Go <Link href="/"> Home </Link></p>
            <h1>Search results for: {searchTerm}</h1>
            <div className='giphy-search-results-grid'>
      {
        giphyData?.data?.map((each:any,index:number) => {
          return(
            <div key={index} className="giphyCard">
            <h3><Link href="/search/[searchTerm]" as={`/search/${each.title}`}>{each.title}</Link></h3>
            <img src={each.images.original.url} alt={each.tiitle} />
            </div>
          )
        })
      }
      </div>
      <Footer/>
        </>
    )
}

