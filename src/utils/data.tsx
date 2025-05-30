const years = [
  "2025", "2024", "2023", "2022", "2021", "2020", "2019", "2018", "2017", "2016",
  "2015", "2014", "2013", "2012", "2011", "2010", "2009", "2008", "2007", "2006",
  "2005", "2004", "2003", "2002", "2001", "2000", "1999", "1998", "1997", "1996",
  "1995", "1994", "1993", "1992", "1991", "1990", "1989", "1988", "1987", "1986",
  "1985", "1984", "1983", "1982", "1981", "1980"
];

const genreMap: { [key: number]: string } = {
  28: "Action",
  12: "Adventure",
  16: "Animation",
  35: "Comedy",
  80: "Crime",
  99: "Documentary",
  18: "Drama",
  10751: "Family",
  14: "Fantasy",
  36: "History",
  27: "Horror",
  10402: "Music",
  9648: "Mystery",
  10749: "Romance",
  878: "Science Fiction",
  10770: "TV Movie",
  53: "Thriller",
  10752: "War",
  37: "Western",
};

const genres = Object.entries(genreMap).map(([id, name]) => ({id: Number(id), name}))

export { years, genres };