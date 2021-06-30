Request and Response Cycle

1. Request from client.

2. Request and Response object pass through middleware

   - If you want to continue the cycle specify next() to go to the next middleware or
     route handler
   - If you dont specify the next() the middleware is capable of stopping the entire cycle.

3. Express routes and express handlers recieve the request from the middleware.

4. Express routes and express handlers can response for the request of the client.

5. Response payload, file etc. is being transmitted to the client.

6. End of the request and response cycle.

7. Listening for new request from client.
