import { createServer, Factory, Model} from "miragejs"
import faker from "faker"

type User = {
  name: string;
  email: string;
  created_at: string;
}

export function makeServer() {
  const server = createServer({
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
      server.createList("user", 25); // defina e crie a quantidade de usuários
    },

    routes() { //shorthand
      this.namespace = "api";
      this.timing = 750; // delay de teste

      this.get("/users");
      this.post("/users");

      this.namespace = ""; // retornar o estado anterior
      this.passthrough();
    }
  });

  return server;
}