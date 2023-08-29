import { render } from "@testing-library/react";
import Image from "./Image";
// import imgSrc from "../../assets/1.jpeg"

describe("Image component", () => {
  const getImageUrl = (imageId: string | number) => {
    return new URL(`../../assets/${imageId}.jpeg`, import.meta.url).href;
  };

  const expectedSrc = getImageUrl(1);

//   test("renders image with correct src and alt", () => {
//     const { getByAltText } = render(
//       <Image src={getImageUrl(1)} alt="Delicious Pizza" />
//     );
//     const image = getByAltText("Delicious Pizza");
//     expect(image).toBeInTheDocument();

//     const expectedSrc = getImageUrl(1);
    
//     expect(image).toHaveAttribute("src", expect.stringContaining(expectedSrc));
//   });

  test("renders image with default alt text", () => {
    const { getByAltText } = render(<Image src={expectedSrc} />);
    const image = getByAltText("Pizza");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("alt", "Pizza");
  });

  test("passes className prop to the image element", () => {
    const { container } = render(
      <Image src={expectedSrc} className="my-image" />
    );
    const image = container.querySelector(".my-image");
    expect(image).toBeInTheDocument();
  });
});
