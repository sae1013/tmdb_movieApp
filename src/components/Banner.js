import React,{useState,useEffect,useCallback} from 'react'
import classes from './Banner.module.css';
import Button from '../UI/Button';
import axios from '../axios';
import useApi from '../hooks/useApi';
import requests from '../request';


function Banner() {
  const [movie,setMovie] = useState(null); 
  const {isLoading,error,sendRequest:fetchData} = useApi();
  const applyData = useCallback((data)=>{
    setMovie(data[Math.floor(Math.random()*data.length)])
  },[])
  
  useEffect(()=> {
    fetchData({url:requests.fetchNetFlixOriginals},applyData);
  },[])
  
  const truncate = useCallback((string,n) => {
    return string?.length > n ? string.substr(0,n-1) +'...' : string;
  },[]);
  
  if(!movie || error) {  
    return (
      <header style={{height:'40rem', backgroundColor:'black'}}></header>
    )
  }

  return (
    <header className={classes.banner} style={{backgroundRepeat:'no-repeat',backgroundImage:`url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`, backgroundSize:'cover'}}>
      <div className={classes.banner_contents}>
        <h1 className={classes.title}>{movie.name||movie.original_name}</h1>
        <p className={classes.description}>{truncate(movie.overview,100)}</p>
        <div className={classes.actions}>
          <Button bgColor='#fff' color="#000">재생</Button>
          <Button bgColor='rgba(0,0,0,0.5)'>상세정보</Button>
        </div>  
      </div>
      <div className={classes.banner_fadeBottom}></div>
  
    </header>
  )
}

export default Banner
