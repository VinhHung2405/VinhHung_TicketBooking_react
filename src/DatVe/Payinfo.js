import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { THANH_TOAN, XOA_GHE } from "../redux/constant/ticket";
import { message } from "antd";

export default function Payinfo() {
    const arrDaChon = useSelector((state) => state.ticketReducer.arrDaChon);
    const arrSeat = useSelector((state) => state.ticketReducer.arrSeat);

    let dispatch = useDispatch();

    let handleDeleteSeat = (ghe) => {
        dispatch({
            type: XOA_GHE,
            payload: arrDaChon.filter((g) => g !== ghe),
        });
        message.success(`Xóa ghế ${ghe.soGhe} thành công!`);
    };

    let renderPayTicket = () => {
        return arrDaChon.map((item, index) => {
            return (
                <tr key={index}>
                    <td>{item.soGhe}</td>
                    <td>{item.gia.toLocaleString("vi-VN")}</td>
                    <td>
                        <button
                            className="btn btn-danger"
                            onClick={() => {
                                handleDeleteSeat(item);
                            }}
                        >
                            X
                        </button>
                    </td>
                </tr>
            );
        });
    };

    let handlePayTicket = (arrDaChon) => {
        if (arrDaChon.length !== 0) {
            let updatedArrSeat = [...arrSeat];

            let updatedArrDaChon = arrDaChon.map((item) => {
                updatedArrSeat.forEach((seat) => {
                    seat.danhSachGhe.forEach((ghe) => {
                        if (ghe.soGhe === item.soGhe) {
                            ghe.daDat = true;
                        }
                    });
                });

                return {
                    ...item,
                    daDat: true,
                };
            });

            dispatch({
                type: THANH_TOAN,
                payload: {
                    arrPaid: updatedArrDaChon,
                    arrSeat: updatedArrSeat,
                },
            });
            message.success(" Đã thanh toán thành công!");
         }else{
            message.error("Vui lòng chọn ghế!")
         } 
    };

    let total = arrDaChon.reduce((sum, seatPicked) => {
        return sum + seatPicked.gia;
    }, 0);

    return (
        <div>
            <h3 className="title-pay">TICKET PAY</h3>
            <div className="seat_choose">
                <span className="d-inline-block seat m-2"></span>
                <span className="d-inline-block">Ghế chưa đặt</span>
            </div>
            <div className="seat_choose">
                <span className="d-inline-block seat daDat m-2"></span>
                <span className="d-inline-block">Ghế đã đặt</span>
            </div>
            <div className="seat_choose">
                <span className="d-inline-block seat dangChon m-2"></span>
                <span className="d-inline-block ">Ghế đang chọn</span>
            </div>
            <table className="table text-white mt-3">
                <thead>
                    <tr>
                        <th>Seats</th>
                        <th>Price</th>
                        <th>Cancel</th>
                    </tr>
                </thead>
                <tbody>
                    {renderPayTicket()}
                    <tr>
                        <th>Total:</th>
                        <td>{total.toLocaleString("vi-VN")}</td>
                        <td></td>
                    </tr>
                </tbody>
            </table>
            <button
                className="btn btn-success pay"
                onClick={() => {
                    handlePayTicket(arrDaChon);
                }}
            >
                Pay
            </button>
        </div>
    );
}