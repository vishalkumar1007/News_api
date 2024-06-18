import './NewsCard.css'
import { useState } from 'react';
// import PropTypes from 'prop-types';
import default_image from '../default_image.png'


function NewsCard({title,publishedAt,url,urlToImage,content}) {
    const [liked, setLiked] = useState(false);

    const SaveNews = () => {
        setLiked(!liked);
    };

    return (
        <div className="Card_main">
            <div className='text'>
                <div className='title'>
                    <span className='text_span'>{title||'Title of news'}</span>
                </div>
                <div className='publish'>
                    <span className='text_span'>{publishedAt||'Published Date'}</span>
                </div>
                <div className='content'>
                    <span className='text_span_content'>{content||'news content summery paragraph'}</span>
                </div>
                <div className='activity'>
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
                </div>
            </div>
            <div className='image'  >
                <img src={urlToImage||default_image} alt="News Img" />
            </div>
        </div>
    );
}

// NewsCard.propTypes = {
//     title: PropTypes.string.isRequired,
//     publishedAt: PropTypes.string,
//     url: PropTypes.string.isRequired,
//     urlToImage: PropTypes.string,
//     content: PropTypes.string,
// };

export default NewsCard;
