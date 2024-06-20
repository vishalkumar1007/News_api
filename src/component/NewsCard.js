import './NewsCard.css'
import { useEffect, useState } from 'react';
// import PropTypes from 'prop-types';
import default_image from '../default_image.png'



function NewsCard({ uniqueKey, title, publishedAt, url, urlToImage, content }) {
  const [liked, setLiked] = useState(false);
  // const [localToSet, setLocalToSet] = useState(null);

  const SaveNews = async() => {
    setLiked(!liked);
    if(!liked){
      handelLocalStorageToSet();
    }else if(liked){
      handelLocalStorageToRemove();
    }
  };

  const handelLocalStorageToSet = () => {
    if (!localStorage.getItem('userLikeData')) {
      localStorage.setItem('userLikeData', JSON.stringify({}));
    }

    function getUserLikedData() {
      return JSON.parse(localStorage.getItem('userLikeData'));
    }

    const localLikedData = getUserLikedData();
    localLikedData[uniqueKey] = {
      title,
      publishedAt,
      url,
      urlToImage,
      content
    };
    localStorage.setItem('userLikeData', JSON.stringify(localLikedData))
  }

  const handelLocalStorageToRemove=()=>{
    const likedData = localStorage.getItem('userLikeData');
    if(likedData){
      const parsedLikedData = JSON.parse(likedData);
      if(parsedLikedData[uniqueKey]){
        delete parsedLikedData[uniqueKey];
        localStorage.setItem('userLikeData',JSON.stringify(parsedLikedData))
      }else{
        console.log('Liked data not found for uniqueKey:', uniqueKey);
      }
    }
  }

  useEffect(()=>{
    if (!localStorage.getItem('userLikeData')) {
      localStorage.setItem('userLikeData', JSON.stringify({}));
    }
    const likedData = localStorage.getItem('userLikeData');
    const parsedLikedData = JSON.parse(likedData);
    if(parsedLikedData[uniqueKey]){
      setLiked(true);
    }else{
      setLiked(false);
    }

  },[uniqueKey,liked])


  return (
    <div className="Card_main">
      <div className='text'>
        <div className='title'>
          <span className='text_span'>{title || 'No Data To Show'}</span>
        </div>
        <div className='publish'>
          <span className='text_span'>{publishedAt || 'No Data To Show Published'}</span>
        </div>
        <div className='content'>
          <span className='text_span_content' >{content || 'This is happen because of either fetching Error 404 or No Data On filter'}</span>
        </div>
        {
          (title && content) ? <div className='activity'>
            <span className='like_news' >
              <svg
                onClick={SaveNews}
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill={liked ? '#e90621' : 'none'}
                stroke={liked ? '#e90621' : 'currentColor'}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-heart"
              >
                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
              </svg>
            </span>
            <span className='read_more'>
              <a href={url}>Read More</a>
            </span>
          </div> : <div />
        }
      </div>
      <div className='image'  >
        <img src={urlToImage || default_image} alt="News Img" />
      </div>
    </div>
  );
}


export default NewsCard;
