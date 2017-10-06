import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from '../BooksAPI.js';
import Book from './Book'
// import sortBy from 'sort-by'

class BookSearch extends Component{
    // static propTypes=  {
    //     contacts: PropTypes.array.isRequired,
    //     onDeleteContact: PropTypes.func.isRequired,
    //     navigate: PropTypes.func.isRequired
    //
    // }

    state ={
        query: '',
        searchResults: [],
        message: ''
    }
    updateQuery = (query)=> {
        if (!query) {
            this.setState({query: ''});
            this.setState({searchResults: []});
            return;
        }
        this.setState({query: query})
        BooksAPI.search(query, 20).then((books)=>{
            if(books.length){
                return this.setState({searchResults: books})
            }else{
                this.setState({searchResults: []})
                this.setState({message: 'No Results'})
                return;
            }
        })
    }


    render(){
        const { query } = this.state

        return (
            <div className="search-books">
              <div className="search-books-bar">
                <Link to='/' className="close-search">Close</Link>
                <div className="search-books-input-wrapper">
                  {/*
                    NOTES: The search from BooksAPI is limited to a particular set of search terms.
                    You can find these search terms here:
                    https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                    However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                    you don't find a specific author or title. Every search is limited by search terms.
                  */}
                  <input type="text"
                      placeholder="Search by title or author"
                      value={query}
                      onChange={(event)=>(this.updateQuery(event.target.value))}
                  />

                </div>
              </div>
              <div className="search-books-results">
                <ol className="books-grid">
                    {this.state.searchResults.length > 0 && this.state.searchResults.map((book)=>(
                        <Book key={book.id} book={book} onShelfChange={this.props.onShelfChange}/>
                    ))}
                    {this.state.searchResults.length === 0 && <div>{this.state.message}</div> }
                </ol>
              </div>
            </div>
        )
    }
}


export default BookSearch
