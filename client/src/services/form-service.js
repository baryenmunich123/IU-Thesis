import { axiosInstance } from "./base-service";
import { END_POINT } from "../constants/api-path";

const _getFormFields = () => {
  return axiosInstance.get(END_POINT.GET_FORM_FIELDS);
};
// const _postExample = (reqBody) => {
//   let dataReq = { ...reqBody };
//   return axiosInstance.post(API_PATH.REGISTER, dataReq);
// };
export { _getFormFields };
