// * handleResponse
type HandleResponse = (
  response: Response,
) => Promise<any>

export const handleResponse: HandleResponse = async (
  response: Response,
) => {
  if (response.ok) {
    return await response.json();
  } else {
    console.error(response);
    throw Error(`HTTP-Error: ${response.status}`);
  }
};
