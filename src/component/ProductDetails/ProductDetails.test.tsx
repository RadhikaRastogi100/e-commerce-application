import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Route } from "react-router-dom";
import ProductDetails from "./ProductDetails";

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve({
        id: 1,
        title: "Product 1",
        description: "This is a test product",
      }),
  })
) as jest.Mock;

describe("ProductDetails Component", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("shows loading spinner while fetching product details", async () => {
    render(
      <MemoryRouter initialEntries={["/products/1"]}>
        <Route path="/products/:productId">
          <ProductDetails />
        </Route>
      </MemoryRouter>
    );
    expect(screen.getByTestId("loading")).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByTestId("product-details")).toBeInTheDocument();
    }); // Ensure there’s no missing semicolon

    expect(screen.queryByTestId("loading")).not.toBeInTheDocument();
  });
});
