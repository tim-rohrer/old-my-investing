import { cleanup } from "../../test-utils";
import companyProfiles, {
  fetchFMPCompanyProfileBySymbol,
  FMPRequestObject,
} from "./companyProfilesSlice";
import * as functions from "./companyProfilesSlice";
import nock from "nock";
import axios from "axios";

// const fetchBySymbol: jest.Mock = require('companyProfilesSlice').fetchBySymbol;

afterEach(cleanup);
// afterEach(nock.restore())

describe("Company Profiles", () => {
  const mockFMPCompanyProfileApple = {
    symbol: "AAPL",
    profile: {
      price: 310.33,
      beta: "1.228499",
      volAvg: "36724977",
      mktCap: "1.37587904E12",
      lastDiv: "2.92",
      range: "149.22-312.67",
      changes: 0.7,
      changesPercentage: "(+0.23)",
      companyName: "Apple Inc.",
      exchange: "Nasdaq Global Select",
      industry: "Computer Hardware",
      website: "http://www.apple.com",
      description:
        "Apple Inc is designs, manufactures and markets mobile communication and media devices and personal computers, and sells a variety of related software, services, accessories, networking solutions and third-party digital content and applications.",
      ceo: "Timothy D. Cook",
      sector: "Technology",
      image: "https://financialmodelingprep.com/images-New-jpg/AAPL.jpg",
    },
  };
  describe("Reducer", () => {
    it("should return the initial state", () => {
      expect(companyProfiles(undefined, <any>{ type: "@@INIT" })).toEqual({
        profiles: {},
        loading: "idle",
        currentRequestId: undefined,
        error: null,
      });
    });
    describe("extraReducers: fetchFMPCompanyProfileBySymbol", () => {
      it("should handle a pending request", () => {
        const testState = {
          profiles: {},
          loading: "idle",
          currentRequestId: undefined,
          error: null,
        };
        const testRequestPackage: FMPRequestObject = {
          requestType: "companyProfile",
          securitySymbol: ["AAPL"],
        };
        const testAction = fetchFMPCompanyProfileBySymbol.pending(
          "myId",
          testRequestPackage
        );

        const actual = functions.companyProfilesSlice.reducer(
          testState as any,
          testAction
        );

        expect(actual).toStrictEqual({
          profiles: {},
          loading: "pending",
          currentRequestId: "myId",
          error: null,
        });
      });
      it("should handle fulfilled promise response ", () => {
        const testState = {
          profiles: {},
          loading: "pending",
          currentRequestId: "myId",
          error: null,
        };
        const testRequestPackage: FMPRequestObject = {
          requestType: "companyProfile",
          securitySymbol: ["AAPL"],
        };
        const testAction = fetchFMPCompanyProfileBySymbol.fulfilled(
          mockFMPCompanyProfileApple,
          "",
          testRequestPackage
        );
        // console.log(action)

        const actual = functions.companyProfilesSlice.reducer(
          testState as any,
          testAction
        );
        // console.log("Test Result", actual)

        expect(actual).toStrictEqual({
          profiles: {
            AAPL: {
              securitySymbol: "AAPL",
              fmpProfile: mockFMPCompanyProfileApple,
            },
          },
          loading: "idle",
          currentRequestId: undefined,
          error: null,
        });
      });
      /** @TODO Implement test for rejected */
      // TODO: it("should handle the rejectWithValue(value) promise response", () => {
      //   const action = fetchFMPCompanyProfileBySymbol("AAPL");
      //   // console.log(action)
      // });
    });
  });
  // describe('Company Profile Thunk', ()=> {

  //     const scope = nock('https://financialmodelingprep.com')
  //     .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
  //     .log(console.log)

  //     it('handles the thunk being called', async () => {
  //         const dispatch = jest.fn()
  //         const fmpRequestObject : FMPRequestObject = {
  //             requestType: "companyProfile",
  //             securitySymbol: ["AAPL"]
  //         }
  //         scope.get('/api/v3/company/profile/' + fmpRequestObject.securitySymbol)
  //         .reply(200, mockFMPCompanyProfileApple)

  //         const action = await fetchFMPCompanyProfileBySymbol(fmpRequestObject)
  //         console.log(action)
  //         expect(action).toEqual("Hello!")
  //     })

  //     // let fetchBySymbol : jest.Mock = jest.fn(() => "Tim")

  //     // it('dispatches a fetchFPMCompanyProfileBySymbol request', async () => {
  //     //     const dispatch = jest.fn()
  //         // await fetchFMPCompanyProfileBySymbol('AAPL')(dispatch)
  //         // .then((data: Object) => console.log(data))
  //         // await fetchFMPCompanyProfileBySymbol('AAPL')(dispatch)
  //         // .then((data: Object) => console.log("Data: ",data))
  //         // expect(dispatch).toHaveBeenCalledWith(fetchFMPCompanyProfileBySymbol('AAPL'))
  //     // })

  //     // spyOn()
  //     // it('will pass', async () => {

  //     //     const result = await axios.get('https://financialmodelingprep.com/api/v3/company/profile/AAPL')
  //     //     // console.log("Result: ", result)
  //     //     expect(result.data).toEqual(appleProfile);
  //     // })

  //     describe('When fetch fails', () => {

  //     })

  // })
});

// it('should handle fetchFMPCompanyProfile', async () => {
//     // // let spy = jest.spyOn(thunkAction, 'fetchFMPCompanyProfileBySymbol').mockImplementation()
//     // jest.spyOn(functions, 'fetchBySymbol').mockReturnValue(mockedResponse)
//     // let testPayload = 'AAPL'
//     // let actionCreator = fetchFMPCompanyProfileBySymbol
//     // fetchFMPCompanyProfileBySymbol('AAPL')
//     // console.log('Result: ', result)
//     // // return fetchFMPCompanyProfileBySymbol('AAPL')
//     // // expect(data).toBe(mockedResponse)
//     // // expect.hasAssertions
//     // // expect(spy).toHaveBeenCalled
//     // // expect(spy).resolves
//     // // await expect()
// })
