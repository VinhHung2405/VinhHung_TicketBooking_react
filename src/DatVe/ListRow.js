import React, { memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CHON_GHE } from "../redux/constant/ticket";
import { message } from "antd";

function ListSeat() {
    let arrDaChon = useSelector((state) => state.ticketReducer.arrDaChon);
    const arrSeat = useSelector((state) => state.ticketReducer.arrSeat);
    let dispatch = useDispatch();

    let handleChooseSeat = (ghe) => {
        if (arrDaChon.includes(ghe)) {
            dispatch({
                type: CHON_GHE,
                payload: arrDaChon.filter((g) => g !== ghe),
            });
        } else {
            dispatch({ type: CHON_GHE, payload: [...arrDaChon, ghe] });
        }
        message.success(` Chọn ghế ${ghe.soGhe} thành công!`)
    };

    let renderListSeat = (arr) => {
        return arr.map((item, index) => (
            <tr key={index}>
                <td className="rowNumber">{item.hang}</td>
                {item.danhSachGhe.map((ghe, gheIndex) => (
                    <td key={gheIndex}>
                        <div
                            onClick={() => {
                                handleChooseSeat(ghe);
                            }}
                            className={`seat 
                    ${item.hang === "" ? "rowNumber" : ""} 
                    ${ghe.daDat === true ? "daDat" : ""} 
                    ${arrDaChon.includes(ghe) ? "dangChon" : ""}`}
                        >
                            {item.hang !== "" ? ghe.soGhe.slice(1) : ghe.soGhe}
                        </div>
                    </td>
                ))}
            </tr>
        ));
    };

    return <tbody>{renderListSeat(arrSeat)}</tbody>;
}

export default memo(ListSeat);