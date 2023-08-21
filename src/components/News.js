import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'


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
    constructor (){
        super();
        this.state = {
            articles : [],
            loading: false,
            page: 1
        }
    }

    handlePreviousClick = async() => {
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=2f516f47bac44896982cfc4d6fd57d49&page=${this.state.page-1}&pageSize=${this.props.pageSize}`;
        this.setState({loading:true})
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData)
        this.setState(
            {
                page: this.state.page-1,
                articles: parsedData.articles,
                loading:false
            })

    }

    handleNextClick = async() => {
        if (!(this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize))){
            let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=2f516f47bac44896982cfc4d6fd57d49&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
            this.setState({loading:true})
            let data = await fetch(url);
            let parsedData = await data.json();
            this.setState(
                {
                    page: this.state.page + 1,
                    articles: parsedData.articles,
                    loading:false
                })
       
        }
     }

    async componentDidMount() {
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=2f516f47bac44896982cfc4d6fd57d49&page=1&pageSize=${this.props.pageSize}`;
        this.setState({loading:true})
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData)
        this.setState(
            {
                articles: parsedData.articles,
                totalResults: parsedData.totalResults,
                loading: false
            })
    }

  render() {
    return (
        <div className="container my-3">
            <h2 className="text-center" >NewsWave - Top Headlines</h2>
            {this.state.loading && <Spinner/>}
            <div className="row">
                {!this.state.loading && this.state.articles.map((element)=>{
                    return <div className="col-md-4" key={element.url}>
                    <NewsItem title={element.title} description={element.description} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} publishedAt={element.publishedAt} source={element.source.name} />
            </div>
                })}
            </div>
            <div className="container d-flex justify-content-between">

                <button type="button" disabled={this.state.page<=1} className="btn btn-primary" onClick={this.handlePreviousClick}>&larr;Previous</button>
                <button disabled={(this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize))? true:false} type="button" className="btn btn-primary" onClick={this.handleNextClick}>Next&rarr;</button>
            </div>
        </div>
    
        
      
    )
  }
}
