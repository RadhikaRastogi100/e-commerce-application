import { render, screen, waitFor } from "@testing-library/react";
import ProductsList from "./ProductList";

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve([
        { id: 1, title: "Product 1" },
        { id: 2, title: "Product 2" },
      ]),
  })
) as jest.Mock;

describe("ProductList Component", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("shows loading spinner while fetching data", async () => {
    render(<ProductsList />);
    expect(screen.getByTestId("list-loading")).toBeInTheDocument();
    await waitFor(() => expect(screen.getByTestId("product-list")).toBeInTheDocument());
    expect(screen.queryByTestId("list-loading")).not.toBeInTheDocument();
  });
});
