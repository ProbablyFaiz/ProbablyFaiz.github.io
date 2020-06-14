import React from "react"
import { Link } from "gatsby"
import styled from "@emotion/styled"
import colors from "styles/colors"
import dimensions from "styles/dimensions"
import Logo from "components/_ui/Logo"

const HeaderContainer = styled("div")`
    padding-top: 3.75em;
    padding-bottom: 3em;
`

const HeaderContent = styled("div")`
    display: flex;
    justify-content: space-between;
`

const HeaderLinks = styled("div")`
    display: grid;
    grid-template-columns: repeat(3, auto);
    grid-gap: 4em;
    justify-content: flex-end;
    width: 100%;
    max-width: 200px;

    @media(max-width: ${dimensions.maxwidthTablet}px) {
        grid-gap: 3.5em;
    }

    @media(max-width: ${dimensions.maxwidthMobile}px) {
        grid-gap: 2.5em;
    }

    a {
        color: currentColor;
        text-decoration: none;
        border-bottom: 3px solid transparent;
        font-weight: 600;
        font-size: 0.95em;
        height: 100%;
        padding-bottom: 1.25em;
        padding-top: 0.5em;
        display: block;
        position: relative;

        &:after {
            position: absolute;
            content: "";
            bottom: 0;
            width: 18px;
            height: 3px;
            background: transparent;
            bottom: -3px;
            right: 50%;
            margin-right: -9px;
            transition: 100ms ease-in-out background;
        }

        &:hover {
            &:after {
                background: ${colors.blue500};
                transition: 100ms ease-in-out background;
            }
        }

        &.Link--is-active {
            &:after {
                background: ${colors.blue500};
                transition: 100ms ease-in-out background;
            }
        }
    }
`

const Header = () => (
  <HeaderContainer>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
    <HeaderContent>
      <Link to="/" style={{
        "textDecoration": "inherit",
        "color": "inherit",
      }}>
        <h2 style={{marginTop: 0, marginBottom: 0, fontVariant: "small-caps"}}>Faiz Surani</h2>
      </Link>
      <HeaderLinks>
        <Link
          activeClassName="Link--is-active"
          to="/work">
          Projects
        </Link>
        <Link
          activeClassName="Link--is-active"
          to="/blog">
          Blog
        </Link>
        <a href="https://github.com/ProbablyFaiz" target="_blank" style={{textAlign: "center", paddingTop: "0.36em"}}>
          <i className="fa fa-github"style={{ fontSize: "24px"}}/>
        </a>
      </HeaderLinks>
    </HeaderContent>
  </HeaderContainer>
)

export default Header
