import React, {Component} from 'react';
import BookShelf from './Bookshelf';


class BookCase extends Component{
    render(){
        return(
            <div>
                <BookShelf title="Currently Reading" books={this.props.currentlyReading} onShelfChange={this.props.onShelfChange}></BookShelf>
                <BookShelf title="Want to Read" books={this.props.wantToRead} onShelfChange={this.props.onShelfChange}></BookShelf>
                <BookShelf title="Read" books={this.props.read} onShelfChange={this.props.onShelfChange}></BookShelf>
            </div>
        )
    }
}

export default BookCase
