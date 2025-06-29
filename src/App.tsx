import Preview from './comps/Preview';
import Query from './comps/Query';
import Popular from './comps/Popular';
import GenreCard from './comps/GenreCard';
import Footer from './comps/footer';
import Login from './comps/Login'; 
import useRandom from './Hooks/RandomStore';
import useMainStore from './Hooks/MainStore';
import useLogin from './Hooks/LoginStore';
import { useDebounce } from 'use-debounce';
import { useState, useEffect } from 'react';
import { popular, modals, isTitleClean } from './functions/fetchingFN';
import GBG from './images/the_netflix_login_background__canada__2024___by_logofeveryt_dh0w8qv.jpg';
import shy from './icons/shy_joe.png';
import mad from './icons/joegub.gif';
import './styles/App.css';

interface Movie {
  id: number;
  title: string;
  overview: string;
  release_date: string;
  poster_path: string | null;
  genres: any[];
  modal?: boolean;
}

function App() {
  const [query, setQuery] = useState<string>('');
  const [preview, setPreview] = useState<Movie | null>(null);
  const [debounceQuery] = useDebounce(query, 500);
  
  const { datas, setDatas, setOriginalDatas, addToList, setAddToList, MT, setMT, genres, setGenres, age, setAge, cast, setCast } = useMainStore();
  const { popularData, setPopularData, show, setLoading, setFavs } = useRandom();
  const { isLoggedIn, username, email, password, setLoggedIn } = useLogin();

  useEffect(() => {
    const responses = async () => {
      const res1 = await popular(1);
      const res2 = await popular(2);
      const res3 = await popular(3);
      const merged = modals([...res1, ...res2, ...res3]);
      const unique = Array.from(new Map(merged.map(m => [m.id, m])).values());
      setPopularData(unique);

      const index = Math.floor(Math.random() * merged.length);
      setPreview(merged[index]);
    };

    responses();
  }, []);

  useEffect(() => {
    if (debounceQuery.trim() === '') {
      setDatas([]);
      return;
    }

    const obtain = async (): Promise<void> => {
      setLoading(true);
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/search/movie?api_key=8f6011079947e4a258ab7e8d518e9f15&query=${debounceQuery}&include_adult=false`
        );
        const data = await res.json();
        let filtered = data.results.filter((movie: any) => 
          isTitleClean(movie.title) && 
          isTitleClean(movie.original_title) &&
          isTitleClean(movie.overview)
        )
        const modaled = modals(filtered);
        setOriginalDatas(modaled);
        setDatas(modaled);
      } catch (err) {
        console.log(err);
        setDatas([]);
      } finally {
        setLoading(false);
      }
    };
    obtain();
  }, [debounceQuery]);

  useEffect(() => {
    if (username.length > 0 && password.length > 0 && email.length > 0) {
      setLoggedIn();
    }
  }, [username, password, email]);

  const overview = preview?.overview || '...';
  const shortOverview = overview.length > 80 ? overview.slice(0, 80) + '...' : overview;

  if (!isLoggedIn) {
    return <Login />;
  }

  return (
    <>
      {/* Hero Preview */}
      {popularData.length > 0 && show === false && (
        <Preview
          preview={preview}
          setPreview={setPreview}
          shortOV={shortOverview}
          MT={MT}
          age={age}
          genres={genres}
          cast={cast}
          setMT={setMT}
          setGenres={setGenres}
          setAge={setAge}
          setCast={setCast}
        />
      )}

      {/* Main Container */}
      {show && (
        <div className="search-cont">
          <input
            placeholder="enter a movie name please"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
            }}
          />
        </div>
      )}

      <div className="main-cont">
        {show && query.length <= 0 && (
          <p className="loading">
            Please enter a movie name
            <img src={shy} alt="shy emoji" />
          </p>
        )}
        {show && query.length > 0 && datas.length <= 0 && (
          <p className="loading">
            No results found <img id="gif" src={mad} />
          </p>
        )}
        {show && (
          <Query
            addToList={addToList}
            setAddToList={setAddToList}
            MT={MT}
            age={age}
            genres={genres}
            cast={cast}
            setMT={setMT}
            setAge={setAge}
            setGenres={setGenres}
            setCast={setCast}
          />
        )}
        {show === false && (
          <>
            <Popular
              popularData={popularData}
              setPopularData={setPopularData}
              addToList={addToList}
              setAddToList={setAddToList}
              setFavs={setFavs}
              MT={MT}
              age={age}
              genres={genres}
              cast={cast}
              setMT={setMT}
              setAge={setAge}
              setGenres={setGenres}
              setCast={setCast}
            />
            <h2 className="genres-title">Genres</h2>
            <div className="GC-cont">
              <GenreCard genreName="Action" id={28} BG={GBG} />
              <GenreCard genreName="Comedy" id={35} BG={GBG} />
              <GenreCard genreName="Mystery" id={9648} BG={GBG} />
              <GenreCard genreName="Thriller" id={28} BG={GBG} />
              <GenreCard genreName="Science Fiction" id={878} BG={GBG} />
              <GenreCard genreName="Adventure" id={12} BG={GBG} />
            </div>
          </>
        )}
      </div>
      <Footer />
    </>
  );
}

export default App;
