import React, { useState, useEffect} from 'react'
import NewsItem from './NewsItem'
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";
import Spinner from './Spinner';

const News = (props) =>  {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);

   const capitalizeFirstLetter = string => {
        return string && string.charAt(0).toUpperCase() + string.slice(1);
    }

    const fetchMoreData = async () => {
        try { 
            let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
            let data = await fetch(url);
            let parsedData = await data.json();
            setArticles(articles.concat(parsedData.articles));
            // setTotalResults(parsedData.totalResults);
            setPage(page + 1)
            } catch (error) {
                console.error('Error fetching news:', error);
            }
      };

     const updateNews = async () => {
        try {
            props.setProgress(10);
            let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
            setLoading(true);
            let data = await fetch(url);
            props.setProgress(30);
            let parsedData = await data.json();
            props.setProgress(60);
            setArticles(parsedData.articles);
            setLoading(false);
            setTotalResults(parsedData.totalResults);
            setPage(page + 1);
            props.setProgress(100);
            console.log(parsedData.totalResults);
        } catch (error) {
            console.error('Error fetching news:', error);
            setLoading(false);
        }
    }

    // The useEffect hook is used to fetch news data when the component mounts.
    useEffect( ()=>{
        document.title=`${capitalizeFirstLetter(props.category)} - NewsWave`
        updateNews();
    }, [] );

    return (
        <>
            {loading && <Spinner/> }
            <h2 className="text-center" style={{ marginTop: "30px", marginBottom:"25px"}} >NewsWave - Top {capitalizeFirstLetter(props.category)} Headlines</h2>
            <InfiniteScroll 
            dataLength={articles.length} 
            next={fetchMoreData} 
            hasMore={articles.length!==totalResults} 
            loader={ <Spinner/> }
            >
                <div className="container">
                    <div className="row">
                        {articles.map((element, index) => {
                            return <div className="col-md-4" key={index}>
                            <NewsItem title={element.title} description={element.description} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} publishedAt={element.publishedAt} source={element.source.name} />
                        </div> })}
                    </div>
                </div> 
            </InfiniteScroll>
        </>     
    )
}

News.defaultProps = {
    country: 'in',
    pageSize: 6,
    category: 'general',

  }

  News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  }
  
  export default News