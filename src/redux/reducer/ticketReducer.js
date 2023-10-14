import { CHON_GHE, THANH_TOAN, XOA_GHE } from "../constant/ticket";
import data from "../../DatVe/danhSachGhe.json";

let initialState = {
    arrSeat: [...data],
    arrDaChon: [],
    arrPaid: [],
};

export let ticketReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case CHON_GHE: {
            return {
                ...state,
                arrDaChon: payload,
            };
        }

        case XOA_GHE: {
            return {
                ...state,
                arrDaChon: payload,
            };
        }

        case THANH_TOAN: {
            return {
                ...state,
                arrSeat: payload.arrSeat,
                arrDaChon: [],
                arrPaid: payload.arrPaid,
            };
        }

        default:
            return state;
    }
};