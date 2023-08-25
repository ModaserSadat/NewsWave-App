import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";



export default class News extends Component {

    static defaultProps = {
        country: 'in',
        pageSize: 6,
        category: 'general',

      }

      static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string,
      }
    constructor (props){
        super(props);
        this.state = {
            articles : [],
            loading: false,
            page: 1,
            totalResults:0
        }
        document.title=`${this.capitalizeFirstLetter(this.props.category)} - NewsWave`
    }

   capitalizeFirstLetter = string => {
        return string && string.charAt(0).toUpperCase() + string.slice(1);
    }

    fetchMoreData = async () => {
        
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=2f516f47bac44896982cfc4d6fd57d49&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState(
            {
                articles: this.state.articles.concat(parsedData.articles),
                page: this.state.page+1
                
            })
      };

    updateNews = async () => {
        this.props.setProgress(10);
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=2f516f47bac44896982cfc4d6fd57d49&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({loading:true})
        let data = await fetch(url);
        this.props.setProgress(30)
        let parsedData = await data.json();
        this.props.setProgress(60)
        console.log(parsedData.totalResults);
        this.setState(
            {
                articles: parsedData.articles,
                loading:false,
                totalResults: parsedData.totalResults,
                page: this.state.page+1
            })
            this.props.setProgress(100)
    }

    componentDidMount() {
        this.updateNews();
    }

  render() {
    return (
        <>
            {this.state.loading && <Spinner/>}
            <h2 className="text-center py-4 py-3" >NewsWave - Top {this.capitalizeFirstLetter(this.props.category)} Headlines</h2>
            <InfiniteScroll 
            dataLength={this.state.articles.length} 
            next={this.fetchMoreData} 
            hasMore={this.state.articles.length!==this.state.totalResults} 
            loader={<Spinner/>}
         >
            

                <div className="container">
                    <div className="row">
                        {this.state.articles.map((element, index)=>{
                            return <div className="col-md-4" key={index}>
                            <NewsItem title={element.title} description={element.description} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} publishedAt={element.publishedAt} source={element.source.name} />
                        </div> })}
                    </div>
                </div>
                
            </InfiniteScroll>

        </>
    
        
      
    )
  }
}
