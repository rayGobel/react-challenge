// src/mocks/handlers.js
import { rest } from "msw";

const BASE_URL = "http://localhost:3001";

export const handlers = [
  rest.get(`${BASE_URL}/tasks`, (_req, res, ctx) => {
    return res(ctx.status(200), ctx.json([{ id: 1, title: "Test Todo" }]));
  }),
  rest.post(`${BASE_URL}/tasks`, async (req, res, ctx) => {
    const { title } = await req.json()
    if (title) {
      return res(ctx.status(201))
    }

    return res(ctx.status(400))
  }),
  rest.delete(`${BASE_URL}/tasks/:id`, (_req, res, ctx) => {
    return res(ctx.status(204))
  }),
];
