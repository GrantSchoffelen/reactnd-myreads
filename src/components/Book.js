import React, {Component} from 'react';
import '../App.css';


class Book extends Component{
    onBookShelfChange = (e)=>{
        e.preventDefault();
        const shelf = e.target.value;
        this.props.onShelfChange(this.props.book, shelf);
    }
    render(){
        let {shelf, title, authors} = this.props.book
        console.log(shelf)
        const style = { width: 128, height: 188, backgroundImage: `url(${this.props.book.imageLinks.smallThumbnail})` };
        return(
            <div>
                <div className="book">
                    <div className="book-top">
                        <div className="book-cover" style={style}></div>
                        <div className="book-shelf-changer">
                            <select value={shelf} onChange={this.onBookShelfChange}>
                                <option value="none" disabled>Move to...</option>
                                <option value="currentlyReading">Currently Reading</option>
                                <option value="wantToRead">Want to Read</option>
                                <option value="read">Read</option>
                                <option value="none">None</option>
                            </select>
                        </div>
                    </div>
                    <div className="book-title">{title}</div>
                    { authors ? 
                        <div
                            className="book-authors">
                            {authors.join(', ')}
                        </div>
                        : ''
                    }
                </div>
            </div>
        )
    }
}

export default Book;
