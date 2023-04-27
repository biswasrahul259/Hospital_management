const ContactUs = require('../../model/contactUs')

exports.ContactUs = (req,res)=>{
    ContactUs.find().then((result)=>{
        res.render('admin/contactus/contact',{
            contact:result
        })
    })
}

exports.createContact = (req,res)=>{
    ContactUs({
        name:req.body.name,
        email:req.body.email,
        topic:req.body.topic,
        phone:req.body.phone,
        message:req.body.message
    }).save().then((result)=>{
        console.log(result);
        res.redirect('/contact')
    })
}

exports.deleteCont = (req,res)=>{
    ContactUs.findByIdAndDelete({_id:req.params.id}).then((result)=>{
         res.redirect('/adminContact')
    })
}