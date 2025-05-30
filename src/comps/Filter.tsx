import useFilter from "../Hooks/FilterHook";
import useMainStore from "../Hooks/MainStore";
import { applyFilters, genreFilter } from "../functions/filterFNS";
import { years, genres } from "../utils/data";
import { useEffect } from "react";
import '../styles/Filter.css';

function Filter({}){
    const { originalDatas, setDatas } = useMainStore();
    const { date, genre, setFilterDate, setGenre } = useFilter();

    useEffect(() => {
     const filteredData = applyFilters(originalDatas, date, genre);
     const testFiltered = genreFilter(originalDatas, 28);
     console.log(testFiltered.length)
     setDatas(filteredData);
    }, [date, genre]) 

    return (
        <>
        <div className="filter-cont">
            <select onChange={(e) => setFilterDate(e.target.value)}>
                <option value="All">Release Date</option>
                {years.map((y: any, i: number) => (
                  <option value={y}  key={`${y}123${i}${i}`}>{y}</option>
                ))}
            </select>

            <select onChange={(e) => {
                setGenre(e.target.value === "All" ? "All" : Number(e.target.value));
                }}>
                <option value="All">Genre</option>
              {genres.map((genre, i) => (
                 <option key={genre.id + i} value={genre.id}>{genre.name}</option>
              ))}
            </select>
        </div>
        </>
    )
}

export default Filter;