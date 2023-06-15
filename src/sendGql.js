import { execute, makePromise } from "apollo-link";
import { HttpLink } from "apollo-link-http";
import fetch from "node-fetch";

const setHttpLink = (uri, token) =>
  new HttpLink({
    uri,
    headers: { authorization: token ? `Bearer ${token}` : "" },
    fetch,
  });

export const sendGql = (uri, operator, tokenApi = null) =>
  makePromise(execute(setHttpLink(uri, tokenApi), operator))
    .then((result) => {
      if (result.errors) {
        console.error(
          `[7068] Error al ejecutar GQL: ${result.errors[0].message}`,
          result
        );
        throw new Error(result.errors[0].message);
        // return null
      }
      return result;
    })
    .catch((error) => {
      console.error(`GQL Error`, error);
      throw new Error(`[7069] Ha ocurrido un error en servicio API: ${uri}`);
    });
