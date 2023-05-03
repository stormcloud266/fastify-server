import {
  FastifyError,
  FastifyInstance,
  FastifyReply,
  FastifyRequest,
  FastifyServerOptions,
} from "fastify";

export default async function (
  instance: FastifyInstance,
  opts: FastifyServerOptions,
  done: (err?: FastifyError) => void
) {
  instance.get("/", async (req: FastifyRequest, res: FastifyReply) => {
    if (!process.env.WEATHER_API_KEY) {
      return res.status(500).send("Missing API key");
    }

    const url = new URL("https://api.openweathermap.org/data/3.0/onecall");
    url.searchParams.set("lat", "44.526340");
    url.searchParams.set("lon", "-109.056534");
    url.searchParams.set("appid", process.env.WEATHER_API_KEY);

    const response = await fetch(url);
    const data = await response.json();

    console.log("results: ", data);

    res.status(200).send(data);
  });

  // instance.register(
  //   async (instance: FastifyInstance, opts: FastifyServerOptions, done) => {
  //     instance.get(
  //       "/",
  //       async (
  //         req: FastifyRequest<CustomRouteGenericQuery>,
  //         res: FastifyReply
  //       ) => {
  //         const { name = "" } = req.query;
  //         res.status(200).send(`Hello ${name}`);
  //       }
  //     );

  //     instance.get(
  //       "/:name",
  //       async (
  //         req: FastifyRequest<CustomRouteGenericParam>,
  //         res: FastifyReply
  //       ) => {
  //         const { name = "" } = req.params;
  //         res.status(200).send(`Hello ${name}`);
  //       }
  //     );
  //     done();
  //   },
  //   {
  //     prefix: "/hello",
  //   }
  // );

  done();
}
