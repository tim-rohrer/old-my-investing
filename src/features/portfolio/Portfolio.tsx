import React from "react"
import { selectPortfolioLoadedStatus } from "./portfolioSlice"
import { useSelector } from "react-redux"
import Button from "../../common/Button"

export const callAlert = () => {
    alert("Here!")
}

function Portfolio() {

    let isPortfolioLoaded = useSelector(selectPortfolioLoadedStatus)

    return (
        <div>
            <h2>Hello!</h2>
            <span>The portfolio
                {
                    isPortfolioLoaded
                    ?
                    <p> is loaded.</p>
                    :
                    <p>is not yet loaded.</p>
                }
            </span>
            <Button onClick={() => callAlert()}>Alert!</Button>
        </div>
    )

}

export default Portfolio