import { rest } from "msw";

export const handlers = [
  rest.get("https://api.github.com/search/users", (req, res, ctx) => {
    const query = req.url.searchParams;
    const q = query.get("q");

    if (q === "qwe in:login type:user") {
      return res(
        ctx.status(200),
        ctx.json({
          items: [
            {
              login: "abcqwe",
              id: 123,
              html_url: "https://github.com/abcqwe",
              type: "User",
            },
            {
              login: "qwe",
              id: 234,
              html_url: "https://github.com/qwe",
              type: "User",
            },
            {
              login: "zxcqwe",
              id: 321,
              html_url: "https://github.com/zxcqwe",
              type: "User",
            },
          ],
        }),
      );
    }

    if (q === "errortest in:login type:user") {
      return res(ctx.status(400));
    }
  }),

  rest.get("https://api.github.com/search/repositories", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        items: [
          {
            id: 345,
            name: "qwe",
            full_name: "asd/qwe",
            html_url: "https://github.com/asd/qwe",
          },
          {
            id: 456,
            name: "zxc",
            full_name: "qwe/zxc",
            html_url: "https://github.com/asd/qwe",
          },
        ],
      }),
    );
  }),
];
