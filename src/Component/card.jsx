import React, { Component } from 'react';

class Card extends Component {

    render() {
        return (
            <div className="block">
                <div className="row">
                    <div className="col-md-6">
                        < ul className="list-group list-group-flush" >
                            <li className="list-group-item">{this.props.movie.Title} ({this.props.movie.Year}) </li>
                        </ul >
                    </div>
                    <div className="col-md-6">
                        {this.props.nominatedMovieList.length > 0 && this.props.nominatedMovieList.some(movie => movie.imdbID === this.props.movie.imdbID) ? (
                            <button className="btn btn-primary btn-sm" style={{ position: "relative" }} type="button" disabled>Nominate</button>
                        ) : (
                                <button className="btn btn-primary btn-sm" style={{ position: "relative" }} type="button" onClick={() => this.props.onNominate(this.props.movie)}>Nominate</button>
                            )}
                    </div>
                </div>
            </div >
        );
    }
}

export default Card;