import express from 'express'
import cors from 'cors'
const app = express()
const port = 3000; 
import connectToDb from './db/connectDb.js';
import customers from './routes/customers.js'
import treatments from './routes/treatments.js'
import employees from './routes/employees.js'
import bookings from './routes/bookings.js';
import notes from './routes/notes.js';
import Employee from './models/Employees.js';
import Treatment from './models/Treatments.js';
import Customer from './models/Customers.js';
import Booking from './models/Bookings.js';
import Note from './models/Notes.js';



app.get('/', (req, res) => {
  res.send('Hello World!')
})


app.use(cors(), express.json());
connectToDb();
app.use('/api/v3/customers',customers);
app.use('/api/v3/treatments',treatments);
app.use('/api/v3/employees',employees);
app.use('/api/v3/bookings',bookings);
app.use('/api/v3/notes',notes);
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})