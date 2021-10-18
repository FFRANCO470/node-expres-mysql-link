const express = require('express');
const router = express.Router();

//autentificacion
//const passport = require('../lib/passport'); (1)
const passport = require('passport');

// proteger rutas
const { isLoggedIn, isNotLoggedIn } = require('../lib/auth');

//formulario de registro
router.get('/signup', isNotLoggedIn,(req,res)=>{
    res.render('auth/signup');
});

// registrar usuario
router.post('/signup', isNotLoggedIn,passport.authenticate('local.signup',{
    successRedirect : '/profile',
    failureRedirect : '/signup',
    failureFlash : true
}))


// registrado o iniciado sesion mandelo para aca
router.get('/profile',isLoggedIn,(req,res)=>{
    res.render('profile');
})

//formulario login
router.get('/signin', isNotLoggedIn,(req,res)=>{
    res.render('auth/signin')
})

// iniciar la sesion
router.post('/signin',isNotLoggedIn, (req, res, next)=>{
    console.log('entre');
    passport.authenticate('local.signin',{
        // si sale todo bien
        successRedirect : '/profile',
        
        // pasa algo malo
        failureRedirect : '/signin',

        //enviar mensajes a la vista
        failureFlash : true
    })(req, res, next);
});

//cerrar sesion 
router.get('/logout',isLoggedIn,(req,res)=>{
    req.logOut();
    res.redirect('/signin')
})

/*
// (1)
router.post('/signup', (req,res)=>{    
    passport.isAuthenticated('local.signup',{
        // registro exitoso
        successRedirect: '/profile',
        //registro no exitoso
        failureRedirect : '/signup',
        // para colocar mensajes
        failureFlash : TextTrackCue
    });
    res.send('sirvo perra otra vez')
});
*/


module.exports = router;