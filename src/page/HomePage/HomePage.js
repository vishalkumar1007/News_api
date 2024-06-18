import NewsCard from "../../component/NewsCard";
import './HomePage.css';
import { useState, useEffect } from "react";
import axios from 'axios';

function HomePage() {
    const [apiData, setApiData] = useState([]);
    // const [categories, setCategories] = useState('world');

    useEffect(() => {
        const fetchData = async () => {
            const api = `https://newsapi.org/v2/everything?q=india&apiKey=61e32eb2e9b34e00a29111d802b7d329`;
            try {
                const response = await axios.get(api);
                // console.log('API Response:', response.data.articles);
                setApiData(response.data.articles);
            } catch (error) {
                console.error('API error:', error);
            }
        };
    
        fetchData();
    }, []);
    
    useEffect(() => {
        console.log('apiData length:', apiData.length);
        if (apiData.length !== 0) {
            console.log('apiData:', apiData);
        }
    }, [apiData]);
    
    

    return (
        <div className="HomePage_main">
            <div className="HomePage_content">
                <div className='Search_filter'>
                    <div className='Search_left'></div>
                    <div className='Search_right'>
                        {/* <input type="text" />
                        <button id='search_btn'>find</button> */}
                    </div>
                </div>
                <div className="news_component">
                    <div className='range_news_component'>
                        {   
                            apiData.length===0?<NewsCard/>:apiData.map((article, index) => (
                                <NewsCard
                                    key={index}
                                    title={article.title}
                                    publishedAt={article.publishedAt}
                                    url={article.url}
                                    urlToImage={article.urlToImage}
                                    content={article.content}
                                />
                            ))
                        }
                    </div>
                </div>
                <div className='news_pagination'>
                    {/* Pagination logic can go here */}
                </div>
            </div>
        </div>
    );
}

export default HomePage;
