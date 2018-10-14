const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const passport = require('passport')
const path = require('path');
const cors = require('cors');
const uuidv1 = require('uuid/v1')


const Photo = require('../models/Photo')
const User = require('../models/User')

router.get('/:id', (req, res) => {
  User.findOne({user: req.body.id})
      .then(user => {

          })
      
})


router.post('/upload', (req, res, next) => {
  // айди пользователя для котоорого сохранить фото
   const user_id = req.params.user_id

   const photo = req.files.photo
   const filename = photo.name
   const extension = photo.mimetype.split('/')
   const generated = uuidv1() + '.' + extension[1]

   photo.mv(`./public/${generated}`, (err) => {
     if (err) {
        return res.status(500).send(err);
     }
     const newPhoto = new Photo({ // id
       filename: generated,
       extension: extension[1],
       size: photo.size,
       path: `./public/${generated}`
     })

     newPhoto.save().then(photo => res.json(photo)).catch(err => console.log(err))
    // Найти пользователя по user_id
    User.findOne({id: user_id}).
      then(user=> {
        Photo.find()
        .then(photo => {
          
          const lastpic = photo[photo.length - 1]
      
            // Добавить в поле gallery, айди из новой фото
            // СОхранить .push
          user.gallery.push(lastpic.id)
          user.save()
        })
      })
  
   }) 
})
  
 
module.exports = router 