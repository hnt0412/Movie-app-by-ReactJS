import React, { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import tmdbApi, { category, movieType, tvType } from '../../api/tmdbApi';
import { OutlineButton } from '../Button/Button';
import Input from '../input/Input';
import MovieCard from '../MovieCard/MovieCard';
import Button from '../Button/Button';
import './movie-grid.scss';

import './movie-grid.scss';
const MovieGrid = (props) => {
    const [items,setItem] = useState([]);
    const [pages,setPage] = useState(1);
    const [totalPages, setTotalPage] = useState(0);
    const { keyword } = useParams();

    useEffect(() => {
        const getList = async () => {
            let response = null;
            if (keyword === undefined) {
                const params = {};
                switch(props.category) {
                    case category.movie:
                        response = await tmdbApi.getMoviesList(movieType.upcoming, {params});
                        break;
                     default:
                        response = await tmdbApi.getMoviesList(tvType.popular, {params}); 
                }
            } else {
                const params = {
                    query: keyword
                    
                }
                response = await tmdbApi.search(props.category, {params});
          }
          setItem(response.data.results);
          setTotalPage(response.data.results);
        }
        getList();
    },[props.category, keyword]);

    const loadMore = () => {
        const getList = async () => {
            let response = null;
            if (keyword === undefined) {
                const params = {
                    page: pages + 1
                };
                switch(props.category) {
                    case category.movie:
                        response = await tmdbApi.getMoviesList(movieType.upcoming, {params});
                        break;
                     default:
                        response = await tmdbApi.getMoviesList(tvType.popular, {params}); 
                }
            } else {
                const params = {
                    page: pages + 1,
                    query: keyword
                }
                response = await tmdbApi.getMoviesList.search(props.category, {params});
          }
          setItem([...items,...response.data.results]);
          setPage(pages + 1);
        }
        getList();
    }
    return (
        <>
        <div className="section mb-3">
                <MovieSearch category={props.category} keyword={keyword}/>
        </div>
        <div className='movie-grid'>
            {
                items.map((item,i) => <MovieCard category={props.category} item={item} key={i} />)
            }
        </div>
        {       
            pages < totalPages.length ? (
                <div className="movie-grid__loadmore">
                    <OutlineButton className="small" onClick={loadMore}>Load More</OutlineButton>
                </div>
            ) : null
        }
        </>
    )
}

const MovieSearch = (props) => {
    const history = useHistory();
    const [keyword, setKeyword] = useState(props.keyword ? props.keyword : '');
    const goToSearch = useCallback(
        () => {
            if (keyword.trim().length > 0) {
                history.push(`/${category[props.category]}/search/${keyword}`);
            }
        }, [keyword, props.category, history]);

        useEffect(() => {
            const enterEvent = (e) => {
                e.preventDefault();
                if (e.keyCode === 13) {
                    goToSearch();
                }
            }
            document.addEventListener('keyup', enterEvent);
            return () => {
                document.removeEventListener('keyup', enterEvent);
            };
        }, [keyword, goToSearch]);
    
    return (
        <div className="movie-search">
            <Input
            type="text"
            placeholder="Enter keyword"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)} />
             <Button className="small" onClick={goToSearch}>Search</Button>
        </div>
    )
}

export default MovieGrid;