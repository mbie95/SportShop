import axios from "axios";
import type {AxiosError, AxiosRequestConfig, AxiosResponse} from "axios";
import { router } from "../router/Routes";
import { toast } from "react-toastify";
import basketService from "./basketService";
import type { Dispatch } from "redux";
import type { Product } from "../models/product";
import type { Basket } from "../models/basket";
import type { User } from "../models/user"

axios.defaults.baseURL = 'http://localhost:8081/api/';

const idle = () => new Promise(resolve => setTimeout(resolve, 100));
const responseBody = (response: AxiosResponse) => response.data;

function getBearerToken() {
    const userString = localStorage.getItem('user');
    if(userString) {
        const user = JSON.parse(userString) as User;
        return user.token;
    } else {
        toast.error('Please Sign In');
    }
}

const requests = {
    get: (url: string, config?: AxiosRequestConfig) => axios.get(url, config).then(responseBody),
    post: (url: string, body: object, config?: AxiosRequestConfig) => axios.post(url, body, config).then(responseBody),
    put: (url: string, body: object) => axios.put(url, body).then(responseBody),
    delete: (url: string) => axios.delete(url).then(responseBody)
}

const Store = {
    apiUrl: 'http://localhost:8081/api/products',
    list:(page: number, size: number, brandId?: number, typeId?: number, url?: string) => {
        let requestUrl = url || 'http://localhost:8081/api/products?';
        requestUrl += `&page=${page}&size=${size}`;
        if(brandId !== undefined) {
            requestUrl += `&brandId=${brandId}`;
        }
        if(typeId !== undefined) {
            requestUrl += `&typeId=${typeId}`;
        }
        const token = 'Bearer ' + getBearerToken()
        return requests.get(requestUrl, {headers: {
            Authorization: token
        }});
    },
    details:(id: number) => {
        const token = 'Bearer ' + getBearerToken()
        return requests.get(`products/${id}`, {headers: {
            Authorization: token
        }})
    },
    types: () => requests.get('products/types').then(types => [{ id: 0, name: 'All' }, ...types]),
    brands: () => requests.get('products/brands').then(brands => [{ id: 0, name: 'All' }, ...brands]),
    search: (keyword: string) => requests.get(`products?keyword=${keyword}`)
}

const Basket = {
    get: async() => {
        try {
            return await basketService.getBasket();
        } catch(error) {
            console.error("Failed to get Basket: ", error);
            throw error;
        }
    },
    addItem: async(product: Product, dispatch: Dispatch) => {
        try {
            const result = await basketService.addItemToBasket(product, 1, dispatch);
            console.log(result);
            return result;
        } catch(error) {
            console.error("Failed to add new item to basket:", error);
            throw error;
        }
    },
    removeItem: async (itemId: number, dispatch: Dispatch )=> {
        try {
            await basketService.remove(itemId, dispatch);
        } catch(error) {
            console.error("Failed to remove an item from basket:", error);
            throw error;
        }
    },
    incrementItemQuantity: async (itemId: number, quantity: number = 1, dispatch: Dispatch) => {
        try {
          await basketService.incrementItemQuantity(itemId, quantity, dispatch);
        } catch (error) {
          console.error("Failed to increment item quantity in basket:", error);
          throw error;
        }
    },
    decrementItemQuantity: async (itemId: number, quantity: number = 1, dispatch: Dispatch) => {
        try {
          await basketService.decrementItemQuantity(itemId, quantity, dispatch);
        } catch (error) {
          console.error("Failed to decrement item quantity in basket:", error);
          throw error;
        }
    },
    setBasket: async (basket: Basket, dispatch: Dispatch) => {
        try {
          await basketService.setBasket(basket, dispatch);
        } catch (error) {
          console.error("Failed to set basket:", error);
          throw error;
        }
    },
    deleteBasket: async(basketId: string) => {
        try {
          await basketService.deleteBasket(basketId);
        } catch(error) {
          console.log("Failed to delete the Basket");
          throw error;
        }
    }
}

const Account = {
    login: (values:any) => requests.post('auth/login', values)
}

const Order = {
  list:() => {
        const token = 'Bearer ' + getBearerToken()
        requests.get('orders', {headers: {
            Authorization: token
        }})
    },
  fetch:(id:number) => {
        const token = 'Bearer ' + getBearerToken()
        requests.get(`orders/${id}`, {headers: {
            Authorization: token
        }})
    },
  create:(values: any) => {
        const token = 'Bearer ' + getBearerToken()
        requests.post('orders', values, {headers: {
            Authorization: token
        }})
    }
}

const agent = {
    Store,
    Basket,
    Account,
    Order
}

axios.interceptors.response.use(async response => {
    await idle();
    return response
}, (error: AxiosError)=>{
    const {status} = error.response as AxiosResponse; 
    switch(status){
        case 404:
            toast.error("Resource not found");
            router.navigate('/not-found');
            break;
        case 500:
            toast.error("Internal server error occurred");
            router.navigate('/server-error');
            break;
        default:
            break;
    }
    return Promise.reject(error.message);
})

export default agent;