export const cardInfo = (
  name: string,
  description: string,
  image: string = ""
) => {
  let cardImage;
  if (image == "") {
    cardImage = "/preview.png";
  } else {
    cardImage = image;
  }

  return [
    { title: name },
    { name: "description", content: description },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: name },
    { name: "twitter:description", content: description },
    { name: "og:description", content: description },
    { name: "og:title", content: name },
    { name: "twitter:image", content: cardImage },
    { name: "twitter:image:alt", content: description },
    { name: "og:image:alt", content: description },
    { name: "og:image", content: cardImage },
  ];
};
