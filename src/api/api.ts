/**
 * Class: BuyDag
 * Defines the base API methods for communicating
 * with a RESTful api.
 * By: Cesar Miranda - June 11, 2021
 */

/////////////////////////////
// ANCHOR Interfaces
/////////////////////////////
interface IBase {
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  endPoint: string;
  body?: any;
}

interface IMethod {
  endPoint: string;
  body?: any;
}

class Api {
  /////////////////////////////
  // ANCHOR Static Constants
  /////////////////////////////

  // Url
  private static HOST_NAME = "https://portal.stargazer.network/";
  private static PATH = "api/";
  private static VERSION = "v1/";
  // Methods
  private static GET_METHOD = "GET";
  private static POST_METHOD = "POST";
  private static PUT_METHOD = "PUT";
  private static DELETE_METHOD = "DELETE";
  private static PATCH_METHOD = "PATCH";

  // Objects
  private static HEADERS = {
    "Content-Type": "application/json",
  };

  /////////////////////////////
  // ANCHOR Static Accessors
  /////////////////////////////

  /**
   * Defines the base url for the stargazer network.
   */
  public static get baseUrl() {
    return `${Api.HOST_NAME}${Api.PATH}${Api.VERSION}`;
  }

  /////////////////////////////xw
  // ANCHOR Static Methods
  /////////////////////////////

  /**
   * Defines the base method for performing RESTful request.
   * @param endPoint A string of the collection and action that will be queried.
   * @param body? A JSON string that will be sent in the body of the request.
   * @returns A promise containing the results for the query.
   */
  public static async base(method: string, endPoint: string, body?: any) {
    const formedUrl = `${Api.baseUrl}${endPoint}`;
    const init = {
      method,
      body: null,
      headers: Api.HEADERS,
    };
    if (body) {
      init.body = body;
    }
    try {
      const response = await fetch(formedUrl, init);
      if (response.status === 200) {
        return await response.json();
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  /**
   * Defines the base method for performing POST request.
   * @param endPoint A string of the collection and action that will be queried.
   * @param body? A JSON string that will be sent in the body of the request.
   */
  public static async post(endPoint: string, body?: any) {
    return Api.base(Api.POST_METHOD, endPoint, body);
  }

  /**
   * Defines the base method for performing GET request.
   * @param endPoint A string of the collection and action that will be queried.
   * @param body? A JSON string that will be sent in the body of the request.
   */
  public static async get(endPoint: string, body?: any) {
    return Api.base(Api.GET_METHOD, endPoint, body);
  }

  /**
   * Defines the base method for performing PUT request.
   * @param endPoint A string of the collection and action that will be queried.
   * @param body? A JSON string that will be sent in the body of the request.
   */
  public static async put(endPoint: string, body?: any) {
    return Api.base(Api.PUT_METHOD, endPoint, body);
  }

  /**
   * Defines the base method for performing DELTE request.
   * @param endPoint A string of the collection and action that will be queried.
   * @param body? A JSON string that will be sent in the body of the request.
   */
  public static async delete(endPoint: string, body?: any) {
    return Api.base(Api.DELETE_METHOD, endPoint, body);
  }

  /**
   * Defines the base method for performing PATCH request.
   * @param endPoint A string of the collection and action that will be queried.
   * @param body? A JSON string that will be sent in the body of the request.
   */
  public static async patch(endPoint: string, body?: any) {
    return Api.base(Api.PATCH_METHOD, endPoint, body);
  }
}

export default Api;
