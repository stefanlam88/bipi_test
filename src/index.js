require("dotenv").config({ path: ".env" });

const fastify = require("fastify")({
  logger: true
});
const development = require("../knexfile").development;

const fastifyGql = require("fastify-gql");

const resolvers = require("./graphql/resolvers");
const schema = require("./graphql/schema");

(async () => {
  try {
    const knex = require("knex")(development);


    //GRAPHQL

    fastify.register(fastifyGql, {
      schema,
      resolvers,
      graphiql: true,
      jit: 1,
      context: (req, res) => {
        return {
          knex: knex,
          fastify: fastify
        };
      }
    });

    await fastify.listen(3000, "0.0.0.0");
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
})();
