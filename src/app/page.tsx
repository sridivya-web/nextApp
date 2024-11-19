
'use client'
import Head from 'next/head';
import Link from 'next/link';
import {ChangeEvent, useEffect, useState, FormEvent} from 'react';
import Footer from './components/Footer';


 async function getData(url:string) {
  let catGiphys = await fetch(url)
  catGiphys = await catGiphys.json()
  return catGiphys  
}

interface Response  {
  data:[]
}
type formInputs = {
  searchTerm:string
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

export default function Home() {

  const [giphyData, setGiphyData]= useState<Response | null>(null);
  const [formInputs, setFormInputs] = useState<formInputs>({ searchTerm:""});
  const [searchTerm, setSearchTerm] = useState('cats');

   useEffect(()=>{
    const url = 'https://api.giphy.com/v1/gifs/search?q=cats&api_key=fZJJ67egxjN9CJN6QeZ2Dbg8Ls4LKF1W&limit=10'
    getData(url).then((resp) => {
      setGiphyData(resp);
    }); 

  },[])

  const handleInput = (e : ChangeEvent<HTMLInputElement>) => {
   const {name, value}=e.target;
   setFormInputs({...formInputs, [name]:value});

  }
 
  const search = (e : FormEvent<HTMLFormElement>) => {
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

      <form onSubmit={search}>
        <input onChange={handleInput} type="text" name="searchTerm" className='inputStyle' required/>
        <button type="submit">Search</button>
      </form>

      <h1>Search results for: {searchTerm}</h1>

      <div className='giphy-search-results-grid'>
      {
        giphyData?.data?.map((each:imgRes,index:number) => {
          return(
            <div key={index} className="giphyCard">
            <h3><Link href={`/search/${each.title}`}>{each.title}</Link></h3>
            <img src={each.images.original.url} alt={each.title} />
            </div>
          )
        })
      }
      </div>
      <Footer/>
    </div>
  );
}

