import { render, screen, fireEvent } from "@testing-library/react";
import { mocked } from "ts-jest/utils";
import { signIn, useSession } from "next-auth/react";
import { SubscribeButton } from ".";
import { useRouter } from "next/router"

jest.mock("next-auth/react")
jest.mock("next/router")


describe("SubscribeButton component", () => {

  it("renders correctly", () => {

    const useSessionMocked = mocked(useSession);
    
    useSessionMocked.mockReturnValueOnce({data: null, status: "unauthenticated"});
    
    
    render(<SubscribeButton/>);
    
    expect(screen.getByText("Subscribe Now")).toBeInTheDocument();
  });


  
  it("redirects user to signIn when not authenticated", () => {
    const signInMoked = mocked(signIn); // verifica se a função foi chamada
    const useSessionMocked = mocked(useSession);
    
    useSessionMocked.mockReturnValueOnce({data: null, status: "unauthenticated"});

    render(<SubscribeButton/>);

    const subscribeButton = screen.getByText("Subscribe Now");

    fireEvent.click(subscribeButton)

    expect(signInMoked).toHaveBeenCalled();
  })



  it("redirects to posts when user already has a subscription", () => {
    const useRouterMocked = mocked(useRouter);
    const useSessionMocked = mocked(useSession);
    const pushMock = jest.fn();

    useSessionMocked.mockReturnValueOnce({
      data: {
        user: { 
          name: "John Doe", 
          email: "john.doe@example.com"
        },
        activeSubscription: "fake-active-sub",
        expires: "fake-expires" ,
      },
      status: "authenticated"
    })

    useRouterMocked.mockReturnValueOnce({
      push: pushMock,
    } as any) // caso a função não cumpra com os requisitos

    render(<SubscribeButton/>);

    const subscribeButton = screen.getByText("Subscribe Now");

    fireEvent.click(subscribeButton)

    expect(pushMock).toHaveBeenCalledWith("/posts")

  })

});
