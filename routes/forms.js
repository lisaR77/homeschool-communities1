const express = require('express')
const app = express()
const { formOne, formTwo, formThree, validate, validateboth, validateSecond, validateThird } = require('../models/form')
const { form1, form2, form3, sendFormToGmail } = require('../utils/send_email')
const mongoose = require('mongoose')

app.post('/one', async (req, res) => {
    try {
        // console.log(req.body)
        const { error } = validateboth(req.body)
        if (error) return res.status(400).send({ error_msg: error.message })
        // const isExists = await formOne.findOne({email: req.body.email})
        // if (isExists) return res.status(400).send({error_msg: "email already exists"})
        const form = new formOne({ ...req.body })
        await form.save()
        const htmlData = `<div style="background-color:white; border: 1px solid black;padding: 20px; width: 600px">

        <h3 style="color: #000;">Check all that apply:</h3>
        ${form.home_builder ? ' <p style="color: gray;"> I am a homebuilder.</p>' : ""}
        <hr />
        ${form.commercial_builder ? ' <p style="color: gray;">I am a commercial builder.</p>' : ""}
        <hr />
    
       ${form.company_name ? `<h4> Company Name </h4><p style="color: gray;">${form.company_name} </p><hr />` : ''}
       ${form.contact_name ? `<h4> Contact Name </h4><p style="color: gray;">${form.contact_name} </p><hr />` : ''} 
       ${form.email ? `<h4> Email </h4><p style="color: gray;">${form.email} </p><hr />` : ''} 
       ${form.phone ? `<h4> Number </h4><p style="color: gray;">${form.phone} </p>` : ''} 
        
        </div>`
        let mail = {
            from: process.env.CLIENT_EMAIL, // sender address
            to: process.env.SEND_EMAIL_TO,// list of receivers
            subject: 'Home builder form', // Subject line
            text: `no html ?`, // plain text body
            // template: 'form', 

            html: htmlData 
        };

        sendFormToGmail(mail)

        const htmlDataforClient = `
        <table role="presentation" style="width:100%;border-collapse:collapse;border:0.5px solid #999B9E;border-spacing:0;background:#ffffff;" id="tableBodyWrapper">
            <tr>
                <td align="center" style="padding:0;background-color: #fff">
                    <img src="https://res.cloudinary.com/techlingcompany/image/upload/v1674398721/logo_fldamy.png" width="100px" height="60px" style="padding:10px;" />
                </td>
            </tr>
            <tr>
                    <td align="center" style="padding:0;background-color: #CBCFD6;">
                        <a href="https://homeschoolcommunities.org">
                        <img src="https://res.cloudinary.com/techlingcompany/image/upload/v1674496366/bannerfix_vxfjqo.png"  style="width: 100%" alt="">
                        </a>
                    </td>
            </tr>
        
            <tr>
                <td align="center" style="padding:0;background-color: #fff">
                 <table style="background-color: #fff; margin-top: 90px; margin-bottom: 90px; margin-left: 10%; margin-right: 10%;">
                     <tr>
                         <td align="center" style="padding:0;background-color: #fff">
                             <img src="https://res.cloudinary.com/techlingcompany/image/upload/v1674398721/icon1_yswmyr.png" width="70px"  style="padding:0px;margin-top:-20px;" />
                         </td>
                         <td>
                             <table style=" margin-left: 20px;">
                                 <tr>
                                     <td align="left" style="color: #455467; font-size: 18px;">
                                         Building Homes
                                     </td>
                                 </tr>
                                 <tr>
                                     <td align="left" style="color: #A5A5A5; font-size: 12px; margin-top: -10px;">
                                         Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.
                                     </td>
                                 </tr>
        
        
        
                             </table>
                         </td>
                     </tr>
        
        
                     <tr>
                         <td align="center" style="padding:0;background-color: #fff;">
                             <img src="https://res.cloudinary.com/techlingcompany/image/upload/v1674398721/icon2_eung2g.png" width="70px"  style="padding:0px;margin-top:30px;" />
        
                         </td>
                         <td align="left" style="background-color: #fff; ">
                             <table style=" margin-left: 20px;margin-top:40px;">
                                 <tr>
                                     <td align="left" style="color: #455467; font-size: 18px;">
                                         Building School Resources
                                     </td>
                                 </tr>
                                 <tr>
                                     <td align="left" style="color: #A5A5A5; font-size: 12px; margin-top: -10px;">
                                         Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.
                                     </td>
                                 </tr>
        
        
        
                             </table>
                         </td>
                     </tr>
        
                 </table>
                </td>
            </tr>
        
            <tr>
                <td align="center">
                      <table style="margin-bottom: 90px;">
                          <tr>
                              <td style="color:#fff; font-size: 16px; font-family: Arial; background-color: #003580; padding: 10px;">
                                  <a href="http://homeschoolcommunities.org/" style="color: #fff; text-decoration: none"> Visit Homeschool Communities</a>
                              </td>
                          </tr>
                      </table>
                </td>
            </tr>
            <tr>
                <td align="center">
                    <table style="margin-bottom: 0px; width: 80%">
                        <tr>
                            <td style="">
                                <hr style="width: 100%; border: 0.5px solid #999B9E" />
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        
            <tr style="background-color: white; ">
                <td align="center" style="">
                    <table style="margin-bottom: 90px; ">
                        <tr>
                            <td align="center" style="display:flex;justify-content: center; align-items: center; flex-direction: row; flex-wrap: wrap">
                                <table style="margin-top:40px ;">
                                    <tr>
                                        <td style="color:#A5A5A5;text-align: center; font-size: 14px;font-family: Arial">
                                            Powered By
                                        </td>
                                    </tr>
                                </table>
                                <img src="https://res.cloudinary.com/techlingcompany/image/upload/v1674398721/logo_fldamy.png" style="margin-top:40px ; margin-left:10px;margin-right:10px;width: 30px" alt="">
        
                                <table style="margin-top:40px ;">
                                    <tr>
                                        <td style="color:#455467;font-weight: 700;text-align: center; font-size: 16px;font-family: Arial">
                                            Homeschool Communities
                                        </td>
                                    </tr>
                                </table>
        
                            </td>
                        </tr>
                        <tr>
                            <td align="center" style="display:flex;justify-content: center; align-items: center; flex-direction: row; flex-wrap: wrap"; >
                                <table style="margin-top: 10px;">
                                    <tr>
                                        <td style="color:#A5A5A5;text-align: center; font-size: 14px;font-family: Arial">
                                           @2023 ||
                                        </td>
                                    </tr>
                                </table>
                                <table align="center" style="margin-top: 10px;">
                                    <tr>
                                        <td style="color:#A5A5A5;font-weight: 700;text-align: center; font-size: 14px;font-family: Arial">
                                            Homeschool Communities, All rights reserved
                                        </td>
                                    </tr>
                                </table>
        
                            </td>
                        </tr>
        
        
                    </table>
        
                </td>
            </tr>
        </table>`

        const customerMail = {
            from: process.env.CLIENT_EMAIL, // sender address
            to: form.email,// list of receivers
            subject: 'Home builder form', // Subject line
            text: `no html ?`, // plain text body
            // template: 'form', 

            html: htmlDataforClient 
        };

        sendFormToGmail(customerMail)

        return res.status(201).send(form)
    }
    catch (err) {
        return res.status(500).send({ message: "something went wrong" })
    }

})

app.post('/two', async (req, res) => {
    try {
        const { error } = validateSecond(req.body)
        if (error) return res.status(400).send({ errorMsg: error.message })
        const form = new formTwo({ ...req.body })
        await form.save()
        
        
    var htmlData = `<table role="presentation" style="width:100%;border-collapse:collapse;border:1px solid black;border-spacing:0;background:#ffffff;" id="tableBodyWrapper">
    <tr>
        <td align="center" style="padding:0;background-color: #fff">
            <img src="https://res.cloudinary.com/techlingcompany/image/upload/v1674398721/logo_fldamy.png" width="100px" height="60px" style="padding:10px;" />
        </td>
    </tr>
    <tr>
        <td align="center" style="padding:0;background-color: #CBCFD6">
            <img src="https://res.cloudinary.com/techlingcompany/image/upload/v1674398756/bannerimage_edy1cc.png"  style="width: 100%" alt="">

        </td>
    </tr>

    <tr>
        <td align="center" style="padding:0;background-color: #fff">
         <table style="background-color: #fff; margin-top: 90px; margin-bottom: 90px; margin-left: 5%; margin-right: 5%;">
             <tr>
                 <td align="center" style="padding:0;background-color: #fff">
                     <img src="https://res.cloudinary.com/techlingcompany/image/upload/v1674398721/icon1_yswmyr.png" width="70px"  style="padding:0px;margin-top:-20px;" />

                 </td>
                 <td>
                     <table style=" margin-left: 30px;">
                         <tr>
                             <td align="left" style="color: #455467; font-size: 20px;">
                                 Building Homes
                             </td>
                         </tr>
                         <tr>
                             <td align="left" style="color: #A5A5A5; font-size: 14px; margin-top: -10px;">
                                 Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.
                             </td>
                         </tr>



                     </table>
                 </td>
             </tr>
             <tr>
                 <td align="center" style="padding:0;background-color: #fff;">
                     <img src="https://res.cloudinary.com/techlingcompany/image/upload/v1674398721/icon2_eung2g.png" width="70px"  style="padding:0px;margin-top:30px;" />

                 </td>
                 <td align="left" style="background-color: #fff; ">
                     <table style=" margin-left: 30px;margin-top:40px;">
                         <tr>
                             <td align="left" style="color: #455467; font-size: 20px;">
                                 Building School Resources
                             </td>
                         </tr>
                         <tr>
                             <td align="left" style="color: #A5A5A5; font-size: 14px; margin-top: -10px;">
                                 Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.
                             </td>
                         </tr>



                     </table>
                 </td>
             </tr>

         </table>
        </td>
    </tr>

    <tr>
        <td align="center">
              <table style="margin-bottom: 90px;">
                  <tr>
                      <td style="color:#fff; font-size: 16px; font-family: Arial; background-color: #003580; padding: 10px;">
                        <a href="http://homeschoolcommunities.org/" style="color: #fff; text-decoration: none"> Visit Homeschool Communities</a>
                      </td>
                  </tr>
              </table>
        </td>
    </tr>
</table>`;

        let mail = {
            from: process.env.CLIENT_EMAIL, // sender address
            to: process.env.SEND_EMAIL_TO, // list of receivers
            subject: 'Thankyou for taking interest in homeschool communities', // Subject line
            text: `lorem ipsum`, // plain text body
            // template: 'form', 

            html: htmlData
        };

        sendFormToGmail(mail)

        const htmlDataforClient = `<table role="presentation" style="width:100%;border-collapse:collapse;border:0.5px solid #999B9E;border-spacing:0;background:#ffffff;" id="tableBodyWrapper">
            <tr>
                <td align="center" style="padding:0;background-color: #fff">
                    <img src="https://res.cloudinary.com/techlingcompany/image/upload/v1674398721/logo_fldamy.png" width="100px" height="60px" style="padding:10px;" />
                </td>
            </tr>
            <tr>
                <td align="center" style="padding:0;background-color: #CBCFD6;">
                    <a href="https://homeschoolcommunities.org">
                        <img src="https://res.cloudinary.com/techlingcompany/image/upload/v1674496366/bannerfix_vxfjqo.png"  style="width: 100%" alt="">
                    </a>
                </td>
            </tr>
        
            <tr>
                <td align="center" style="padding:0;background-color: #fff">
                    <table style="background-color: #fff; margin-top: 90px; margin-bottom: 90px; margin-left: 10%; margin-right: 10%;">
                        <tr>
                            <td align="center" style="padding:0;background-color: #fff">
                                <img src="https://res.cloudinary.com/techlingcompany/image/upload/v1674571156/image_1_zxkun0.png" width="70px"  style="padding:0px;margin-top:-20px;" />
                            </td>
                            <td>
                                <table style=" margin-left: 20px;">
                                    <tr>
                                        <td align="left" style="color: #455467; font-size: 18px;">
                                            Selling Homeschool Communities
                                        </td>
                                    </tr>
                                    <tr>
                                        <td align="left" style="color: #A5A5A5; font-size: 12px; margin-top: -10px;">
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.
                                        </td>
                                    </tr>
        
        
        
                                </table>
                            </td>
                        </tr>
        
        
                    </table>
                </td>
            </tr>
        
            <tr>
                <td align="center">
                    <table style="margin-bottom: 90px;">
                        <tr>
                            <td style="color:#fff; font-size: 16px; font-family: Arial; background-color: #003580; padding: 10px;">
                                <a href="http://homeschoolcommunities.org/" style="color: #fff; text-decoration: none"> Visit Homeschool Communities</a>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
            <tr>
                <td align="center">
                    <table style="margin-bottom: 0px; width: 80%">
                        <tr>
                            <td style="">
                                <hr style="width: 100%; border: 0.5px solid #999B9E" />
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        
            <tr style="background-color: white; ">
                <td align="center" style="">
                    <table style="margin-bottom: 90px; ">
                        <tr>
                            <td align="center" style="display:flex;justify-content: center; align-items: center; flex-direction: row; flex-wrap: wrap">
                                <table style="margin-top:40px ;">
                                    <tr>
                                        <td style="color:#A5A5A5;text-align: center; font-size: 14px;font-family: Arial">
                                            Powered By
                                        </td>
                                    </tr>
                                </table>
                                <img src="https://res.cloudinary.com/techlingcompany/image/upload/v1674398721/logo_fldamy.png" style="margin-top:40px ; margin-left:10px;margin-right:10px;width: 30px" alt="">
        
                                <table style="margin-top:40px ;">
                                    <tr>
                                        <td style="color:#455467;font-weight: 700;text-align: center; font-size: 16px;font-family: Arial">
                                            Homeschool Communities
                                        </td>
                                    </tr>
                                </table>
        
                            </td>
                        </tr>
                        <tr>
                            <td align="center" style="display:flex;justify-content: center; align-items: center; flex-direction: row; flex-wrap: wrap"; >
                                <table style="margin-top: 10px;">
                                    <tr>
                                        <td style="color:#A5A5A5;text-align: center; font-size: 14px;font-family: Arial">
                                            @2023 ||
                                        </td>
                                    </tr>
                                </table>
                                <table align="center" style="margin-top: 10px;">
                                    <tr>
                                        <td style="color:#A5A5A5;font-weight: 700;text-align: center; font-size: 14px;font-family: Arial">
                                            Homeschool Communities, All rights reserved
                                        </td>
                                    </tr>
                                </table>
        
                            </td>
                        </tr>
        
        
                    </table>
        
                </td>
            </tr>
        </table>`

        const customerMail = {
            from: process.env.CLIENT_EMAIL, // sender address
            to: form.email,// list of receivers
            subject: 'Thank you for your interest in Homeschool Communities', // Subject line
            text: `no html ?`, // plain text body
            // template: 'form', 

            html: htmlDataforClient 
        };

        sendFormToGmail(customerMail)
        return res.status(201).send(form)
    }
    catch (err) {
        return res.status(500).send({ message: "something went wrong" })
    }

})

app.post('/three', async (req, res) => {
    try {
        const { error } = validateThird(req.body)
        if (error) return res.status(400).send({ errorMsg: error.message })
        const form = new formThree({ ...req.body })
        await form.save()

        var htmlData = `<div style="background-color:white; border: 1px solid black;padding: 20px; width: 600px">

        <h3 style="color: #000;">Check all that apply:</h3>
        ${form.homeschool ? ' <p style="color: gray;">I would like to live in a homeschool community.</p>' : ""}
        ${form.teacher_or_skilled ? ' <p style="color: gray;">I am a teacher or skilled parent and am interested in serving a homeschool community.</p>' : ""}
        ${form.wish_we_had ? ' <p style="color: gray;">I wish we had something like this in our existing community</p>' : ""}
        ${form.advocate_for ? ' <p style="color: gray;">I advocate for homeschool communities.</p>' : ""}
    
        <hr />
    
       ${form.first_name ? `<h4> Name </h4><p style="color: gray;">${form.first_name} ${form.last_name} </p><hr />` : ''}
       ${form.email ? `<h4> Email </h4><p style="color: gray;">${form.email} </p>` : ''} 
        
                        </div>`
        let mail = {
            from: process.env.CLIENT_EMAIL, // sender address
            to: process.env.SEND_EMAIL_TO,// list of receivers
            subject: 'Thank you for your interest in Homeschool Communities', // Subject line
            text: `lorem ipsum`, // plain text body
            // template: 'form', 

            html: htmlData
        };

        sendFormToGmail(mail)

        const htmlDataforClient = `<table role="presentation" style="width:100%;border-collapse:collapse;border:0.5px solid #999B9E;border-spacing:0;background:#ffffff;" id="tableBodyWrapper">
            <tr>
                <td align="center" style="padding:0;background-color: #fff">
                    <img src="https://res.cloudinary.com/techlingcompany/image/upload/v1674398721/logo_fldamy.png" width="100px" height="60px" style="padding:10px;" />
                </td>
            </tr>
            <tr>
                <td align="center" style="padding:0;background-color: #CBCFD6;">
                    <a href="https://homeschoolcommunities.org">
                        <img src="https://res.cloudinary.com/techlingcompany/image/upload/v1674496366/bannerfix_vxfjqo.png"  style="width: 100%" alt="">
                    </a>
                </td>
            </tr>
        
            <tr>
                <td align="center" style="padding:0;background-color: #fff">
                    <table style="background-color: #fff; margin-top: 90px; margin-bottom: 90px; margin-left: 10%; margin-right: 10%;">
                        <tr>
                            <td align="center" style="padding:0;background-color: #fff">
                                <img src="https://res.cloudinary.com/techlingcompany/image/upload/v1674571243/Group_6_peyeek.png" width="70px"  style="padding:0px;margin-top:-20px;" />
                            </td>
                            <td>
                                <table style=" margin-left: 20px;">
                                    <tr>
                                        <td align="left" style="color: #455467; font-size: 18px;">
                                            Teach or volunteer in a homeschool community
                                        </td>
                                    </tr>
                                    <tr>
                                        <td align="left" style="color: #A5A5A5; font-size: 12px; margin-top: -10px;">
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.
                                        </td>
                                    </tr>
        
        
        
                                </table>
                            </td>
                        </tr>
        
        
                        <tr>
                            <td align="center" style="padding:0;background-color: #fff;">
                                <img src="https://res.cloudinary.com/techlingcompany/image/upload/v1674571243/image_2_i2m0uo.png" width="70px"  style="padding:0px;margin-top:30px;" />
        
                            </td>
                            <td align="left" style="background-color: #fff; ">
                                <table style=" margin-left: 20px;margin-top:40px;">
                                    <tr>
                                        <td align="left" style="color: #455467; font-size: 18px;">
                                            Reserve learning spaces here with your group
                                        </td>
                                    </tr>
                                    <tr>
                                        <td align="left" style="color: #A5A5A5; font-size: 12px; margin-top: -10px;">
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.
                                        </td>
                                    </tr>
        
        
        
                                </table>
                            </td>
                        </tr>
        
                        <tr>
                            <td align="center" style="padding:0;background-color: #fff;">
                                <img src="https://res.cloudinary.com/techlingcompany/image/upload/v1674571242/image_3_pee7hk.png" width="70px"  style="padding:0px;margin-top:30px;" />
        
                            </td>
                            <td align="left" style="background-color: #fff; ">
                                <table style=" margin-left: 20px;margin-top:40px;">
                                    <tr>
                                        <td align="left" style="color: #455467; font-size: 18px;">
                                            Become a host
                                        </td>
                                    </tr>
                                    <tr>
                                        <td align="left" style="color: #A5A5A5; font-size: 12px; margin-top: -10px;">
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.
                                        </td>
                                    </tr>
        
        
        
                                </table>
                            </td>
                        </tr>
        
                    </table>
                </td>
            </tr>
        
            <tr>
                <td align="center">
                    <table style="margin-bottom: 90px;">
                        <tr>
                            <td style="color:#fff; font-size: 16px; font-family: Arial; background-color: #003580; padding: 10px;">
                                <a href="http://homeschoolcommunities.org/" style="color: #fff; text-decoration: none"> Visit Homeschool Communities</a>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
            <tr>
                <td align="center">
                    <table style="margin-bottom: 0px; width: 80%">
                        <tr>
                            <td style="">
                                <hr style="width: 100%; border: 0.5px solid #999B9E" />
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        
            <tr style="background-color: white; ">
                <td align="center" style="">
                    <table style="margin-bottom: 90px; ">
                        <tr>
                            <td align="center" style="display:flex;justify-content: center; align-items: center; flex-direction: row; flex-wrap: wrap">
                                <table style="margin-top:40px ;">
                                    <tr>
                                        <td style="color:#A5A5A5;text-align: center; font-size: 14px;font-family: Arial">
                                            Powered By
                                        </td>
                                    </tr>
                                </table>
                                <img src="https://res.cloudinary.com/techlingcompany/image/upload/v1674398721/logo_fldamy.png" style="margin-top:40px ; margin-left:10px;margin-right:10px;width: 30px" alt="">
        
                                <table style="margin-top:40px ;">
                                    <tr>
                                        <td style="color:#455467;font-weight: 700;text-align: center; font-size: 16px;font-family: Arial">
                                            Homeschool Communities
                                        </td>
                                    </tr>
                                </table>
        
                            </td>
                        </tr>
                        <tr>
                            <td align="center" style="display:flex;justify-content: center; align-items: center; flex-direction: row; flex-wrap: wrap"; >
                                <table style="margin-top: 10px;">
                                    <tr>
                                        <td style="color:#A5A5A5;text-align: center; font-size: 14px;font-family: Arial">
                                            @2023 ||
                                        </td>
                                    </tr>
                                </table>
                                <table align="center" style="margin-top: 10px;">
                                    <tr>
                                        <td style="color:#A5A5A5;font-weight: 700;text-align: center; font-size: 14px;font-family: Arial">
                                            Homeschool Communities, All rights reserved
                                        </td>
                                    </tr>
                                </table>
        
                            </td>
                        </tr>
        
        
                    </table>
        
                </td>
            </tr>
        </table>`

        const customerMail = {
            from: process.env.CLIENT_EMAIL, // sender address
            to: form.email,// list of receivers
            subject: 'Thank you for your interest in Homeschool Communities', // Subject line
            text: `no html ?`, // plain text body
            // template: 'form', 

            html: htmlDataforClient 
        };

        sendFormToGmail(customerMail)
        return res.status(201).send(form)
    }
    catch (err) {
        // console.log(err)
        return res.status(500).send({ message: "something went wrong" })
    }
})


module.exports = app;