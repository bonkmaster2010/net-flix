import useMainStore from "../Hooks/MainStore"
interface DesignSelectIF{}

function DesignSelect({}: DesignSelectIF){
    const { setDesign } = useMainStore();

    return (
        <div className="design-select">
        <select onChange={(e) => setDesign(e.target.value)}>
            <option>column</option>
            <option>rows</option>
        </select>
        </div>
    )
}

export default DesignSelect;