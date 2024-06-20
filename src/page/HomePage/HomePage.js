import * as React from 'react';
import NewsCard from "../../component/NewsCard";
import './HomePage.css';
import { useState, useEffect } from "react";
import axios from 'axios';
import Pagination from '@mui/material/Pagination';

function HomePage() {
    const [apiData, setApiData] = useState([]);
    const [isChecked, setIsChecked] = useState(false);
    const [categoriesInput, setCategoriesInput] = useState('all');
    const [filterData, setFilterData] = useState([]);
    const [paginationLength, setPaginationLength] = useState(1);
    const [paginationFilterData, setPaginationFilterData] = useState([]);
    const [currentPage , setCurrentPage] = useState(1);

    const fetchData = async (category) => {
        const api = `https://newsapi.org/v2/everything?q=${category}&apiKey=61e32eb2e9b34e00a29111d802b7d329`;
        try {
            const response = await axios.get(api);
            setApiData(response.data.articles);
            setFilterData(response.data.articles);
        } catch (error) {
            console.error('API error:', error);
            if (error.message === 'Network Error') {
                alert('You are Offline')
            }else{
                alert(error.message);
            }
        }
    };

    useEffect(() => {
        fetchData(categoriesInput);
    }, [categoriesInput]);

    useEffect(() => {
        const lenOfData = filterData.length;
        const perPage = 10;
        const total_page = lenOfData > perPage ? Math.ceil(lenOfData / perPage) : 1;
        setPaginationLength(total_page);
        getPaginationValue(null, 1);
    }, [filterData]);

    const handleCheckboxChange = (event) => {
        setIsChecked(event.target.checked);
    };

    const handleCategorySet = () => {
        setCategoriesInput(document.getElementById('categoriesUserInput').value);
        setCurrentPage(1);
    };

    const filterNews = (event) => {
        const value = event.target.value.toLowerCase();
        const filtered = value ? apiData.filter(article => article.title.toLowerCase().includes(value)) : apiData;
        setFilterData(filtered);
    };

    const getPaginationValue = (event, page = 1) => {
        const itemsPerPage = 10;
        const startIndex = (page - 1) * itemsPerPage;
        const limitData = filterData.slice(startIndex, startIndex + itemsPerPage);
        setPaginationFilterData(limitData);
        setCurrentPage(page);
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

                    {!isChecked ? (
                        <div className='Search_right'>
                            <input className="search-input" type="search" placeholder="Filter news with keyword" aria-label="Search Key" onChange={filterNews} />
                        </div>
                    ) : (
                        <div className='Search_right categories'>
                            <select className="dropdown-input" id="categoriesUserInput">
                                <option value="all" hidden>
                                    {categoriesInput === 'all' ? 'Select news categories' : categoriesInput}
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
                        {paginationFilterData.length === 0 ? <NewsCard /> : paginationFilterData.map((article, index) => (
                            <NewsCard
                                key={article.url}
                                uniqueKey = {article.url}
                                title={article.title}
                                publishedAt={article.publishedAt}
                                url={article.url}
                                urlToImage={article.urlToImage}
                                content={article.content}
                            />
                        ))}
                    </div>
                </div>
                <div className='news_pagination'>
                    <Pagination className='pgn' count={paginationLength} page={currentPage} shape="rounded" variant="outlined" color="primary" onChange={(event, page) => getPaginationValue(event, page)} />
                </div>
            </div>
        </div>
    );
}

export default HomePage;
