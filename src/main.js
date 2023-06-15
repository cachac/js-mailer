import express from "express";
import helmet from "helmet";
import cors from "cors";
import compression from "compression";
import { errorHandler } from "./middlewares/errorHandler.js";
import gql from "graphql-tag";
import { sendGql } from "./sendGql.js";
const app = express();

// middlewares
app.use(express.json());
app.use(cors());
app.use(compression());
app.use(helmet());
app.use(errorHandler);

process.on("uncaughtException", (err) => {
  console.error("AHHHHHHHHHHHHHHHHHHHHHHHHHH! :", err);
  process.exit(1);
});

process.on("unhandledRejection", (err) => {
  console.error("ERRRRRRRRRRRRRRRRRRRRRRRRRR! :", err);
  process.exit(1);
});

const router = express.Router();

router.post("/", (req, res) => {
  const input = req.body;

  console.log("input", input);

  const content = {
    title: "Auto-Servicio Storylabs",
    subtitle: "Has recibido un correo de contacto",
    name: `${input.firstName} ${input.lastName}`,
    date: new Date().toLocaleDateString(),
    message_detail: `Nombre: ${input.firstName} ${input.lastName}`,
    greetings: `Contacto: ${input.email}. Tel: ${input.telephone}`,
    calltoaction_url: "https://aiways.cr",
    calltoaction_text: "aiways.cr",
    footer_detail: "",
  };
  return sendGql("https://apimailer.storylabs.dev/graphql", {
    query: gql`
      mutation SEND_MAIL(
        $account: String!
        $template: Template!
        $to: String!
        $subject: String!
        $content: Content!
      ) {
        Mailer {
          send(
            account: $account
            template: $template
            to: $to
            subject: $subject
            content: $content
          )
        }
      }
    `,
    variables: {
      to: "carlos.echc11@gmail.com",
      account: "info@storylabs.dev",
      template: {
        app: "storylabs",
        name: "newEmailNotification.hbs",
      },
      subject: "Contacto aiways",
      content,
    },
  })
    .then(() => {
      console.log("correo enviado!");

      res.send("ok");
    })
    .catch((err) => {
      console.error(`Ha ocurrido un error al enviar el correo a ${email}`);
      console.error(err);
      console.log("err correo : ", err);

      res.status(500).send("Error al enviar el correo");
    });
});

app.use(router);

app.listen(3020, () => {
  console.log(`Listening to port ${3020} - Express JS | REST API`);
});
