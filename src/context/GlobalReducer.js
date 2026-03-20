import { NAME } from './types'

export default (state, action) => {
    switch (action.type) {
        case NAME:
            console.info("NAME: " + action.payload)
            return {
                ...state,
                name: action.payload
            }
        default:
            return state
    }
}