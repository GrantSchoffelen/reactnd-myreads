import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import BookCase from './components/BookCase';
import BookSearch from './components/BookSearch';
import {Route, Link} from 'react-router-dom';

class BooksApp extends React.Component {
  state = {
      myBooks: [],
      showSearchPage: false,
  }
  componentDidMount(){
      BooksAPI.getAll().then((myBooks)=>{
          this.setState({'myBooks': myBooks});
      })
  }

onShelfChange = (book, shelf) =>{
    BooksAPI.update(book,shelf).then(
        this.setState((state)=>(
              {myBooks: state.myBooks.map((b)=>{
                 if(b.title === book.title){
                     b.shelf = shelf;
                     return b;
                 }else {
                    return b;
                }
              })}
          ))
    )
}

  render() {
    const state = this.state.myBooks
    const wantToRead = state.filter((book) => book.shelf === 'wantToRead')
    const read = state.filter((book) => book.shelf === 'read')
    const currentlyReading = state.filter((book) => book.shelf === 'currentlyReading')

    return (
      <div className="app">
         <Route exact path='/'
         render={()=>(
             <div className="list-books-content">
                 <div>
                     <div className="list-books">
                       <div className="list-books-title">
                         <h1>MyReads</h1>
                       </div>
                    </div>
                </div>
                <BookCase
                    currentlyReading={currentlyReading}
                    read={read}
                    wantToRead={wantToRead}
                    onShelfChange={this.onShelfChange}
                />
            </div>
         )}
         />
         <Route exact path='/search'
         render={()=>(
             <BookSearch myBooks={this.state.myBooks} onShelfChange={this.onShelfChange}/>
         )}
        />
        <div className="open-search">
            <Link to='/search'>Add a book</Link>
        </div>
      </div>
    )
  }
}

export default BooksApp
