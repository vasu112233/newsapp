import React, { Component } from "react";
import Newslitem from "./Newslitem";
import Spiner from "./Spiner";
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";



export class News extends Component {
  static defaultProps = {
    country:'in',
    pageSize:8,
    category:'genral'

  }
  static propsType = {
    country:PropTypes.string,
    pageSize:PropTypes.number,
    category:PropTypes.string,
  }
  
  capitalizeFirstLetter = (string) =>{
    return string.charAt(0).toUpperCase() + string.slice(1);
}
    constructor(props) {
        super(props);
        this.state ={articles :[],
          loading: false, 
          page : 1} 
         document.title = `${this.capitalizeFirstLetter(this.props.category)} - News`;
          
    }
    async updateNews(){
      this.props.setProgress(10);
      const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=17b45628c76543678eb933f551981484&page=${this.state.page}&pageSize=${this.props.pageSize}`
      this.setState({loading:true});
      let data = await fetch(url);
      let parseData = await data.json();
      console.log(parseData);
      this.setState({articles:parseData.articles , totalResults:parseData.totalResults,
        loading:false , totalResults:0}) 

        this.props.setProgress(100);
    }
   

    async componentDidMount(){
     this.updateNews();
     //et url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=17b45628c76543678eb933f551981484&page=1&pageSize=${this.props.pageSize}`
     //his.setState({loading:true});
     //et data = await fetch(url);
     //et parseData = await data.json();
     //onsole.log(parseData);
     //his.setState({articles:parseData.articles , totalResults:parseData.totalResults,
     // loading:false})  
    }

    handelNext = async () => {
     //console.log("next");
     //if (!(this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize))) {
     //  const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=17b45628c76543678eb933f551981484&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`; 
     //  this.setState({ loading: true });
     //  const data = await fetch(url);
     //  const parseData = await data.json();
     //  console.log(parseData);
     //  this.setState({
     //    articles: parseData.articles,
     //    page: this.state.page + 1,
     //    loading: false
     //  });
     //}
     this.setState({page:this.state.page+1});
     this.updateNews();
    }
    handelPreveous= async ()=>{
     //console.log("prev");
     //
     //let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=17b45628c76543678eb933f551981484&page=${this.state.page-1}&pageSize=${this.props.pageSize}`;
     //this.setState({loading:true});
     //let data = await fetch(url);
     //let parseData = await data.json();
     //console.log(parseData);
     //this.setState({articles:parseData.articles})  
     //this.setState({
     //  page : this.state.page-1,
     //  articles:parseData.articles,
     //  loading:false
     //})
     this.setState({page:this.state.page-1});
     this.updateNews();
    }

    fetchMoreData = async  ()=>{
      this.setState({page:this.state.page+1});
      const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=17b45628c76543678eb933f551981484&page=${this.state.page}&pageSize=${this.props.pageSize}`
      this.setState({loading:true});
      let data = await fetch(url);
      let parseData = await data.json();
      console.log(parseData);
      this.setState({articles:this.state.articles.concat(parseData.articles ), totalResults:parseData.totalResults,
        loading:false , totalResults:0}) 
    }
  render() {
    
    return (
      <>
        <h2 className="text-center"> News : Top {this.capitalizeFirstLetter(this.props.category)} Hedlines</h2>

        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalresult}
          loader={<Spiner/>}
        >
          <div className="container">
        <div className="row">
            { this.state.articles.map ((element)=>{
                return <div className="col-md 4" key={element.url}>
                <Newslitem 
                  title={element.title?element.title:""}
                  description = {element.description?element.description:""}
                  imageUrl={element.urlToImage}
                  newsurl = {element.url}
                  author={element.author}
                  date = {element.publishedAt}
                  source={element.source.name}
                />
              </div>
              
            })}
        </div>
        </div>
        </InfiniteScroll>
        
      </>
    );
  }
}

export default News;
