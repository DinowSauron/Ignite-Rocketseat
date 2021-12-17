import { render, screen } from "@testing-library/react";
import { ActiveLink } from ".";

jest.mock("next/router", () => {
  return {
    useRouter() {
      return {
        asPath: "/"
      }
    }
  }
});

describe("activeLink component", () => {

  it("renders correctly", () => { //sem o screen
    const { debug, getByText } = render(
      <ActiveLink href="/" activeClassName="active">
        Home
      </ActiveLink>
    );
  
    expect(getByText("Home")).toBeInTheDocument();
  });
  
  it("adds active class if the link is currently active", () => {
    render(
      <ActiveLink href="/" activeClassName="active">
        Home
      </ActiveLink>
    );
  
    expect(screen.getByText("Home")).toHaveClass("active");
  });
})

