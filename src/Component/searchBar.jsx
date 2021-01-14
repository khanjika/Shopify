import React, { Component } from 'react';
import './searchBar.css';
import Card from './card.jsx'
import NominatedMovies from './nomination.jsx'
import Banner from 'react-js-banner';
const axios = require('axios');

class SearchBar extends Component {

    state = {
        moviesList: {},
        nominationList: [],
        searchTerm: '',
        bannerCss: { color: "#FFF", backgroundColor: "red", fontSize: 10 },
        displayBanner: false,
        message: "",
    };

    searchMovie = () => {
        let searchWordLength = this.state.searchTerm.length;
        this.setState({ moviesList: [] });
        if (searchWordLength > 3) {
            axios
                .get(
                    `https://www.omdbapi.com/?i=tt3896198&apikey=6f0dde1c&s=${this.state.searchTerm}&type=movie`
                )
                .then(res => res.data)
                .then(res => {
                    if (!res.Search) {
                        this.setState({ moviesList: [] });
                        return;
                    }
                    this.setState({
                        moviesList: res.Search
                    });
                    this.setState({ message: '' })
                });
            setTimeout(() => {
                if (this.state.moviesList.length === 0 && searchWordLength >= 3) {
                    this.setState({ message: "Couldn't find any movie. Please search again using another search criteria." })
                }
            }, 200);
        }
    };

    handleChange = event => {
        const srchText = event.target.value;
        this.setState({ searchTerm: event.target.value });

        if (srchText.length <= 3) {
            this.setState({ message: "Please enter more than three characters" });
            this.setState({ moviesList: [] });
        } else {
            this.setState({ message: "" });
        }

        if (srchText.length === 0 && this.state.moviesList.length === 0) {
            this.setState({ message: "" })
        }
    };

    handleKeyPress(e) {
        if (e.key === 'Enter') {
            this.searchMovie();
        }
    }

    onNomination = movieDetails => {
        if (this.state.nominationList.length >= 5) {
            this.setState({ displayBanner: "true" })
        }
        else {
            this.setState({
                nominationList: [...this.state.nominationList, movieDetails]
            });
        }
    }

    RemoveNomination = movieDetails => {
        let nominationListCopy = [...this.state.nominationList]
        const index = nominationListCopy.indexOf(movieDetails);
        if (index !== -1) {
            nominationListCopy.splice(index, 1);
            this.setState({ nominationList: nominationListCopy });
        }
        if (this.state.nominationList.length <= 5) {
            this.setState({ displayBanner: "false" })
        }
    }

    displaySearchResults = () => {
        const { moviesList, searchTerm, nominationList } = this.state;
        if (moviesList.length > 0 && searchTerm.length > 0) {
            return (
                <div className="card" style={{ textAlign: "left", marginLeft: "14%" }}>
                    <span style={{ blockSize: "20%", fontWeight: "bold" }}>The Result for "{this.state.searchTerm}"</span>
                    {moviesList.map(movie => (
                        <Card movie={movie} nominatedMovieList={nominationList} onNominate={this.onNomination} key={movie.imdbID} />
                    ))}
                </div>
            );
        } else if (nominationList.length > 0) {
            return (<div className="card" style={{ textAlign: "left", marginLeft: "14%" }}>
                <span style={{ blockSize: "20%", fontWeight: "bold" }}>Search Result</span>
            </div>);
        }
    }

    nominationCard = () => {
        const { nominationList, displayBanner, moviesList, searchTerm } = this.state;
        if ((nominationList.length > 0) || (moviesList.length > 0 && searchTerm.length > 0)) {
            return (
                <div className="col-lg-6 mb-4" style={{ right: 0 }}>
                    {displayBanner === "true" ? <Banner
                        title="Can not nominate more than five movies.."
                        css={this.state.bannerCss}
                    /> : <Banner />}
                    <div className="card" style={{ textAlign: "left", marginLeft: "12%" }}>
                        <span style={{ blockSize: "20%", fontWeight: "bold" }}>Nominations</span>
                        {nominationList.length > 0 ? (
                            nominationList.map(movie => (
                                <NominatedMovies movie={movie} key={movie.imdbID} onRemoveNomination={this.RemoveNomination} />
                            ))
                        ) : (
                                <p>
                                    No movie Nominated !!
                                </p>
                            )}

                    </div>
                </div >
            );
        }
    }

    render() {
        return (
            <div>
                <div className="input-group mb-1">
                    <span>Movie Title</span>
                    <i className="fas fa-video"></i>
                </div>
                <div className="input-group mb-3">
                    <input type="text" className="form-control" placeholder="Search.." onChange={this.handleChange} onKeyUp={this.handleKeyPress.bind(this)} />
                    <div className="input-group-append">
                        <button className="btn btn-primary" type="button" onClick={this.searchMovie}>Button</button>
                    </div>
                </div>
                <div className="message" style={{ color: "red", fontWeight: "bold" }}>
                    {this.state.message}
                </div>
                <div className="container">
                    <div className="row" style={{ width: "calc(95%)" }}>
                        <div className="col-lg-6 mb-4">
                            {this.displaySearchResults()}
                        </div>
                        {this.nominationCard()}
                    </div>
                </div>
            </div>
        );
    }
}

export default SearchBar;