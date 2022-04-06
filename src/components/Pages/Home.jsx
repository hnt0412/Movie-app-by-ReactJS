import React from "react";
import { Link } from "react-router-dom";
import HeroSlide from "../hero-slide/HeroSlide";
import { OutlineButton } from "../Button/Button";
import MovieList from "../movie-list/movie-list";
import { category,movieType,tvType } from "../../api/tmdbApi";

const Home = () => {
    return (
        <>
            <HeroSlide />
                <div className="container">
                    <div className="section mb-3">
                        <div className="section__header mb-2">
                            <h2>Trending Movies</h2>
                            <Link to="/movie">
                                <OutlineButton className="small">View more</OutlineButton>
                            </Link>
                        </div>
                        <MovieList category={category.movie} type={movieType.popular}/>
                    </div>
                    <div className="section mb-3">
                        <div className="section__header mb-2">
                            <h2>Trending TV</h2>
                            <Link to="/movie">
                                <OutlineButton className="small">View more</OutlineButton>
                            </Link>
                        </div>
                        <MovieList category={category.tv} type={tvType.popular}/>
                    </div>
                    <div className="section mb-3">
                        <div className="section__header mb-2">
                            <h2>Best Movies</h2>
                            <Link to="/movie">
                                <OutlineButton className="small">View more</OutlineButton>
                            </Link>
                        </div>
                        <MovieList category={category.tv} type={tvType.top_rated}/>
                    </div>
                </div>
        </>
    );
}

export default Home;