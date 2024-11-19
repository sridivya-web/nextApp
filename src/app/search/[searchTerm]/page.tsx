'use client'
import Footer from '@/app/components/Footer';
import Head from 'next/head'
import Link from 'next/link';
import { use,useEffect,useState } from "react";



  interface Response {
    data:[]
  }
  type imgOrginal = {
    original: {
      url : string
    }
  }
  type imgRes = {
    title: string,
    images:imgOrginal

  }

export default function Search ({ params }: { params: Promise<{ searchTerm: string }> }){
    const { searchTerm } = use(params);
    const [giphyData, setGiphyData]= useState<Response[]>([]);

    async function getData(url:string) {
      const catGiphys = await fetch(url)
      setGiphyData(await catGiphys.json())
   
    }

    useEffect(()=>{
        const url = `https://api.giphy.com/v1/gifs/search?q=${searchTerm}&api_key=fZJJ67egxjN9CJN6QeZ2Dbg8Ls4LKF1W&limit=10`
        getData(url);
    
      },[])

    return(
        <>
            <Head>
                <title>Search resulst for : {searchTerm}</title>
                <link rel="icon" href="/favicon.ico" />
                <meta name="description" content={giphyData?.data?.map((res : imgRes) => res.title+ ' ')}></meta>   
            </Head>
            <p>Go <Link href="/"> Home </Link></p>
            <h1>Search results for: {searchTerm}</h1>
            <div className='giphy-search-results-grid'>
      {
        giphyData?.data?.map((each:imgRes,index:number) => {
          return(
            <div key={index} className="giphyCard">
            <h3><Link href="/search/[searchTerm]" as={`/search/${each.title}`}>{each.title}</Link></h3>
            <img src={each.images.original.url} alt={each.title} />
            </div>
          )
        })
      }
      </div>
      <Footer/>
        </>
    )
}

