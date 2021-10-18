const express = require('express');
const router = express.Router();

const pool = require('../database');

// proteger rutas
const { isLoggedIn } = require('../lib/auth');


// mostrar formulario para crear link
router.get('/add', isLoggedIn,(req,res)=>{
    res.render('links/add');
});

router.post('/add',isLoggedIn,async (req,res)=>{
    const{ title, url, description } = req.body

    const newLink = { 
        title, 
        url, 
        description,
        user_id: req.user.id
    };
    await pool.query('INSERT INTO links set ?',[newLink]);
    req.flash('success', 'Link saved Successfully');
    res.redirect('/links')
});

// mostrar los link
router.get('/', isLoggedIn,async(req,res)=>{
    const links = await pool.query('SELECT * FROM links WHERE user_id = ?', [req.user.id]);
    res.render('links/list', {links})
});

// eliminar link
router.get('/delete/:id', isLoggedIn,async (req,res)=>{
    const {id} = req.params; 
    await pool.query('DELETE FROM links WHERE id = ?', [id]);
    req.flash('success',"Link Removed Successfully");
    res.redirect('/links')
});

//mostrar formulario para editar link
router.get('/edit/:id', isLoggedIn,async (req,res)=>{
    const {id} = req.params;
    const links = await pool.query('SELECT * FROM links WHERE id = ?',[id]);
    const link = links[0];
    res.render('links/edit',{ link })
});

// editar link
router.post('/edit/:id', isLoggedIn, async (req,res)=>{
    const { id } = req.params;
    const { title, url, description} = req.body;
    const newLink = {
        title,
        url,
        description
    };

    await pool.query('UPDATE links set ? WHERE id = ?', [newLink, id]);
    req.flash('success',"Link Update Successfully");
    res.redirect('/links')
})

module.exports = router;