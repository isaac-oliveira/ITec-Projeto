import { create } from 'apisauce';
import { AsyncStorage } from 'react-native';
const api = create({
  baseURL: 'https://api-itec.herokuapp.com'
});

api.addAsyncRequestTransform(async (req) => {
  const token = await AsyncStorage.getItem("@itec/token");

  req.headers['Authorization'] = `Bearer ${token}`;

  console.log(req);
});

export default api;