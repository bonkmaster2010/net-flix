import useRandom from "../Hooks/RandomStore";
import { useNavigate } from "react-router"

interface GenreCardIF{
    id: number,
    BG: any,
    genreName: string
}

function GenreCard({id, genreName, BG}: GenreCardIF){
    const { setGenreTitle } = useRandom(); 
    const navi = useNavigate();
     return (
        <>
        <div className="genre-card"  onClick={() => {
            setGenreTitle(genreName);
            navi(`/genres/${id}`);
            }}>
            <img src={BG} alt={`${genreName} background image`}/>
            <p>{genreName}</p>
        </div>
        </>
     )
}

export default GenreCard