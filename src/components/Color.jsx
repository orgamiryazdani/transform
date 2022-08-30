import { useEffect } from "react";

const Color = ({ setColor }) => {

    useEffect(() => {
        setColor("#000")
    }, []);

    const changeColor = (e) => {
        setColor(e.target.value)
    }

    return (
        <>
            <input type="color" className="colorPicker" id="color" onChange={(e) => changeColor(e)} />
        </>
    );
}

export default Color;