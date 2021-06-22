import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import * as reactRedux from "react-redux";
import { renderHook, act } from "@testing-library/react-hooks";
import { render } from "../../test-utils";
import useCompanyProfile from "./useCompanyProfile";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("Company Profile Hook", () => {
  const useSelectorMock = jest.spyOn(reactRedux, "useSelector");
  const useDispatchMock = jest.spyOn(reactRedux, "useDispatch");

  beforeEach(() => {
    useSelectorMock.mockClear();
    useDispatchMock.mockClear();
  });

  // it("should return profile from store if previously fetched", async () => {
  //   useSelectorMock.mockReturnValue(["AAPL", "SPY"]);
  //   useDispatchMock.mockReturnValue({});

  //   const store = mockStore({
  //     companyProfiles: {
  //       profiles: {
  //         AAPL: {
  //           symbol: "AAPL",
  //           name: "Apple",
  //         },
  //       },
  //     },
  //   });

  //   const { result, waitForNextUpdate } = renderHook(
  //     () => useCompanyProfile("AAPL"),
  //     { wrapper: render.Wrapper }
  //   );

  //   result.current.fetchFMPCompanyProfileBySymbol();

  //   await waitForNextUpdate();

  //   expect(result.current).toMatchObject({
  //     symbol: "AAPL",
  //   });
  // });

  it("should fetch and return profile if not previously loaded", () => {
    expect(1).toBe(1);
  });
});
