import React, { useState } from "react";
import { Stage, Layer } from "react-konva";
import Rectangle from "./Rect";
import "../../src/App.css";
import Color from "./Color";

const StageComponent = () => {

    let x, y, z, a, b, c;

    const removeSquare = () => {
        const rect = [...rectangles];
        setRectangles(rect, [{
            id: "",
            x: 0,
            y: 0,
            width: 0,
            height: 0,
        }])
    }

    function createSquare() {
        const initialRectangles = {
            id: Date.now(),
            x: y,
            y: b,
            width: z,
            height: c,
            stroke: color,
        };
        const rect = [...rectangles];
        rect.push(initialRectangles);
        setRectangles(rect);
    }


    const getWidthHeight = (e) => {
        if (e.type === "mousedown") {
            x = e.clientX;
            a = e.clientY;
        } else if (e.type === "touchstart") {
            x = e.changedTouches[0].clientX;
            a = e.changedTouches[0].clientY;
        } else if (e.type === "mouseup") {
            y = e.clientX;
            b = e.clientY;
            c = a - b;
            z = x - y;
            createSquare();
        } else if (e.type === "touchend") {
            y = e.changedTouches[0].clientX;
            b = e.changedTouches[0].clientY;
            c = a - b;
            z = x - y;
            createSquare();
        }
    };

    const [rectangles, setRectangles] = useState([]);
    const [color, setColor] = useState('');

    const [selectedId, selectShape] = useState(null);

    const checkDeselect = (e) => {
        const clickedOnEmpty = e.target === e.target.getStage();
        if (clickedOnEmpty) {
            selectShape(null);
        }
    };

    return (
        <div
            className="background"
            onMouseDown={(e) => getWidthHeight(e)}
            onMouseUp={(e) => getWidthHeight(e)}
            onTouchStart={(e) => getWidthHeight(e)}
            onTouchEnd={(e) => getWidthHeight(e)}
        >
            <Stage
                width={window.innerWidth}
                height={window.innerHeight}
                onMouseDown={checkDeselect}
                className="stage"
                onTouchStart={checkDeselect}
            >
                <Layer>
                    {rectangles.map((rect, i) => {
                        return (
                            <Rectangle
                                key={i}
                                shapeProps={rect}
                                isSelected={rect.id === selectedId}
                                onSelect={() => {
                                    selectShape(rect.id);
                                }}
                                removeSquare={removeSquare}
                                onChange={(newAttrs) => {
                                    const rects = rectangles.slice();
                                    rects[i] = newAttrs;
                                    setRectangles(rects);
                                }}
                            />
                        );
                    })}
                </Layer>
            </Stage>
            <Color setColor={setColor} />
        </div>
    );
}

export default StageComponent;