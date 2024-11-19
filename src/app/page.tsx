
'use client'
import Head from 'next/head';
import Link from 'next/link';
import {useEffect, useState} from 'react';
import Footer from './components/Footer';
import Image from 'next/image'

type urlSting= {
  urls: string
}
 async function getData(url:any) {
  let catGiphys = await fetch(url)
  catGiphys = await catGiphys.json()
  return catGiphys  
}

interface response {
  data:Array<T>,
  meta:object,
  pagination:object
}
interface formInputs{


  searchTerm:string
}
export default function Home() {

  const [giphyData, setGiphyData]= useState<any>([]);
  const [formInputs, setFormInputs] = useState<formInputs | {}>({});
  const [searchTerm, setSearchTerm] = useState('cats');

   useEffect(()=>{
    const url = 'https://api.giphy.com/v1/gifs/search?q=cats&api_key=fZJJ67egxjN9CJN6QeZ2Dbg8Ls4LKF1W&limit=10'
    getData(url).then((resp) => {
      setGiphyData(resp);
    }); 

  },[])

  const handleInput = (e):void => {
   let {name, value}=e.target;
   setFormInputs({...formInputs, [name]:value});

  }
 
  const search = (e) => {
   e.preventDefault();
     const url = `https://api.giphy.com/v1/gifs/search?q=${formInputs.searchTerm}&api_key=fZJJ67egxjN9CJN6QeZ2Dbg8Ls4LKF1W&limit=10`;
     getData(url).then((resp) => {
      setGiphyData(resp);
     }); 
     setSearchTerm(formInputs.searchTerm)
  }
  return (
    <div className='container'>

      <Head>
        <title>Giphy Search App</title>
        <meta name='description' content='Love giphys? We do too. Use our advanced giphy search to find the perfect giphy for any occasion'></meta>
      <link rel="icon" href="/favicon.ico" />
      </Head>

      <p className='appTitle'>Giphy Search App</p>
      <div className="logo-container">
        <Image
            src="/logo.png"
            alt="logo"
            fill
             sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"

        />
      </div>

      <form onSubmit={search}>
        <input onChange={handleInput} type="text" name="searchTerm" className='inputStyle' required/>
        <button>Search</button>
      </form>

      <h1>Search results for: {searchTerm}</h1>

      <div className='giphy-search-results-grid'>
      {
        giphyData?.data?.map((each:any,index:number) => {
          return(
            <div key={index} className="giphyCard">
            <h3><Link href={`/search/${each.title}`}>{each.title}</Link></h3>
            <img src={each.images.original.url} alt={each.tiitle} />
            </div>
          )
        })
      }
      </div>
      <Footer/>
    </div>
  );
}
