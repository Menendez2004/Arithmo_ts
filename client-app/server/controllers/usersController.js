const User = require("../models/user");
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');
const storage = require('../utils/cloud_storage')
const nodemailer = require('nodemailer');
require('dotenv').config();

module.exports = {

    login(req, res) {

        const email = req.body.email;
        const password = req.body.password;

        User.findByEmail(email, async (err, myUser) => {

            if (err) {
                console.log('ENTRO EN EL ERROR');
                return res.status(501).json({
                    success: false,
                    message: "Error con el registro de usuario",
                    error: err,
                });
            }

            if (!myUser) {
                //No auth
                console.log('ENTRO EN EL ERROR');
                return res.status(401).json({//no tiene autorizacion el usuario
                    success: false,
                    message: "El email no esta registrado",
                });
            }

            const isPassValid = await bcrypt.compare(password, myUser.password);


            if (isPassValid) {
                const token = jwt.sign({ id: myUser.id, email: myUser.email }, keys.secretOrKey, {});
                const data = {
                    id: myUser.id,
                    email: myUser.email,
                    password: myUser.password,
                    image: myUser.image,
                    session_token: `JWT ${token}`,
                    edad: myUser.edad
                };

                return res.status(201).json({
                    success: true,
                    message: "Usuario autentificado ",
                    data: data //El nuevo usuario que se acaba de registrar
                });

            }
            else {

                return res.status(401).json({
                    success: false,
                    message: "password incorrecto ",
                });
            }

        });
    },

    register(req, res) {
        const user = req.body; //Datos del usuario
        User.create(user, (err, data) => {
            if (err) {
                console.log('ENTRO EN EL ERROR');
                return res.status(501).json({
                    success: false,
                    message: "Error con el registro de usuario",
                    error: err,
                });
            }

            return res.status(201).json({
                success: true,
                message: "Registro realizado correctamente",
                data: data, //El nuevo usuario que se acaba de registrar
            });
        });
    },

    async registerWithImage(req, res) {

        const user = JSON.parse(req.body.user); // CAPTURO LOS DATOS QUE ME ENVIE EL CLIENTE

        const files = req.files;

        if (files.length > 0) {
            const path = `image_${Date.now()}`;
            const url = await storage(files[0], path);

            if (url != undefined && url != null) {
                user.image = url;
            }
        }

        User.create(user, async (err, data) => {

            if (err) {
                return res.status(501).json({
                    success: false,
                    message: 'Hubo un error con el registro del usuario',
                    error: err
                });
            }


            user.id = `${data}`;
            const token = jwt.sign({ id: user.id, email: user.email }, keys.secretOrKey, {});
            user.session_token = `JWT ${token}`;

            try {

                const transporter = nodemailer.createTransport({
                    service: 'Gmail', // Cambia esto por el servicio de correo que estás utilizando
                    secure: true,
                    auth: {
                        user: "arithmoadventur3@gmail.com", // Tu dirección de correo electrónico
                        pass: "kljlwwjtsxxcnudj", // Tu contraseña
                    },
                });
                const correoHTML = `
                <html>
                    <body>
                        <h1 style="color: #0073e6;">¡Bienvenidos a Arithmo!</h1>
                        <p style="text-align: justify;">Estimado ${user.name},</p>
                        <p style="text-align: justify;">Es un placer darles la bienvenida a Arithmo, su aplicación matemática personalizada. En nombre de todo el equipo de Arithmo, estamos emocionados de tenerte como parte de nuestra comunidad matemática.</p>
                        <p style="text-align: justify;"></p>
                        <ul>
                            <li><strong>Negrita</strong></li>
                            <li><em>Cursiva</em></li>
                            <li><a href="https://www.ejemplo.com">Enlace</a></li>
                        </ul>
                        <p style="text-align: center; color: #888;">Gracias por unirte a nosotros en esta emocionante aventura matemática. Esperamos verte pronto en Arithmo. Si tienes alguna pregunta, no dudes en contactarnos en support@arithmoapp.com.</p>
                    </body>
                </html>
                `;

                const mailOptions = {
                    from: "arithmoadventur3@gmail.com", // Tu dirección de correo electrónico
                    to: user.email, // Correo electrónico del usuario registrado
                    subject: '¡Bienvenido!',
                    text: correoHTML,
                };

                await transporter.sendMail(mailOptions);
            } catch (emailError) {
                console.error('Error al enviar el correo electrónico:', emailError);
            }

            return res.status(201).json({
                success: true,
                message: 'El registro se realizo correctamente',
                data: user
            });
        });

    },

    async updateWithImage(req, res) {

        const user = JSON.parse(req.body.user); // CAPTURO LOS DATOS QUE ME ENVIE EL CLIENTE

        const files = req.files;

        if (files.length > 0) {
            const path = `image_${Date.now()}`;
            const url = await storage(files[0], path);

            if (url != undefined && url != null) {
                user.image = url;
            }
        }

        User.update(user, (err, data) => {

            if (err) {
                return res.status(501).json({
                    success: false,
                    message: 'Hubo un error con el registro del usuario',
                    error: err
                });
            }
            return res.status(201).json({
                success: true,
                message: 'Actualización correctamente',
                data: user
            });
        });

    },

    async updateWithoutImage(req, res) {

        const user = req.body; // CAPTURO LOS DATOS QUE ME ENVIE EL CLIENTE


        User.updateWithoutImage(user, (err, data) => {

            if (err) {
                return res.status(501).json({
                    success: false,
                    message: 'Hubo un error con el registro del usuario',
                    error: err
                });
            }
            return res.status(201).json({
                success: true,
                message: 'Actualización correctamente',
                data: user
            });
        });

    },




};
