import { REQUEST_LOADING, REQUEST_REJECTED, REQUEST_GET_EVENTS, REQUEST_ADD_EVENT, REQUEST_DELETE_EVENT } from '../actions/events';
var moment = require('moment');
const INITIAL_STATE = {
    all: [],
    fetching: false,
    fetched: false,
    error: null,

}
function convertMinsToHrsMins(mins) {
    let h = Math.floor(mins / 60);
    let m = mins % 60;
    h = h < 10 ? '0' + h : h;
    m = m < 10 ? '0' + m : m;
    return `${h}:${m}`;
}
function convertToFrontEnd(arrA) {
    let arrB = []
    if (arrA.length) {
        arrB = arrA.map(item => {
            return {
                id: item.id,
                title: item.attributes.content,
                className: item.attributes.id_rooms === 1 ? "SMALL" : "BIG",
                start: item.attributes.daystart,
                room: item.attributes.id_rooms === 1 ? "Phòng Nhỏ" : "Phòng Lớn",
                user: item.attributes.nameuser,
                timestart: item.attributes.timestart,
                timeend: item.attributes.timeend,
                rrule: item.attributes && item.attributes.repeat !== "null" ?
                    {
                        freq: item.attributes.repeat.repeatby,
                        interval: item.attributes.repeat.interval,
                        byweekday: item.attributes.repeat.byweekday,
                        dtstart: `${item.attributes.daystart + ' ' + item.attributes.timestart}`,
                        count: item.attributes.repeat.count
                    } : {
                        freq: "daily",
                        interval: item.attributes.repeat.interval,
                        dtstart: `${item.attributes.daystart + ' ' + item.attributes.timestart}`,
                        count: 1
                    },
                duration: convertMinsToHrsMins(moment(`${item.attributes.daystart + ' ' + item.attributes.timeend}`).diff(`${item.attributes.daystart + ' ' + item.attributes.timestart}`, 'minutes'))
            }
        })
    }
    return arrB;
}
export default function (state = INITIAL_STATE, action = {}) {
    switch (action.type) {
        case REQUEST_LOADING:
            return Object.assign({}, state, {
                fetching: true,
                fetched: INITIAL_STATE.fetched
            });
        case REQUEST_REJECTED:
            return Object.assign({}, state, {
                fetching: INITIAL_STATE.fetching,
                fetched: INITIAL_STATE.fetched,
                error: action.payload.data
            });
        case REQUEST_GET_EVENTS:

            return Object.assign({}, state, {
                all: convertToFrontEnd(action.payload),
                fetching: INITIAL_STATE.fetching,
                fetched: true
            })

        case REQUEST_ADD_EVENT:
            return Object.assign({}, state, {
                all: [...state.all, convertToFrontEnd(action.payload.attributes)]
            })
        case REQUEST_DELETE_EVENT:
            return Object.assign({}, state, {
                all: state.all.filter(item => item.id !== action.payload)
            })

        default:
            return state;
    }

}