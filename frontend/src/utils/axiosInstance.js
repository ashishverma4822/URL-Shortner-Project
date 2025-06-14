import axios from "axios"

const axiosInstance = axios.create({
    baseURL: "http://localhost:3000",
    timeout: 10000 //10s
})

// Add a response interceptor for error handling
axiosInstance.interceptors.response.use(
  (response) => {
    // Simply return the response if no error
    return response;
  },
  (error) => {
    // Handle error globally here
    if (error.response) {
      // Server responded with a status code outside 2xx
      console.error("Error response:", error.response);
      alert(`Error: ${error.response.status} - ${error.response.data?.message || "Something went wrong"}`);
    } else if (error.request) {
      // Request was made but no response received
      console.error("No response received:", error.request);
      alert("No response from server. Please check your network or server.");
    } else {
      // Something else happened
      console.error("Error setting up request:", error.message);
      alert(`Request error: ${error.message}`);
    }

    // Always reject the promise so individual requests can handle if needed
    return Promise.reject(error);
  }
);


export default axiosInstance