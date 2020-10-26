import { cleanup } from '../../test-utils'
import quickenConnection, { quickenDataIsLoaded } from './quickenConnectionSlice';

afterEach(cleanup)

describe('Quicken Connection reducer', () => {
    it('should return the initial state', () => {
        expect(quickenConnection(undefined, <any>{type: '@@INIT'})).toEqual({
            isLoaded: false,
            data: {}
        })
    })
    it('should handle quickenConnectionIsLoaded', () => {
        expect(
            quickenConnection(<any>{}, {
                type: quickenDataIsLoaded,
                payload: true
            })
        ).toEqual({isLoaded: true})
    })

    // it('should handle adding a holding (holdingIsAdded) even with lower case symbols', () => {
    //     expect(
    //         quickenConnection(<any>state0, {
    //             type: holdingIsAdded,
    //             payload: {
    //                 symbol: "AMZ",
    //                 name: "Amazon, Inc."
    //             }
    //         })
    //     ).toMatchObject(state1)

    //     expect(
    //         quickenConnection(<any>state1, {
    //                 type: holdingIsAdded,
    //                 payload: {
    //                     symbol: "DKS",
    //                     name: "Dick's Sporting Goods, Inc."
    //                 }
    //         })
    //     ).toMatchObject(state2)

    //     expect(
    //         quickenConnection(<any>state2, 
    //             {
    //                 type: holdingIsAdded,
    //                 payload: {
    //                     symbol: "lcii",
    //                     name: "Lippert Components, Inc."
    //                 }
    //             }
    //         )
    //     ).toMatchObject(state3)
    // })
    // it('should handle removing a holding (holdingIsRemoved) from the quickenConnection', () => {
    //     expect(
    //         quickenConnection(<any>state3, 
    //             {
    //                 type: holdingIsRemoved,
    //                 payload: "dks"
    //             })
    //     ).toMatchObject(state4)
    // })

})