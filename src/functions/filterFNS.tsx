
function yearFilter(arr: any[], year: string) {
  return year === "All" ? arr : arr.filter((m: any) => {
    const date = m.release_date ?? m.first_air_date;
    if (typeof date !== "string") return false;
    return date.startsWith(year);
  });
}

function genreFilter(arr: any, genreId: number | string | null){return genreId === "All" ? arr : arr.filter((m: any) => m.genre_ids?.includes(genreId));}

function applyFilters(
   arr: any,
   year: string,
   genreId: number | null, 
  ){
    let filtered = yearFilter(arr, year);
    if(genreId !== null){filtered = genreFilter(filtered, genreId)};
    console.log(genreId)
    return filtered
  }

export { applyFilters, genreFilter };