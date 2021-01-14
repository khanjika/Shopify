import React, { Component } from 'react';

class NominatedMovies extends Component {
    state = {}
    render() {
        return (<div className="block">
            <div className="row">
                <div className="col-md-6">
                    < ul className="list-group list-group-flush" >
                        <li className="list-group-item">{this.props.movie.Title} ({this.props.movie.Year}) </li>
                    </ul >
                </div>
                <div className="col-md-6">
                    <button className="btn btn-danger btn-sm" style={{ position: "relative" }} onClick={() => this.props.onRemoveNomination(this.props.movie)} type="button">Remove</button>
                </div>
            </div>
        </div >
        );
    }
}

export default NominatedMovies;