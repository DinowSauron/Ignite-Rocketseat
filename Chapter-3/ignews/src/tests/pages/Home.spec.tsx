import { render, screen } from "@testing-library/react";
import { mocked } from "ts-jest/utils";
import { useSession } from "next-auth/react";
import { stripe } from "../../services/stripe";
import Home, { getStaticProps } from "../../pages";

jest.mock("next-auth/react");
jest.mock("next/router");
jest.mock("../../services/stripe")

describe("Home page", () => {

  it("renders correctly", () => {
    const useSessionMocked = mocked(useSession);
    
    useSessionMocked.mockReturnValueOnce({data: null, status: "unauthenticated"});

    
    render(<Home product={{priceId: "fake-id", amount: "R$10,00"}} />)

    expect(screen.getByText("for R$10,00 month")).toBeInTheDocument();
  });

  it("loads initial data", async () => {

    const retrieveStripePricesMocked = mocked(stripe.prices.retrieve);

    retrieveStripePricesMocked.mockResolvedValueOnce({
      id: "fake-price-id",
      unit_amount: 1000, // in centavos
    } as any)

    const response = await getStaticProps({});

    expect(response).toEqual(
      expect.objectContaining({ // se tirar o objeto deve ser exatamente igual, com isso ele pede ao menos esses dados
        props: {
          product: {
            priceId: "fake-price-id",
            amount: "$10.00"
          }
        }
      })
    )
  })


});
