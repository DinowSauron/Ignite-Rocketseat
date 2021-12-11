import { ActiveModelSerializer, createServer, Factory, Model, Response} from "miragejs"
import faker from "faker"

type User = {
  name: string;
  email: string;
  created_at: string;
};



export function makeServer() {
  const server = createServer({
    serializers: {
      application: ActiveModelSerializer
    },

    models: {
      user: Model.extend<Partial<User>>({})
    },

    factories: { //gerar dados em massa...
      user: Factory.extend({
        name(i: number) {
          return faker.name.findName();
        },
        email() {
          return faker.internet.email().toLowerCase();
        },
        created_at() {
          return faker.date.recent(150);
        },
      })
    },

    seeds(server) {
      server.createList("user", 20); // defina e crie a quantidade de usuários
    },

    routes() { //shorthand
      this.namespace = "api";
      this.timing = 750; // delay de teste

      this.get("/users", function (schema, request) {
        const { page = 1, per_page = 10} = request.queryParams;

        const total = schema.all("user").length;

        const pageStart = (Number(page) - 1) * Number(per_page);
        const pageEnd = pageStart + Number(per_page);

        const users = this.serialize(schema.all("user"))
          .users
          .slice(pageStart, pageEnd);
        
        return new Response(
          200,
          { "x-total-count": String(total)},
          { users }
        )
      });
      this.get("/users/:id");
      this.post("/users");

      this.namespace = ""; // retornar o estado anterior
      this.passthrough();
    }
  });

  return server;
}