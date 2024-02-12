import path from 'path';
import  express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
dotenv.config();
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import orderRoutes from './routes/orderRoutes.js'
import connectDB from './config/db.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
const port=process.env.PORT || 2000;

connectDB();
const app=express();

// # Body parser middleware, to get req.body for async request to backend
app.use(express.json())
app.use(express.urlencoded({extended:true}))
// cookie parser middleware
app.use(cookieParser());
// app.get('/', (req, res)=>{
//     res.send('Damini server sending data');
// });

app.use('/api/products',productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/upload', uploadRoutes);

app.get('/api/config/paypal', (req,res)=>res.send({clientId:process.env.PAYPAL_CLIENT_ID}));
// to make upload folder static
 
    const __dirname = path.resolve();
    app.use('/uploads', express.static(path.join(__dirname,'/uploads')));
    // for deployment
    if (process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname, '/frontend/build')));
  // any route that is not api will be redirected to index.html
    app.get('*', (req, res) =>
      res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
    );
    }
    // it means if we are not in production mode we r using react dev server
    else{
      app.get('/',(req,res)=>{
        res.send('API is running.....');
      });
    }

app.use(notFound)
app.use(errorHandler)
app.listen(port, () => console.log(`Server running on port ${port}`));