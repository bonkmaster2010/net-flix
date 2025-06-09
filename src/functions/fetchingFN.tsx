async function ageAndGenre(id: number) {
  try {
    const genreRes = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=8f6011079947e4a258ab7e8d518e9f15&language=en-US`);
    const genreData = await genreRes.json();
    const genreMap: Record<number, string> = {};
    genreData.genres.forEach((g: { id: number; name: string }) => {
      genreMap[g.id] = g.name;
    });
    const movieRes = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=8f6011079947e4a258ab7e8d518e9f15&language=en-US`);
    const movieData = await movieRes.json();
    const genreNames = movieData.genres.map((g: { id: number; name: string }) => g.name);
    const ageRes = await fetch(`https://api.themoviedb.org/3/movie/${id}/release_dates?api_key=8f6011079947e4a258ab7e8d518e9f15`);
    const ageData = await ageRes.json();
    const usRelease = ageData.results.find((r: any) => r.iso_3166_1 === 'US');
    let certification = 'NR'; 

    if (usRelease && usRelease.release_dates.length > 0) {
      certification = usRelease.release_dates[0].certification || 'NR';
    }
    
    return {
      genres: genreNames,
      ageRating: certification,
    };
  } catch (error) {
    console.error('Error fetching age and genre:', error);
    return { genres: [], ageRating: 'NR' };
  }
}

  const trailer = async (id: number) => {
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${id}/videos?api_key=8f6011079947e4a258ab7e8d518e9f15&language=en-US`
      );
      const data = await res.json();

      const trailers = data.results.filter(
        (video: any) => video.type === 'Trailer' && video.site === 'YouTube'
      );

      if (trailers.length > 0) {
        const trailerUrl = `https://www.youtube.com/embed/${trailers[0].key}`;
        return trailerUrl
      } else {
        console.log('No trailers found.');
      }
    } catch (error) {
      console.error('Error fetching trailers:', error);
    }
  };
const BANNED_KEYWORDS = [
  'cock', 'dick', 'penis', 'sex', 'porn', 'xxx', 'adult', 'erotic', 
  'massive', 'big', 'huge', 'fuck', 'anal', 'blowjob', 'nsfw', 
  'stepmom', 'stepdad', 'sikandar', 'footjob', 'pawg', 'threesome', 'bdsm',
  'fetish', 'orgy', 'cum', 'creampie', 'hardcore', 'milf', 'blow job', 
  'gangbang', 'lesbian', 'stripper', 'striptease', 'bondage', 'kink',
  'bareback', 'twink', 'fisting', 'deepthroat', 'sex toys', 'intercourse',
  'oral', 'voyeur', 'squirting', 'bukkake', 'creampie', 'domination', 'cuckold',
  'bareback', 'titfuck', 'foot fetish', 'barely legal', 'barely 18', 'teen porn',
  'pussy', 'clitoris', 'vagina', 'nipples', 'tits', 'boobs', 'asshole', 'butt',
  'cumshot', 'masturbate', 'jerk off', 'handjob', 'orgasm', 'rape', 'incest',
  'loli', 'pedo', 'bestiality', 'zoophilia', 'scat', 'gore', 'vomit',
  'shemale', 'trap', 'transsexual', 'transgender', 'futanari', "nudes", "nude", "hot"
];  // tryna keep it family friendly ok

function isTitleClean(title: string) {
  const lowerTitle = title.toLowerCase();
  return !BANNED_KEYWORDS.some(word => lowerTitle.includes(word));
}

async function popular(page: number = 1) {
    try {
      const res = await fetch(
       `https://api.themoviedb.org/3/movie/popular?api_key=8f6011079947e4a258ab7e8d518e9f15&language=en-US&page=${page}&include_adult=false`
      );
      const data = await res.json();
      
      const filteredResults = data.results.filter((movie: any) => 
        !movie.adult && 
        isTitleClean(movie.title) &&
        (!movie.original_title || isTitleClean(movie.original_title))
      );
      const uniqueMovies = filteredResults.filter(
      (movie: any, index: number, self: any) =>
       index === self.findIndex((m: any) => m.id === movie.id)
      );

      return uniqueMovies;
    } catch (err) {
      alert(err);
      return [];
    } 
}

  async function fetchCast(id: number){
    try{
      const res = await fetch(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=8f6011079947e4a258ab7e8d518e9f15`);
      const data = await res.json();
      return data.cast
      
    }catch(err){alert("Error Fetching movie cast >:(" + err)}
  }

  const modals = (arr: any[]) => arr.map(obj => ({ ...obj, modal: false }));

export { ageAndGenre, trailer, popular, fetchCast, modals, isTitleClean}