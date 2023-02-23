import { render, screen } from "@testing-library/react";
import { ChakraProvider } from "@chakra-ui/react";
import Home from "@/pages/index";

describe("Home", () => {
  it("renders a heading", () => {
    render(
      <ChakraProvider>
        <Home posts={posts} />
      </ChakraProvider>
    );

    const heading = screen.getByRole("heading", {
      name: "WELCOME TO SCSE CLUB",
    });

    expect(heading).toBeInTheDocument();
  });
});

const posts = [
  {
    node: {
      id: "cG9zdDoxNjk1",
      title: "Techterview 101: Navigating the Internship World",
      date: "2022-02-22T13:58:38",
      uri: "/techterview-101-navigating-the-internship-world/",
      slug: "techterview-101-navigating-the-internship-world",
      excerpt:
        "Techterview 101: Navigating the Internship World, a senior sharing event for the SCSE students took place on the 24th of",
      author: {
        node: {
          id: "dXNlcjoz",
          name: "acad",
        },
      },
      featuredImage: {
        node: {
          link: "https://clubs.ntu.edu.sg/csec/techterview-101-navigating-the-internship-world/cover-photo/",
        },
      },
    },
  },
  {
    node: {
      id: "cG9zdDoxMTYy",
      title: "21st Main Committee",
      date: "2021-03-31T16:07:43",
      uri: "/21st-main-committee/",
      slug: "21st-main-committee",
      excerpt:
        "Introducing the 21st Main Committee Mission of 21st Main Committee School of Computer Science and Engineering Club (CSEC",
      author: {
        node: {
          id: "dXNlcjox",
          name: "admin",
        },
      },
      featuredImage: {
        node: {
          link: "https://clubs.ntu.edu.sg/csec/untitled/",
        },
      },
    },
  },
];
