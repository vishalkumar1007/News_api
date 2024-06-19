import * as React from 'react';
import NewsCard from "../../component/NewsCard";
import './HomePage.css';
import { useState, useEffect } from "react";
import axios from 'axios';
import Pagination from '@mui/material/Pagination';

function HomePage() {
    const [apiData, setApiData] = useState([]);
    const [isChecked, setIsChecked] = useState(false);
    const [catagoriesInput, setCatagoriesInput] = useState('all');

    useEffect(() => {
        const fetchData = async () => {
            const api = catagoriesInput === 'all' ? `https://newsapi.org/v2/everything?q=all&apiKey=61e32eb2e9b34e00a29111d802b7d329` : `https://newsapi.org/v2/everything?q=${catagoriesInput}&apiKey=61e32eb2e9b34e00a29111d802b7d329`;

            try {
                const response = await axios.get(api);
                setApiData(response.data.articles);
            } catch (error) {
                console.error('API error:', error);
            }
        };

        fetchData();
    }, [catagoriesInput]);

    // Handle checkbox change
    const handleCheckboxChange = (event) => {
        setIsChecked(event.target.checked);
    };

    // Handle category selection set
    const handleCategorySet = () => {
        setCatagoriesInput(document.getElementById('catagoriesUserInput').value);
    };

    return (
        <div className="HomePage_main">
            <div className="HomePage_content">
                <div className='Search_filter'>
                    <div className="Search_left">
                        <label className="switch">
                            <input
                                type="checkbox"
                                checked={isChecked}
                                onChange={handleCheckboxChange}
                            />
                            <span className="slider round" />
                        </label>
                    </div>

                    {!isChecked && (
                        <div className='Search_right'>
                            <input className="search-input" type="search" placeholder="Filter news with key word" aria-label="Search Key" />
                            <button className="search-button" type="submit">Search</button>
                        </div>
                    )}

                    {isChecked && (
                        <div className='Search_right catagories'>
                            <select className="dropdown-input" id="catagoriesUserInput">
                                <option value="all"  hidden>
                                    {
                                        catagoriesInput==='all'? 'Select news catagories':catagoriesInput
                                    }
                                </option>
                                <option value="all">all</option>
                                <option value="world">world</option>
                                <option value="cricket">cricket</option>
                                <option value="universe">universe</option>
                                <option value="entertainment">entertainment</option>
                                <option value="technology">technology</option>
                                <option value="business">business</option>
                            </select>
                            <button className="search-button" type="submit" onClick={handleCategorySet}>Set</button>
                        </div>
                    )}

                </div>
                <div className="news_component">
                    <div className='range_news_component'>
                        {
                            apiData.length === 0 ? <NewsCard /> : apiData.map((article, index) => (
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
                    <Pagination className='pgn' count={5} shape="rounded" variant="outlined" color="primary" />
                </div>
            </div>
        </div>
    );
}

export default HomePage;
