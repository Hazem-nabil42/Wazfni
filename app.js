const express = require('express')
const serverless = require('serverless-http')
const app = express();
const router = express.Router();
const bcrypt = require('bcrypt');
const collection = require('./config')
const session = require('express-session')

// generate sectet key for cookies security 
const { v4: uuidv4 } = require('uuid');
const secretKey = uuidv4();
console.log(secretKey);

// Set up session middleware
app.use(session({
  secret: secretKey,
  resave: false,
  saveUninitialized: true
}));



// Middleware to check if user is logged in
const checkLoggedIn = (req, res, next) => {
  if (req.session.user) {
      res.locals.username = req.session.user.name;
  }
  next();
}
app.use(checkLoggedIn);

//covert data to json file
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// Serve HTML file
app.set('view engine', 'ejs');
app.use( '/public', express.static('public'));

// render username var globally
app.use((req, res, next) => {
  // Set username variable globally
  res.locals.username = req.session.user ? req.session.user.name : null;
  next();
});


app.get('/', (req, res) => {
    res.render('home');
})

app.get('/about', (req, res) => {
    res.render('about');
});
app.get('/commonQ', (req, res) => {
  res.render('commonQ');
});
app.get('/whyus', (req, res) => {
  res.render('whyus');
});
app.get('/dudues', (req, res) => {
  res.render('dudues');
});
app.get('/how', (req, res) => {
  res.render('how');
});
app.get('/politics', (req, res) => {
  res.render('politics');
});
app.get('/contact', (req, res) => {
  res.render('contact');
});

/* -------------------------------------------------------------------------- */
/*                                login section                               */
/* -------------------------------------------------------------------------- */

app.get('/login', (req, res) => {
  res.render('login')
})

app.get('/signup', (req, res) => {
  res.render('signup')
})

app.post('/signup', async (req, res) => {
  const data = {
      name: req.body.username,
      password: req.body.password
  }
  const userExist = await collection.findOne({name: data.name});
  //check if the username already exist
  if (userExist) {
      res.send("Error the username already exist");
  }else {
    //hash the password
    const saltRound = 10;
    const hashedPassword = await bcrypt.hash(data.password, saltRound);
    
    data.password = hashedPassword; //Replace the old password with the hashed one
    
    const userData = await collection.insertMany(data);

    res.redirect('login');
  }
});

//code for login 

app.post('/login', async (req, res) => {
  try {
      const user = await collection.findOne({ name: req.body.username });

      if (!user) {
          res.send("Incorrect username");
      } else {
          const isPasswordValid = await bcrypt.compare(req.body.password, user.password);

          if (!isPasswordValid) {
              res.send('Incorrect password');
          } else {
              // Store user data in session
              req.session.user = user;
              res.redirect('/');
          }
      }
  } catch (error) {
      console.error(error); // Log the error to the console

      // Check the type of error
      if (error instanceof Error) {
          res.send("An unexpected error occurred. Please try again later.");
      } else {
          res.send("Wrong details, please try again");
      }
  }
});


// Logout route
app.get('/logout', (req, res) => {
  req.session.destroy((err) => {
      if (err) {
          console.error("Error destroying session:", err);
      } else {
          res.redirect('/');
      }
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
